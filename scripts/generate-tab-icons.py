from math import cos, pi, sin
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(r"d:\newIID\newIID\src\assets\images")
SIZE = 192
FILL = (255, 255, 255, 255)
W = 12


def canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def save(img: Image.Image, name: str) -> None:
    img.resize((96, 96), Image.Resampling.LANCZOS).save(OUT / name)


def tab_courses() -> None:
    img, d = canvas()
    d.line([(96, 40), (36, 52), (36, 148), (96, 136)], fill=FILL, width=W, joint="curve")
    d.line([(96, 40), (156, 52), (156, 148), (96, 136)], fill=FILL, width=W, joint="curve")
    d.line([(96, 40), (96, 136)], fill=FILL, width=W)
    save(img, "tab-courses.png")


def tab_solution() -> None:
    img, d = canvas()
    d.rounded_rectangle((46, 46, 146, 146), 14, outline=FILL, width=W)
    d.ellipse((80, 22, 112, 58), outline=FILL, width=W)
    d.ellipse((22, 80, 58, 112), outline=FILL, width=W)
    d.arc((80, 134, 112, 170), 200, 340, fill=FILL, width=W)
    d.arc((134, 80, 170, 112), 110, 250, fill=FILL, width=W)
    save(img, "tab-solution.png")


def tab_home() -> None:
    img, d = canvas()
    s = 52
    gap = 16
    x0, y0 = 36, 36
    for row in range(2):
        for col in range(2):
            x = x0 + col * (s + gap)
            y = y0 + row * (s + gap)
            d.rounded_rectangle((x, y, x + s, y + s), 10, outline=FILL, width=W)
    save(img, "tab-home.png")


def tab_services() -> None:
    img, d = canvas()
    cx, cy = 96, 96
    d.ellipse((cx - 28, cy - 28, cx + 28, cy + 28), outline=FILL, width=W)
    d.ellipse((cx - 12, cy - 12, cx + 12, cy + 12), outline=FILL, width=W)
    for i in range(8):
        ang = i * pi / 4
        x1 = cx + cos(ang) * 40
        y1 = cy + sin(ang) * 40
        x2 = cx + cos(ang) * 62
        y2 = cy + sin(ang) * 62
        d.line([(x1, y1), (x2, y2)], fill=FILL, width=W)
    save(img, "tab-services.png")


def tab_schemes() -> None:
    img, d = canvas()
    d.rounded_rectangle((42, 40, 150, 156), 16, outline=FILL, width=W)
    d.line([(42, 72), (150, 72)], fill=FILL, width=W)
    d.line([(62, 96), (130, 96)], fill=FILL, width=W)
    d.line([(62, 118), (130, 118)], fill=FILL, width=W)
    d.line([(62, 140), (108, 140)], fill=FILL, width=W)
    save(img, "tab-schemes.png")


if __name__ == "__main__":
    tab_courses()
    tab_solution()
    tab_home()
    tab_services()
    tab_schemes()
    print("tab icons ready")
