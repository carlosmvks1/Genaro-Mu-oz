/** Resuelve enlaces internos correctamente con el subdirectorio de GitHub Pages. */
export function siteUrl(path = ''): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';
  return base + path.replace(/^\/+/, '');
}
