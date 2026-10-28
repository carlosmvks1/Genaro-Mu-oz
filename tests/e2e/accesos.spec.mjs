import { test, expect } from '@playwright/test';

test('accesos: pictogramas decorativos, textos, teclado y destinos', async ({ page }, testInfo) => {
  await page.goto('./');
  const section = page.getByRole('region', { name: 'Accesos principales' });
  const cards = section.getByRole('link');
  await expect(cards).toHaveCount(3);
  await expect(section.locator('.access-index')).toHaveCount(0);
  const expected = [
    ['Nuestros servicios Atención primaria para la comunidad', 'nuestros-servicios/'],
    ['Antes de acudir Horario y orientación para tu visita', 'antes-de-acudir/'],
    ['Ubicación y contacto Encontranos en Gracias, Lempira', 'ubicacion-y-contacto/'],
  ];
  const shapes = [];
  const boxes = [];
  for (let i = 0; i < expected.length; i++) {
    const card = cards.nth(i);
    await expect(card).toHaveAccessibleName(expected[i][0]);
    await expect(card).toHaveAttribute('href', '/Genaro-Mu-oz/' + expected[i][1]);
    const icon = card.locator('.access-icon');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon.locator('svg')).toHaveAttribute('focusable', 'false');
    await expect(icon.locator('svg')).toBeVisible();
    shapes.push(await icon.locator('svg').innerHTML());
    boxes.push(await card.boundingBox());
  }
  expect(new Set(shapes).size).toBe(3);
  if (testInfo.project.name === 'movil-375') {
    expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height);
  } else {
    expect(boxes[0].y).toBe(boxes[1].y);
    expect(boxes[1].y).toBe(boxes[2].y);
  }
  for (let i = 0; i < 3; i++) {
    const card = cards.nth(i);
    const iconBox = await card.locator('svg').boundingBox();
    const textBox = await card.locator('strong').boundingBox();
    expect(iconBox.x + iconBox.width).toBeLessThanOrEqual(textBox.x);
  }
  await section.screenshot({ path: testInfo.outputPath('accesos.png'), animations: 'disabled' });
  for (const [name, route] of expected) {
    await page.goto('./');
    const link = page.getByRole('link', { name, exact: true });
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(route + '$'));
  }
});
