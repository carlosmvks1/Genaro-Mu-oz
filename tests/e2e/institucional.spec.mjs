import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  { path: 'nuestros-servicios/', slug: 'servicios' },
  { path: 'antes-de-acudir/', slug: 'visita' },
  { path: 'ubicacion-y-contacto/', slug: 'ubicacion' },
  { path: './', slug: 'inicio' },
  { path: 'el-centro/', slug: 'centro' },
  { path: 'enfermedades/chagas/', slug: 'chagas' },
  { path: 'enfermedades/tuberculosis/', slug: 'tuberculosis' },
];

test('portada: la fachada real tiene prioridad y el título queda fuera de la imagen', async ({ page }) => {
  await page.goto('./');
  const title = page.getByRole('heading', { level: 1 });
  const photo = page.locator('.photo-hero-image');
  await expect(title).toContainText('CIS Genaro Muñoz Hernández');
  await expect(photo).toHaveAttribute('src', /cis-entrada.*\.avif$/);
  await expect(photo).toHaveAttribute('loading', 'eager');
  await expect(photo).toHaveAttribute('fetchpriority', 'high');
  await expect(photo).toHaveAttribute('width', '4160');
  await expect(photo).toHaveAttribute('srcset', /1200w, .*1920w, .*4160w/);
  await expect(photo).toHaveAttribute('alt', /Fachada y acceso al CIS/);
  await expect.poll(() => photo.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  const titleBox = await title.boundingBox();
  const photoBox = await photo.boundingBox();
  expect(titleBox.y + titleBox.height).toBeLessThan(photoBox.y);
  await expect(page.locator('.photo-hero-details')).toContainText('7:00 a. m. a 3:00 p. m.');
  await page.locator('.photo-hero-caption a[href="#atencion"]').click();
  await expect(page).toHaveURL(/#atencion$/);
});

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
    // Forzar el disparo de lazy-loading antes de capturar la página completa.
    // Sin ello las capturas largas pueden mostrar espacios vacíos aunque la foto funcione.
    for (const img of await page.locator('img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    await page.evaluate(async () => { await document.fonts.ready; window.scrollTo({top:0,left:0,behavior:'instant'}); });
    await page.waitForTimeout(200);
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
  const button = page.locator('[data-menu]');
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


test('tuberculosis se consulta dentro del portal, sin redirección externa', async ({page}) => {
  await page.goto('./');
  await page.locator('a.topic-card[href$="/enfermedades/tuberculosis/"]').click();
  await expect(page).toHaveURL(/\/enfermedades\/tuberculosis\/$/);
  await expect(page.getByRole('heading',{level:1})).toContainText('Tuberculosis');
  await expect(page.locator('article.health-article')).toContainText('Mycobacterium tuberculosis');
});


test('ficha institucional informa horario y servicios reportados sin inventar contactos', async ({page}) => {
  await page.goto('el-centro/');
  await expect(page.getByRole('heading', {level:1})).toContainText('CIS Genaro Muñoz Hernández');
  await expect(page.locator('.directory-list')).not.toContainText('Teléfono');
  await expect(page.locator('.directory-list')).toContainText('Horario de atención');
  await expect(page.locator('.directory-list')).toContainText('7:00 a. m. a 3:00 p. m.');
  await expect(page.locator('.directory-services')).toContainText('Consulta de medicina general');
  await expect(page.getByText('La consulta general no tiene cobro.')).toBeVisible();
  await expect(page.locator('.directory-list')).toContainText('Gracias');
  await expect(page.getByRole('heading', {name: 'Nuestra historia'})).toBeVisible();
  await expect(page.locator('.institutional-history')).toContainText('fundado en 1963');
  await expect(page.locator('.directory-grid')).not.toContainText('pendientes de aprobación institucional');
  await expect(page.locator('.directory-grid')).not.toContainText('reportados por un colaborador');
});


test('fotografías institucionales cargan correctamente y tienen texto alternativo', async ({ page }) => {
  await page.goto('el-centro/');
  const photos = page.locator('.institutional-gallery img');
  await expect(photos).toHaveCount(2);
  for (const image of await photos.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('alt', /.+/);
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  await page.goto('./');
  const front = page.locator('.institutional-photo-home img');
  await expect(front).toHaveCount(1);
  await front.scrollIntoViewIfNeeded();
  await expect.poll(() => front.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
});

test('fase 4: datos confirmados y fotografías distintas', async ({page}) => {
  await page.goto('./');
  expect(await page.locator('.photo-hero-image').getAttribute('src')).not.toBe(await page.locator('.institutional-photo-home img').getAttribute('src'));
  for (const route of ['nuestros-servicios/', 'antes-de-acudir/', 'ubicacion-y-contacto/']) {
    await page.goto('./');
    await page.locator(`.access-card[href$="/${route}"]`).click();
    await expect(page).toHaveURL(new RegExp(route + '$'));
    await expect(page.locator('main')).toContainText('7:00 a. m. a 3:00 p. m.');
    await expect(page.locator('main')).not.toContainText(/lunes|martes|miércoles|jueves|viernes|sábado|domingo|identidad|Teresa Madrid/i);
    await expect(page.locator('main iframe, main a[href^="tel:"], main a[href^="mailto:"]')).toHaveCount(0);
  }
  await page.goto('nuestros-servicios/');
  await expect(page.locator('.directory-services li')).toHaveCount(10);
  await expect(page.locator('main')).toContainText('La consulta general no tiene cobro.');
});
