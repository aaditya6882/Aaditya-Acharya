# Aaditya Acharya Portfolio

This project has two applications:

- `Portfolio`: Vite React frontend.
- `Portfolio/backend`: Node.js Express API with MongoDB persistence.

## Local setup

1. Install frontend dependencies: `npm install` inside `Portfolio`.
2. Install backend dependencies: `npm install` inside `Portfolio/backend`.
3. Copy `Portfolio/backend/.env.example` to `Portfolio/backend/.env` and set `MONGODB_URI`, `JWT_SECRET`, `PORT`, and `FRONTEND_URL`.
4. Set `VITE_API_URL=http://localhost:4000/api` in the frontend environment when using a separate API process.
5. Start MongoDB or use a MongoDB Atlas connection string.
6. Start the API with `npm run backend:dev` from `Portfolio`.
7. Start the frontend with `npm run dev` from `Portfolio`.

The frontend Vite proxy sends `/api` requests to `http://localhost:4000` during local development.

## Admin account

From `Portfolio`, run:

`npm --prefix backend run create-admin -- admin@example.com "use-a-long-password"`

The command creates or updates an admin account in MongoDB using bcrypt hashing. There is no public registration endpoint.

## API endpoints

- `GET /api/health`
- `GET /api/content`
- `POST /api/contact`
- `POST /api/admin/login`
- `PUT /api/content`
- `GET /api/admin/messages`
- `PATCH /api/admin/messages/:id`
- `DELETE /api/admin/messages/:id`

Admin content and message routes require a JWT bearer token issued by the login endpoint.

## Content management

Open `/admin` in the frontend and sign in with the MongoDB admin account. The
dashboard stores one content document in the `PortfolioContent` collection. Use
the Projects manager for normal project CRUD: add projects, delete them with
confirmation, toggle featured/published state, and save changes. The advanced
editor controls the public site name, links, hero, about cards, skills,
education, experience, certifications, section visibility, projects, contact
copy, and footer. The public frontend uses the bundled content as a safe
fallback until the API has content saved.

## Deployment

Netlify can continue hosting the static React frontend using the root `netlify.toml`. The Node API must be deployed separately to a Node-capable service such as Render, Railway, Fly.io, or a VPS. Set the deployed API URL as `VITE_API_URL` when building the frontend, and configure `MONGODB_URI`, `JWT_SECRET`, `PORT`, `FRONTEND_URL`, and `NODE_ENV=production` on the API host.

MongoDB Atlas provides managed backups. Enable automated backups for production and periodically test restoring a backup into a separate database.

## WhatsApp

The configured number remains in `VITE_WHATSAPP_NUMBER`. The frontend strips formatting characters before creating `wa.me` URLs. Confirm the full international number before production messaging.
