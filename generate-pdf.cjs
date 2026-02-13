const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const htmlPath = path.resolve(__dirname, 'SOLUTION_PAGE_SCHEMA.html');
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    await page.pdf({
        path: path.resolve(__dirname, 'SOLUTION_PAGE_SCHEMA.pdf'),
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
        printBackground: true,
    });
    await browser.close();
    console.log('PDF generated: SOLUTION_PAGE_SCHEMA.pdf');
})();
