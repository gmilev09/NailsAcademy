import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
      if (msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  try {
    await page.goto('http://localhost:3000/Checkout', { waitUntil: 'networkidle2' });
    console.log('Checkout loaded');
    await new Promise(r => setTimeout(r, 1000));
    
    await page.goto('http://localhost:3000/PrivacyPolicy', { waitUntil: 'networkidle2' });
    console.log('PrivacyPolicy loaded');
    await new Promise(r => setTimeout(r, 1000));
  } catch (err) {
    console.log('Navigation failed:', err.message);
  }

  await browser.close();
})();