import { test, expect } from '@playwright/test';

test('Chagas: fotos, aviso seguro y fuentes hondureñas', async ({ page }) => {
  await page.goto('enfermedades/chagas/');
  const photos = page.locator('.chagas-gallery img');
  await expect(photos).toHaveCount(2);
  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveAttribute('alt', /Rhodnius prolixus|Triatoma dimidiata/);
    await expect.poll(() => photo.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(new URL(await photo.getAttribute('src'), page.url()).origin).toBe(new URL(page.url()).origin);
  }
  const article = page.locator('.health-article');
  await expect(article).toContainText('Si no podés recogerla sin riesgo, dejala y avisá');
  await expect(article).toContainText('sin hacerle agujeros');
  await expect(article).toContainText('Puede estar viva o muerta');
  await expect(article).toContainText('técnico de Salud Ambiental');
  await expect(page.getByRole('link', { name: /rotafolio de la Secretaría/ })).toHaveAttribute('href', /rotafolio_paginas.pdf#page=22$/);
  await expect(page.getByRole('heading', { name: 'Para promotores: orientar y dar seguimiento' })).toBeVisible();
});
