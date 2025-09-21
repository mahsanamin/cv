const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

async function generatePDF() {
  console.log('🚀 Generating PDF from CV...');

  try {
    const outputPath = path.join(__dirname, 'Muhammad-Ahsan-Amin-CV.pdf');
    if (fs.existsSync(outputPath)) {
      console.log('♻️  Existing PDF found. Replacing with a fresh export...');
      fs.rmSync(outputPath);
    }

    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath();
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath,
      timeout: 60000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1300, height: 2200, deviceScaleFactor: 2 });
    await page.emulateMediaType('screen');

    await page.setRequestInterception(true);
    page.on('request', request => {
      const url = request.url();
      if (url.startsWith('http')) {
        return request.abort();
      }
      return request.continue();
    });

    const htmlPath = path.join(__dirname, 'index.html');
    const fileUrl = pathToFileURL(htmlPath).href;
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    await page.$$eval('a[href$=".pdf"]', links => {
      links.forEach(link => link.setAttribute('href', '#'));
    });

    await page.waitForTimeout(1000);

    const { width, height } = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        width: Math.ceil(root.scrollWidth || root.offsetWidth || document.body.scrollWidth),
        height: Math.ceil(root.scrollHeight || root.offsetHeight || document.body.scrollHeight)
      };
    });

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
      captureBeyondViewport: true
    });

    await page.close();

    const pdfPage = await browser.newPage();
    await pdfPage.setViewport({ width, height, deviceScaleFactor: 1 });
    await pdfPage.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
      @page { size: ${width}px ${height}px; margin: 0; }
      html, body { margin: 0; padding: 0; }
      .wrapper { width: ${width}px; height: ${height}px; }
      .wrapper img { width: 100%; height: 100%; display: block; }
    </style></head><body><div class="wrapper"><img src="data:image/png;base64,${screenshot.toString('base64')}" alt="CV"/></div></body></html>`, { waitUntil: 'load' });
    await pdfPage.emulateMediaType('screen');

    const pdfBuffer = await pdfPage.pdf({
      printBackground: true,
      width: `${width}px`,
      height: `${height}px`,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      pageRanges: '1',
      preferCSSPageSize: true
    });
    await pdfPage.close();

    fs.writeFileSync(outputPath, pdfBuffer);
    await browser.close();

    console.log('✅ PDF generated successfully: Muhammad-Ahsan-Amin-CV.pdf');
    console.log(`📏 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('❌ PDF Generation failed:', error.message);
    console.log('');
    console.log('💡 Alternative options:');
    console.log('1. Use browser print: Open index.html in Chrome and print to PDF');
    console.log('2. Use Docker: docker compose run --rm cv-website npm run generate-pdf');
    console.log('3. Manual creation: Visit the live site and use browser print function');
  }
}

generatePDF();
