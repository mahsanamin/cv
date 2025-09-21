# Muhammad Ahsan Amin – CV

Live resume, Docker-first tooling, and a synced PDF export.

## Quick Links
- Website: https://mahsanamin.github.io/cv
- PDF: https://mahsanamin.github.io/cv/Muhammad-Ahsan-Amin-CV.pdf

## Run Locally (Docker only)
```bash
git clone https://github.com/mahsanamin/cv.git
cd cv

docker compose up -d          # serve at http://localhost:9090
docker compose run --rm cv-website npm run generate-pdf
docker compose down
```

## Follow This Style
Want the same look and workflow? Follow the step-by-step guide in [`docs/style-guide.md`](docs/style-guide.md).

## More Docs
- Developer workflow: [`docs/development.md`](docs/development.md)
- Privacy policy: [`PRIVACY.md`](PRIVACY.md)

Licensed under the MIT License.
