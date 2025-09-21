# Development Guide

The development and testing workflow for this project intentionally runs only inside Docker so every environment matches GitHub Actions.

---

## Prerequisites

- Docker Desktop or Docker Engine 20+
- Docker Compose V2 (`docker compose ...` commands)

No local Node.js or Python runtimes are required.

---

## Daily Workflow

```bash
# 1. Start the preview server (http://localhost:9090)
docker compose up -d

# 2. Edit files on your host – the container watches the mounted volume
#    Refresh your browser to see updates

# 3. Export the PDF when needed
docker compose run --rm cv-website npm run generate-pdf

# 4. Stop services when finished
docker compose down
```

The compose service mounts the repository into `/app`, so any changes you make to `index.html` (or supporting assets) are visible immediately in the running container.

---

## PDF Troubleshooting

- Always export via `docker compose run --rm cv-website npm run generate-pdf`.
- The command uses Puppeteer + Chromium inside Alpine Linux, identical to CI.
- If the command fails, inspect logs with `docker compose logs cv-website` or run an interactive shell using `docker compose run --rm cv-website sh`.

---

## Container Reference

- **Base image**: `node:20-alpine`
- **Server**: `npx serve -s . -l 9090`
- **PDF export**: `node generate-pdf.js`
- **Health check**: `curl -f http://localhost:9090/`

---

For customization tips, see [`docs/style-guide.md`](style-guide.md).
