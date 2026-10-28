import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  { path: './', slug: 'inicio' },
  { path: 'enfermedades/chagas/', slug: 'chagas' },
];

for (const { path, slug } of paths) {
  test(`${slug}: navegación, legibilidad y captura`, async ({ page }, testInfo) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('heading', {level:1})).toHaveCount(1);
    await expect(page.locator('header .identity')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: testInfo.outputPath(`${slug}-${testInfo.project.name}.png`), fullPage: true, animations: 'disabled' });
    const overflow = await page.evaluate(() => ({
      width: window.innerWidth,
      docWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    }));
    expect(Math.max(overflow.docWidth, overflow.bodyWidth)-overflow.width, JSON.stringify(overflow)).toBeLessThanOrEqual(2);
    expect(errors, `Errores de JavaScript en ${slug}`).toEqual([]);
  });

  test(`${slug}: accesibilidad automática WCAG A/AA`, async ({ page }) => {
    await page.goto(path);
    const report = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(report.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  });
}

test('móvil y tableta: el menú abre, navega y cierra con Escape', async ({page}, testInfo) => {
  test.skip(testInfo.project.name === 'escritorio-1440', 'En escritorio se utiliza navegación horizontal');
  await page.goto('./');
  const button = page.getByRole('button', {name:/Menú/});
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded','true');
  await expect(page.getByRole('navigation',{name:'Navegación principal'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded','false');
  await button.click();
  await page.getByRole('navigation',{name:'Navegación principal'}).getByRole('link',{name:'Educación en salud'}).click();
  await expect(page).toHaveURL(/#biblioteca$/);
  await expect(button).toHaveAttribute('aria-expanded','false');
});

test('el enlace de Chagas desde la portada lleva a la ficha', async ({page}) => {
  await page.goto('./');
  await page.locator('a.topic-card.chagas').click();
  await expect(page).toHaveURL(/\/enfermedades\/chagas\/$/);
  await expect(page.getByRole('heading',{level:1})).toContainText('Chagas');
});
