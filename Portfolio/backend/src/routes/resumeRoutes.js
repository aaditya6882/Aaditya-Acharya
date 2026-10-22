import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure multer: accept only PDF, max 10 MB
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    // Always save as "resume" + original extension
    const ext = path.extname(file.originalname).toLowerCase() || ".pdf";
    cb(null, `resume${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

export const resumeRoutes = Router();

// ─── PUBLIC: Check if resume exists ──────────────────────────────────────────
resumeRoutes.get("/info", (_req, res) => {
  const resumeFile = findResumeFile();
  if (!resumeFile) {
    return res.json({ exists: false });
  }
  const stat = fs.statSync(path.join(UPLOAD_DIR, resumeFile));
  return res.json({
    exists: true,
    filename: resumeFile,
    size: stat.size,
    updatedAt: stat.mtime.toISOString(),
  });
});

// ─── PUBLIC: Serve / download the resume file ────────────────────────────────
resumeRoutes.get("/download", (_req, res) => {
  const resumeFile = findResumeFile();
  if (!resumeFile) {
    return res.status(404).json({ error: "No resume uploaded yet." });
  }
  const filePath = path.join(UPLOAD_DIR, resumeFile);
  res.download(filePath, `Aaditya_Acharya_Resume${path.extname(resumeFile)}`);
});

// ─── PUBLIC: View (inline) the resume in browser ─────────────────────────────
resumeRoutes.get("/view", (_req, res) => {
  const resumeFile = findResumeFile();
  if (!resumeFile) {
    return res.status(404).json({ error: "No resume uploaded yet." });
  }
  const filePath = path.join(UPLOAD_DIR, resumeFile);
  const ext = path.extname(resumeFile).toLowerCase();
  const mimeTypes = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  res.setHeader("Content-Disposition", `inline; filename="Aaditya_Acharya_Resume${ext}"`);
  fs.createReadStream(filePath).pipe(res);
});

// ─── ADMIN: Upload resume ────────────────────────────────────────────────────
resumeRoutes.post("/upload", requireAuth, (req, res) => {
  upload.single("resume")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded." });
    }
    return res.json({
      message: "Resume uploaded successfully!",
      filename: req.file.filename,
      size: req.file.size,
    });
  });
});

// ─── ADMIN: Delete resume ────────────────────────────────────────────────────
resumeRoutes.delete("/", requireAuth, (_req, res) => {
  const resumeFile = findResumeFile();
  if (!resumeFile) {
    return res.status(404).json({ error: "No resume file found." });
  }
  fs.unlinkSync(path.join(UPLOAD_DIR, resumeFile));
  return res.json({ message: "Resume deleted successfully." });
});

// ─── Helper: find the resume file (resume.pdf, resume.doc, resume.docx) ─────
function findResumeFile() {
  const candidates = ["resume.pdf", "resume.doc", "resume.docx"];
  for (const name of candidates) {
    if (fs.existsSync(path.join(UPLOAD_DIR, name))) {
      return name;
    }
  }
  return null;
}
