"""Genera la imagen de WhatsApp desde una fotografía real del CIS.
No utiliza imágenes externas ni logotipos de otras instituciones.
Requiere Pillow 12.0 y la foto AVIF ya presente en el repositorio.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src/assets/fotos/cis-entrada-1200.avif'
TARGET = ROOT / 'public/og-cis.jpg'
WIDTH, HEIGHT = 1200, 630
NAVY = (17, 40, 61)
WHITE = (250, 250, 247)
ACCENT = (104, 176, 153)

def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()

def main():
    scene = Image.new('RGB', (WIDTH, HEIGHT), NAVY)
    photo = Image.open(SOURCE).convert('RGB')
    photo = ImageOps.fit(photo, (710, HEIGHT), method=Image.Resampling.LANCZOS, centering=(0.52, 0.40))
    scene.paste(photo, (0, 0))
    draw = ImageDraw.Draw(scene)
    draw.rectangle((710, 0, 1200, 630), fill=NAVY)
    draw.rectangle((746, 64, 842, 70), fill=ACCENT)
    title = font('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf', 47)
    small = font('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
    label = font('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 19)
    draw.text((746, 95), 'CENTRO INTEGRAL DE SALUD', font=label, fill=(184, 215, 211))
    for index, line in enumerate(['Genaro Muñoz', 'Hernández']):
        draw.text((744, 203 + index * 74), line, font=title, fill=WHITE)
    draw.line((746, 411, 1156, 411), fill=(84, 109, 122), width=2)
    draw.text((746, 445), 'Gracias, Lempira · Honduras', font=small, fill=WHITE)
    draw.text((746, 485), 'Información y educación en salud', font=small, fill=(193, 213, 216))
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    scene.save(TARGET, 'JPEG', quality=87, optimize=True, progressive=True, subsampling=0)
    print(f'Imagen social generada: {TARGET} ({TARGET.stat().st_size} bytes)')

if __name__ == '__main__':
    main()
