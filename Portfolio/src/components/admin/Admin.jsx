import { useEffect, useState } from "react";
import { defaultContent, mergeContent } from "../../data/content";
import "./Admin.css";

const endpoint = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const parseEditorContent = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return defaultContent;
  }
};
const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token"));
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState(JSON.stringify(defaultContent, null, 2));
  const [projectForm, setProjectForm] = useState({ title: "", format: "AI project", visual: "", description: "", tags: "", link: "#", featured: false, published: true });
  const [form, setForm] = useState({ email: "", password: "" });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch(`${endpoint}/admin/messages`, { headers: authHeaders(token) }),
      fetch(`${endpoint}/content`),
    ]).then(async ([messagesResponse, contentResponse]) => {
      if (!messagesResponse.ok) throw new Error("Your session has expired.");
      setMessages(await messagesResponse.json());
      const remoteContent = await contentResponse.json();
      if (remoteContent) setContent(JSON.stringify(mergeContent(remoteContent), null, 2));
    }).catch((error) => {
      setNotice(error.message);
      sessionStorage.removeItem("admin_token");
      setToken(null);
    });
  }, [token]);

  const login = async (event) => {
    event.preventDefault();
    setNotice("");
    const response = await fetch(`${endpoint}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    if (!response.ok) return setNotice(result.error || "Unable to sign in.");
    sessionStorage.setItem("admin_token", result.token);
    setToken(result.token);
  };

  const saveContent = async () => {
    try {
      const parsed = JSON.parse(content);
      const response = await fetch(`${endpoint}/content`, {
        method: "PUT",
        headers: { ...authHeaders(token), "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save content.");
      setContent(JSON.stringify(result, null, 2));
      setNotice("Portfolio content saved.");
    } catch (error) {
      setNotice(error instanceof SyntaxError ? "Content is not valid JSON." : error.message);
    }
  };

  const updateLocalContent = (nextProjects) => {
    try {
      const parsed = JSON.parse(content);
      setContent(JSON.stringify({ ...parsed, projects: nextProjects }, null, 2));
    } catch {
      setNotice("Fix the JSON before using the project manager.");
    }
  };

  const addProject = (event) => {
    event.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      setNotice("Project title and description are required.");
      return;
    }
    const parsed = JSON.parse(content);
    const project = {
      ...projectForm,
      title: projectForm.title.trim(),
      description: projectForm.description.trim(),
      tags: projectForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      format: `${projectForm.format} / ${String((parsed.projects || []).length + 1).padStart(2, "0")}`,
    };
    updateLocalContent([...(parsed.projects || []), project]);
    setProjectForm({ title: "", format: "AI project", visual: "", description: "", tags: "", link: "#", featured: false, published: true });
    setNotice("Project added locally. Save portfolio content to publish it.");
  };

  const removeProject = (index) => {
    const parsed = JSON.parse(content);
    if (!window.confirm(`Delete ${parsed.projects[index].title}?`)) return;
    updateLocalContent(parsed.projects.filter((_, projectIndex) => projectIndex !== index));
  };

  const toggleProject = (index, field) => {
    const parsed = JSON.parse(content);
    updateLocalContent(parsed.projects.map((project, projectIndex) => projectIndex === index ? { ...project, [field]: !project[field] } : project));
  };

  const updateMessage = async (message, action) => {
    const response = await fetch(`${endpoint}/admin/messages/${message.id}`, {
      method: action === "delete" ? "DELETE" : "PATCH",
      headers: action === "delete" ? authHeaders(token) : { ...authHeaders(token), "Content-Type": "application/json" },
      ...(action === "delete" ? {} : { body: JSON.stringify({ is_read: !message.is_read }) }),
    });
    if (!response.ok) return setNotice("Unable to update this message.");
    setMessages((current) => action === "delete"
      ? current.filter((item) => item.id !== message.id)
      : current.map((item) => item.id === message.id ? { ...item, is_read: !item.is_read } : item));
  };

  if (!token) return (
    <main className="admin-page"><form className="admin-login" onSubmit={login}>
      <p className="admin-kicker">Private workspace</p><h1>Admin sign in</h1>
      <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
      <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
      <button type="submit">Sign in</button>{notice && <p className="admin-error">{notice}</p>}
    </form></main>
  );

  return <main className="admin-page">
    <header className="admin-header"><div><p className="admin-kicker">Aaditya Acharya / CMS</p><h1>Control room</h1></div>
      <button onClick={() => { sessionStorage.removeItem("admin_token"); setToken(null); }}>Sign out</button>
    </header>
    {notice && <p className="admin-notice">{notice}</p>}
    <section className="admin-overview">
      <article><strong>{parseEditorContent(content).projects?.length || 0}</strong><span>Projects</span></article>
      <article><strong>{parseEditorContent(content).skills?.items?.length || 0}</strong><span>Skills</span></article>
      <article><strong>{parseEditorContent(content).experience?.items?.length || 0}</strong><span>Experience entries</span></article>
      <article><strong>{messages.filter((message) => !message.is_read).length}</strong><span>Unread messages</span></article>
    </section>
    <section className="project-manager"><div><p className="admin-kicker">Projects</p><h2>Manage featured work</h2></div>
      <div className="managed-projects">{(parseEditorContent(content).projects || []).map((project, index) => <article key={`${project.title}-${index}`}><div><strong>{project.title}</strong><p>{project.description}</p></div><div className="message-actions"><button onClick={() => toggleProject(index, "published")}>{project.published === false ? "Draft" : "Published"}</button><button onClick={() => toggleProject(index, "featured")}>{project.featured ? "Featured" : "Feature"}</button><button onClick={() => removeProject(index)}>Delete</button></div></article>)}</div>
      <form className="project-form" onSubmit={addProject}><input placeholder="Project title" value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} /><input placeholder="Visual label" value={projectForm.visual} onChange={(event) => setProjectForm({ ...projectForm, visual: event.target.value })} /><input placeholder="Technologies, comma separated" value={projectForm.tags} onChange={(event) => setProjectForm({ ...projectForm, tags: event.target.value })} /><input placeholder="Live or GitHub URL" value={projectForm.link} onChange={(event) => setProjectForm({ ...projectForm, link: event.target.value })} /><textarea placeholder="Project description" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} /><button type="submit">Add project</button></form>
    </section>
    <section className="content-editor"><div><p className="admin-kicker">Global content</p><h2>Edit every public section</h2><p>Use the project manager above for common project changes. The JSON editor controls profile, sections, skills, experience, certifications, visibility, links, and advanced fields.</p></div>
      <textarea value={content} onChange={(event) => setContent(event.target.value)} spellCheck="false" /><button onClick={saveContent}>Save portfolio content</button>
    </section>
    <section className="message-list"><div className="admin-section-heading"><p className="admin-kicker">Inbox</p><h2>{messages.length} messages</h2></div>
      {messages.length === 0 ? <p>No messages yet.</p> : messages.map((message) => <article className={message.is_read ? "message read" : "message"} key={message.id}>
        <div><span>{new Date(message.created_at).toLocaleDateString()}</span><h2>{message.subject}</h2><p>{message.name} / <a href={`mailto:${message.email}`}>{message.email}</a></p><p>{message.message}</p></div>
        <div className="message-actions"><button onClick={() => updateMessage(message, "read")}>{message.is_read ? "Mark unread" : "Mark read"}</button><button onClick={() => updateMessage(message, "delete")}>Delete</button></div>
      </article>)}
    </section>
  </main>;
}
