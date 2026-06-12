import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } }); // iPhone size

// 1. Home page
await page.goto('https://blind-test-musique-c.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: 'C:/Users/loicr/verify_01_home.png' });
console.log('1. Home loaded, title:', await page.title());

// 2. Click Mode Libre
await page.click('text=Mode Libre');
await page.waitForTimeout(1000);
await page.screenshot({ path: 'C:/Users/loicr/verify_02_config.png' });
console.log('2. Config screen loaded');

// 3. Click JOUER (start game)
await page.click('text=JOUER');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'C:/Users/loicr/verify_03_game_ready.png', fullPage: true });
console.log('3. Game screen (ready phase) - screenshot taken');

// Check if QCM options are visible BEFORE clicking play
const qcmVisible = await page.locator('.grid-cols-2').first().isVisible().catch(() => false);
const btnA = await page.locator('text=A').first().isVisible().catch(() => false);
console.log('   QCM grid visible:', qcmVisible, '| Letter A visible:', btnA);

// Check page text for QCM indicator
const pageText = await page.locator('body').innerText();
const hasQcm = pageText.includes('Quelle est cette chanson');
console.log('   "Quelle est cette chanson" text visible:', hasQcm);

// 4. Click ECOUTER if visible, then check QCM
const playBtn = page.locator('text=ÉCOUTER');
const playVisible = await playBtn.isVisible().catch(() => false);
console.log('   Play button visible:', playVisible);

if (playVisible) {
  await playBtn.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/loicr/verify_04_listening.png', fullPage: true });
  console.log('4. After clicking ÉCOUTER - screenshot taken');

  const qcmAfterPlay = await page.locator('text=Quelle est cette chanson').isVisible().catch(() => false);
  console.log('   QCM visible after play:', qcmAfterPlay);
}

await browser.close();
console.log('Done.');
