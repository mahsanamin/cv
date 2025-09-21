# Style & Customization Guide

Use this guide to adapt the CV template to your own profile while keeping the polished layout intact.

## 1. Prerequisites
- Docker installed (Desktop or Engine 20+)
- Basic familiarity with HTML/CSS editing

## 2. Fork & Clone
```bash
git clone https://github.com/<your-username>/cv.git
cd cv
```

## 3. Core Customizations
Update the fields below inside `index.html`:
- **Identity**: name, title, location, contact links
- **Summary**: introductory paragraph in the main column
- **Experience**: job titles, companies, dates, achievements (use bullet points with measurable outcomes)
- **Sidebar**: skills, competencies, education, quick stats
- **Download link**: rename `Muhammad-Ahsan-Amin-CV.pdf` wherever referenced if you change the filename

## 4. Live Preview & PDF
```bash
# Start the site (http://localhost:9090)
docker compose up -d

# Regenerate the PDF after edits
docker compose run --rm cv-website npm run generate-pdf

# Stop services
docker compose down
```
The PDF command captures the exact desktop layout, so keep the container width at 1200 px for best results.

## 5. Visual Tweaks
Inside the `<style>` block:
- Adjust the gradient colors in `.header`
- Swap typography by changing the `body` font stack (or add Google Fonts link tags)
- Modify `.skill-tag` and `.section-title` colors to match your brand
- Add new sections by duplicating existing `.section` blocks

## 6. Final Checklist
- [ ] All personal/contact details updated
- [ ] Sidebar competencies reflect your strengths
- [ ] Experience bullets quantified where possible
- [ ] PDF regenerated and committed to the repo root
- [ ] GitHub Pages (or your hosting) updated after pushing changes

Happy customizing!
