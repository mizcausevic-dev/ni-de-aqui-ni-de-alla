import type { Recipe, Rgb } from "./recipe";
import { derive, formatClock, type FilmState, type PourKind } from "./timeline";

type Handles = {
  stage: HTMLElement;
  wisps: SVGEllipseElement[];
  kicker: HTMLElement;
  title: HTMLElement;
  measure: HTMLElement;
  detail: HTMLElement;
  count: HTMLElement;
  live: HTMLElement;
  card: HTMLElement;
  rocks: SVGSVGElement;
  mix: SVGSVGElement;
  play: HTMLButtonElement;
  restart: HTMLButtonElement;
  capture: HTMLButtonElement;
  scrub: HTMLInputElement;
  clock: HTMLElement;
};

export type FilmController = {
  seek: (t: number) => void;
  play: () => void;
  pause: () => void;
  restart: () => void;
  getTime: () => number;
};

const ROCKS = `
<svg class="glass rocks" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" aria-hidden="true">
  <defs>
    <clipPath id="rocksCavity"><path d="M98 102 L128 412 Q200 454 272 412 L302 102 Q200 74 98 102 Z"/></clipPath>
    <linearGradient id="rocksLiquid" x1="0" y1="1" x2="0" y2="0">
      <stop class="liq-deep" offset="0" stop-color="#6a3818"/>
      <stop class="liq-mid" offset="0.62" stop-color="#d4893a"/>
      <stop class="liq-top" offset="1" stop-color="#f0c27a"/>
    </linearGradient>
    <linearGradient id="linerGrad" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#1c4d2c"/>
      <stop offset="0.45" stop-color="#6eae62"/>
      <stop offset="1" stop-color="#234e30"/>
    </linearGradient>
    <linearGradient id="garnishGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8fbf72"/>
      <stop offset="0.4" stop-color="#3f7a42"/>
      <stop offset="1" stop-color="#1d4a2a"/>
    </linearGradient>
    <linearGradient id="iceFace" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.82"/>
      <stop offset="0.45" stop-color="#d5e7ec" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.5"/>
    </linearGradient>
    <clipPath id="rocksWet"><rect class="wet-rect" x="80" y="300" width="240" height="180"/></clipPath>
  </defs>
  <ellipse class="shadow" cx="200" cy="492" rx="96" ry="13" fill="rgba(0,0,0,0.5)"/>
  <ellipse class="hero-glow" cx="200" cy="300" rx="120" ry="150" fill="rgba(228,176,106,0.0)"/>
  <path d="M80 96 L118 436 Q200 484 282 436 L320 96 Q200 58 80 96 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,248,240,0.42)" stroke-width="2.4"/>
  <g clip-path="url(#rocksCavity)">
    <rect x="70" y="70" width="260" height="400" fill="#16100c"/>
    <g class="liner">
      <path d="M124 404 C102 320 96 230 118 150 C132 124 150 118 162 140 C174 220 168 320 154 404 Z" fill="url(#linerGrad)"/>
      <path d="M136 392 C122 300 120 210 142 148" fill="none" stroke="#173c24" stroke-width="1.6"/>
      <path d="M128 360 C140 330 146 300 140 270" fill="none" stroke="#8fbf72" stroke-width="0.8" opacity="0.7"/>
      <path d="M146 370 C154 320 152 250 148 200" fill="none" stroke="#1d4a2c" stroke-width="0.7" opacity="0.8"/>
    </g>
    <rect class="liquid" x="78" y="420" width="244" height="0" fill="url(#rocksLiquid)"/>
    <ellipse class="meniscus" cx="200" cy="420" rx="78" ry="8" fill="#f2c98a" opacity="0"/>
    <g class="specks"></g>
  </g>
  <g class="cube">
    <rect x="146" y="286" width="112" height="112" rx="10" fill="url(#iceFace)" stroke="rgba(255,255,255,0.78)" stroke-width="1.6"/>
    <path d="M164 300 L188 360 L170 386" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
    <path d="M230 308 L214 348 L236 378" fill="none" stroke="rgba(210,230,236,0.45)" stroke-width="1"/>
    <path d="M158 312 L242 330" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="6" stroke-linecap="round"/>
  </g>
  <g class="cube-wet" clip-path="url(#rocksWet)">
    <rect x="146" y="286" width="112" height="112" rx="10" fill="rgba(196,122,48,0.28)"/>
  </g>
  <path d="M108 118 C100 230 112 340 136 418" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M294 128 C306 240 290 346 268 412" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="200" cy="96" rx="120" ry="20" fill="none" stroke="rgba(255,248,240,0.72)" stroke-width="2.6"/>
  <ellipse cx="200" cy="96" rx="100" ry="13" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="1.4"/>
  <g class="condense" fill="rgba(255,255,255,0.55)">
    <circle cx="112" cy="180" r="2.1"/><circle cx="118" cy="230" r="1.5"/><circle cx="108" cy="280" r="1.8"/>
    <circle cx="292" cy="200" r="1.7"/><circle cx="300" cy="260" r="2"/><circle cx="286" cy="320" r="1.4"/>
    <circle cx="126" cy="340" r="1.3"/><circle cx="278" cy="160" r="1.2"/>
  </g>
  <g class="garnish">
    <path d="M188 118 C168 150 176 188 196 196 C188 160 186 136 196 112 C210 78 268 18 372 -18 C452 -6 508 36 492 64 C452 86 372 108 286 122 C230 132 196 128 188 118 Z" fill="url(#garnishGrad)"/>
    <path d="M198 124 C270 78 360 28 478 34" fill="none" stroke="#143222" stroke-width="2.1" stroke-linecap="round"/>
    <path d="M206 112 C280 70 370 32 460 30" fill="none" stroke="#e4f6d4" stroke-width="1" opacity="0.75"/>
    <path d="M200 132 C290 100 390 74 470 66" fill="none" stroke="#1d4a2c" stroke-width="1"/>
    <path d="M214 104 C300 62 390 30 470 26" fill="none" stroke="#245c34" stroke-width="0.8"/>
    <path d="M192 150 C186 178 190 200 204 214" fill="none" stroke="#2a6840" stroke-width="3.4" stroke-linecap="round"/>
  </g>
</svg>`;

const MIX = `
<svg class="glass mix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" aria-hidden="true">
  <defs>
    <clipPath id="mixCavity"><path d="M124 58 L140 424 Q200 460 260 424 L276 58 Q200 36 124 58 Z"/></clipPath>
    <linearGradient id="mixLiquid" x1="0" y1="1" x2="0" y2="0">
      <stop class="liq-deep" offset="0" stop-color="#6a3818"/>
      <stop class="liq-mid" offset="0.6" stop-color="#d4893a"/>
      <stop class="liq-top" offset="1" stop-color="#f0c27a"/>
    </linearGradient>
    <linearGradient id="bottleGlass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff4e4" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#fff4e4" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <ellipse class="shadow" cx="200" cy="492" rx="78" ry="12" fill="rgba(0,0,0,0.45)"/>
  <path d="M112 48 L132 446 Q200 486 268 446 L288 48 Q200 24 112 48 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(255,248,240,0.4)" stroke-width="2.3"/>
  <g clip-path="url(#mixCavity)">
    <rect x="100" y="40" width="200" height="430" fill="#14100d"/>
    <g class="cubes"></g>
    <rect class="liquid" x="110" y="430" width="180" height="0" fill="url(#mixLiquid)"/>
    <ellipse class="meniscus" cx="200" cy="430" rx="62" ry="7" fill="#f2c98a" opacity="0"/>
    <rect class="frost" x="112" y="52" width="176" height="70" fill="url(#mixLiquid)" opacity="0"/>
    <g class="specks"></g>
  </g>
  <path class="stream" d="M200 20 C200 80 200 120 200 160" fill="none" stroke="#d4893a" stroke-width="7" stroke-linecap="round" opacity="0"/>
  <g class="bottle bourbon">
    <rect x="176" y="-6" width="48" height="18" rx="3" fill="#c47a32"/>
    <rect x="186" y="8" width="28" height="16" fill="#e7c49a"/>
    <rect x="168" y="22" width="64" height="46" rx="6" fill="#b8742e" stroke="rgba(255,255,255,0.3)"/>
    <rect x="176" y="36" width="48" height="14" fill="#f3e2c4" opacity="0.85"/>
  </g>
  <g class="bottle mezcal">
    <rect x="182" y="-18" width="36" height="22" rx="3" fill="#6d6258"/>
    <rect x="190" y="2" width="20" height="18" fill="#d9cfc3"/>
    <rect x="170" y="18" width="60" height="52" rx="8" fill="#8a7564" stroke="rgba(255,255,255,0.25)"/>
    <rect x="180" y="34" width="40" height="16" fill="#1c1916"/>
  </g>
  <g class="bottle syrup">
    <path d="M188 -4 H212 L206 28 H194 Z" fill="#f0d7a4"/>
    <path d="M176 28 H224 L210 70 H190 Z" fill="#8a4e22" stroke="rgba(255,236,210,0.35)"/>
  </g>
  <g class="bottle bitters">
    <rect x="192" y="-8" width="16" height="26" rx="2" fill="#2a211c"/>
    <circle cx="200" cy="28" r="16" fill="#6e221c" stroke="rgba(255,255,255,0.25)"/>
    <rect x="196" y="-16" width="8" height="12" rx="1" fill="#cbbba6"/>
  </g>
  <g class="dashes">
    <circle class="drop a" r="4.4" cx="200" cy="40" fill="#e8c27a" opacity="0"/>
    <circle class="drop b" r="4.4" cx="200" cy="40" fill="#e8c27a" opacity="0"/>
  </g>
  <path d="M136 78 C128 190 134 320 150 410" fill="none" stroke="rgba(255,255,255,0.38)" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="200" cy="48" rx="88" ry="16" fill="none" stroke="rgba(255,248,240,0.7)" stroke-width="2.4"/>
  <g class="spoon">
    <line x1="200" y1="8" x2="200" y2="400" stroke="#d5dde2" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="200" cy="412" rx="18" ry="8" fill="#e7eef2" stroke="#b7c3ca"/>
    <circle cx="200" cy="12" r="5" fill="#e7eef2"/>
  </g>
  <g class="strainer" opacity="0">
    <path d="M132 70 H268" stroke="#d5dde2" stroke-width="3"/>
    <path d="M150 70 q6 16 0 28 M170 70 q6 18 0 32 M190 70 q6 20 0 36 M210 70 q6 20 0 36 M230 70 q6 18 0 32 M250 70 q6 16 0 28" fill="none" stroke="#c5cfd6" stroke-width="1.3"/>
  </g>
</svg>`;

const CUBE_LAYOUT = [
  { x: 156, y: 300, w: 52, h: 44, r: -8 },
  { x: 206, y: 318, w: 48, h: 42, r: 11 },
  { x: 174, y: 246, w: 46, h: 40, r: 4 },
  { x: 222, y: 258, w: 42, h: 38, r: -12 },
  { x: 188, y: 206, w: 40, h: 34, r: 7 },
];

function svgFrom(markup: string) {
  const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
  if (doc.querySelector("parsererror")) throw new Error("SVG failed to parse");
  return document.importNode(doc.documentElement, true) as unknown as SVGSVGElement;
}

function qs<T extends Element>(root: ParentNode, sel: string) {
  const node = root.querySelector(sel);
  if (!node) throw new Error(`Missing ${sel}`);
  return node as T;
}

function rgbCss(rgb: Rgb, a = 1) {
  const [r, g, b] = rgb.map((n) => Math.round(n)) as [number, number, number];
  return a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
}

function lighten(rgb: Rgb, amount: number): Rgb {
  return [
    rgb[0] + (255 - rgb[0]) * amount,
    rgb[1] + (255 - rgb[1]) * amount,
    rgb[2] + (255 - rgb[2]) * amount,
  ];
}

function darken(rgb: Rgb, amount: number): Rgb {
  return [rgb[0] * (1 - amount), rgb[1] * (1 - amount), rgb[2] * (1 - amount)];
}

function setStops(svg: SVGSVGElement, rgb: Rgb) {
  const deep = svg.querySelector(".liq-deep");
  const mid = svg.querySelector(".liq-mid");
  const top = svg.querySelector(".liq-top");
  deep?.setAttribute("stop-color", rgbCss(darken(rgb, 0.38)));
  mid?.setAttribute("stop-color", rgbCss(rgb));
  top?.setAttribute("stop-color", rgbCss(lighten(rgb, 0.35)));
}

function fillLevel(
  svg: SVGSVGElement,
  oz: number,
  capacity: number,
  top: number,
  bottom: number,
  rxBottom: number,
  rxTop: number,
) {
  const level = Math.max(0, Math.min(1, oz / capacity));
  const h = (bottom - top) * level;
  const y = bottom - h;
  const liquid = qs<SVGRectElement>(svg, ".liquid");
  const meniscus = qs<SVGEllipseElement>(svg, ".meniscus");
  liquid.setAttribute("y", y.toFixed(2));
  liquid.setAttribute("height", Math.max(0, h + 8).toFixed(2));
  liquid.setAttribute("opacity", level < 0.012 ? "0" : "1");
  const rx = rxBottom + (rxTop - rxBottom) * level;
  meniscus.setAttribute("cy", y.toFixed(2));
  meniscus.setAttribute("rx", rx.toFixed(2));
  meniscus.setAttribute("opacity", level < 0.02 ? "0" : "0.9");
  meniscus.setAttribute("fill", liquid.getAttribute("fill") ? "#f6d7a4" : "#f6d7a4");
  return y;
}

function paintSpecks(group: SVGGElement, count: number, prefix: string) {
  group.replaceChildren();
  for (let i = 0; i < count; i++) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("class", "speck");
    c.setAttribute("cx", String(150 + ((i * 47) % 90)));
    c.setAttribute("cy", String(250 + ((i * 31) % 140)));
    c.setAttribute("r", String(1.4 + (i % 3) * 0.6));
    c.setAttribute("data-i", String(i));
    c.setAttribute("fill", prefix);
    group.appendChild(c);
  }
}

function paintMixCubes(group: SVGGElement) {
  group.replaceChildren();
  CUBE_LAYOUT.forEach((cube, i) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "mini");
    g.dataset.i = String(i);
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(cube.x));
    rect.setAttribute("y", String(cube.y));
    rect.setAttribute("width", String(cube.w));
    rect.setAttribute("height", String(cube.h));
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "url(#iceFace)");
    rect.setAttribute("stroke", "rgba(255,255,255,0.75)");
    g.appendChild(rect);
    group.appendChild(g);
  });
}

function build(root: HTMLElement, recipe: Recipe): Handles {
  root.replaceChildren();
  const stage = document.createElement("div");
  stage.className = "stage";
  stage.dataset.ready = "0";
  stage.dataset.t = "0";

  const fx = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  fx.setAttribute("class", "fx");
  fx.setAttribute("aria-hidden", "true");
  fx.setAttribute("preserveAspectRatio", "none");
  const wisps: SVGEllipseElement[] = [];
  for (let i = 0; i < 6; i++) {
    const ell = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ell.setAttribute("fill", "rgba(186,176,166,0.2)");
    fx.append(ell);
    wisps.push(ell);
  }

  const mast = document.createElement("header");
  mast.className = "mast";
  const mastL = document.createElement("div");
  mastL.innerHTML = `<b>${recipe.cocktail.bar}</b> · ${recipe.cocktail.city}`;
  const mastR = document.createElement("div");
  mastR.textContent = recipe.cocktail.creators;
  mast.append(mastL, mastR);

  const layout = document.createElement("div");
  layout.className = "layout";
  const card = document.createElement("aside");
  card.className = "card";
  card.innerHTML = `
    <p class="kicker"></p>
    <h1 class="beat-title"></h1>
    <p class="measure"></p>
    <p class="detail"></p>
    <p class="count"></p>
  `;
  const live = document.createElement("p");
  live.className = "sr-only";
  live.setAttribute("aria-live", "polite");
  card.append(live);

  const vessels = document.createElement("div");
  vessels.className = "vessels";
  vessels.append(svgFrom(ROCKS), svgFrom(MIX));

  layout.append(card, vessels);

  const dock = document.createElement("footer");
  dock.className = "dock";
  dock.innerHTML = `
    <button type="button" class="play" aria-label="Pause"></button>
    <button type="button" class="restart" aria-label="Restart">${restartIcon()}</button>
    <div class="scrub">
      <input type="range" min="0" max="${recipe.duration}" step="0.01" value="0" aria-label="Timeline" />
    </div>
    <div class="clock"></div>
    <button type="button" class="capture">Capture</button>
  `;

  stage.append(fx, mast, layout, dock);
  root.append(stage);

  const rocks = qs<SVGSVGElement>(stage, ".glass.rocks");
  const mix = qs<SVGSVGElement>(stage, ".glass.mix");
  paintSpecks(qs(rocks, ".specks"), 7, "#6e1c16");
  paintSpecks(qs(mix, ".specks"), 7, "#6e1c16");
  paintMixCubes(qs(mix, ".cubes"));

  return {
    stage,
    wisps,
    kicker: qs(card, ".kicker"),
    title: qs(card, ".beat-title"),
    measure: qs(card, ".measure"),
    detail: qs(card, ".detail"),
    count: qs(card, ".count"),
    live,
    card,
    rocks,
    mix,
    play: qs(dock, ".play"),
    restart: qs(dock, ".restart"),
    capture: qs(dock, ".capture"),
    scrub: qs(dock, "input"),
    clock: qs(dock, ".clock"),
  };
}

function playIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor"/></svg>`;
}

function pauseIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2 H7 V14 H4 Z M9 2 H12 V14 H9 Z" fill="currentColor"/></svg>`;
}

function restartIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5 a5.5 5.5 0 1 1-4.6 2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 2.2 L3.4 5.6 L6.6 4.4 Z" fill="currentColor"/></svg>`;
}

function applyPour(mix: SVGSVGElement, state: FilmState, recipe: Recipe) {
  const stream = qs<SVGPathElement>(mix, ".stream");
  const kinds: PourKind[] = ["bourbon", "mezcal", "syrup"];
  for (const kind of kinds) {
    const node = qs<SVGGElement>(mix, `.bottle.${kind === "syrup" ? "syrup" : kind}`);
    const on = state.pour === kind;
    node.setAttribute("opacity", on ? "1" : "0");
    const bob = on ? Math.sin(state.t * 7) * 1.5 : 0;
    node.setAttribute(
      "transform",
      `translate(200 24) scale(${on ? 1.3 : 1}) translate(-200 -24) translate(0 ${on ? bob : 12})`,
    );
  }
  const bittersOn = state.beat.id === "angostura" || state.beat.id === "banana-bitters";
  qs<SVGGElement>(mix, ".bottle.bitters").setAttribute("opacity", bittersOn ? "1" : "0");
  qs<SVGGElement>(mix, ".bottle.bitters").setAttribute(
    "transform",
    bittersOn ? "translate(200 20) scale(1.35) translate(-200 -20)" : "translate(0 12)",
  );

  if (!state.pour) {
    stream.setAttribute("opacity", "0");
    return;
  }
  const color =
    state.pour === "bourbon"
      ? recipe.liquids.bourbon.rgb
      : state.pour === "mezcal"
        ? recipe.liquids.mezcal.rgb
        : recipe.liquids.syrup.rgb;
  const surface = Number(qs<SVGRectElement>(mix, ".liquid").getAttribute("y") || 360);
  const wobble = Math.sin(state.t * 16) * 3;
  const x = 200 + wobble;
  stream.setAttribute("stroke", rgbCss(color));
  stream.setAttribute("opacity", "0.95");
  stream.setAttribute(
    "d",
    `M ${x.toFixed(1)} 36 C ${(x + 6).toFixed(1)} 90 ${x.toFixed(1)} ${(surface * 0.55).toFixed(1)} ${x.toFixed(1)} ${surface.toFixed(1)}`,
  );
}

function applyDashes(mix: SVGSVGElement, state: FilmState, recipe: Recipe) {
  const drops = [qs<SVGCircleElement>(mix, ".drop.a"), qs<SVGCircleElement>(mix, ".drop.b")];
  const beat = state.beat;
  const active = beat.id === "angostura" || beat.id === "banana-bitters";
  const color = beat.id === "banana-bitters" ? recipe.liquids.bananaBitters.rgb : recipe.liquids.angostura.rgb;
  const local = active ? (state.t - beat.start) / Math.max(0.001, beat.end - beat.start) : 0;
  drops.forEach((drop, slot) => {
    const start = 0.12 + slot * 0.4;
    const p = active ? (local - start) / 0.32 : -1;
    if (p <= 0 || p >= 1) {
      drop.setAttribute("opacity", "0");
      return;
    }
    const y = 36 + p * 250;
    drop.setAttribute("cy", y.toFixed(1));
    drop.setAttribute("cx", String(196 + slot * 10));
    drop.setAttribute("fill", rgbCss(color));
    drop.setAttribute("opacity", String(p < 0.85 ? 1 : 1 - (p - 0.85) / 0.15));
  });
}

function applySpecks(svg: SVGSVGElement, amount: number, oz: number, banana: number) {
  const specks = svg.querySelectorAll<SVGCircleElement>(".speck");
  specks.forEach((speck, i) => {
    const show = amount > 0.05 && oz > 0.08;
    const gold = i > 3 && banana > 0.4;
    speck.setAttribute("opacity", show ? String(Math.min(0.85, amount * 0.45)) : "0");
    speck.setAttribute("fill", gold ? "#e0b45a" : "#6e1c16");
  });
}

function renderFrame(ui: Handles, recipe: Recipe, state: FilmState) {
  const { rocks, mix } = ui;
  const narrow = ui.stage.clientWidth < 820;
  const shift = narrow ? 0.38 : 1;
  rocks.style.opacity = String(state.rocksIn);
  mix.style.opacity = String(state.mixIn);
  rocks.style.visibility = state.rocksIn < 0.02 ? "hidden" : "visible";
  mix.style.visibility = state.mixIn < 0.02 ? "hidden" : "visible";
  rocks.style.transform = `translate(calc(-50% + ${state.rocksX * shift}px), -50%) scale(${state.rocksScale})`;
  mix.style.transform = `translate(calc(-50% + ${state.mixX * shift}px), -48%) rotate(${state.mixRot}deg)`;

  const liner = qs<SVGGElement>(rocks, ".liner");
  liner.style.transform = `scaleY(${(0.15 + 0.85 * state.leaf).toFixed(3)})`;
  liner.style.opacity = String(state.leaf);

  const cube = qs<SVGGElement>(rocks, ".cube");
  const cubeWet = qs<SVGGElement>(rocks, ".cube-wet");
  const dropY = (1 - state.cube) * -190;
  const iceBeat = recipe.beats.find((b) => b.id === "ice-cube");
  const showCube = iceBeat && state.t >= iceBeat.start ? 1 : 0;
  cube.setAttribute(
    "transform",
    `translate(0 ${dropY.toFixed(2)}) translate(202 398) scale(1 ${state.cubeSquash.toFixed(3)}) translate(-202 -398)`,
  );
  cube.setAttribute("opacity", String(showCube));
  cubeWet.setAttribute("transform", cube.getAttribute("transform") || "");
  cubeWet.setAttribute("opacity", String(showCube * Math.min(1, state.rocksOz * 1.4)));

  setStops(rocks, state.color);
  setStops(mix, state.color);
  const rocksY = fillLevel(rocks, state.rocksOz, 4.7, 168, 416, 64, 92);
  fillLevel(mix, state.mixOz, 3.7, 168, 422, 54, 72);
  const wet = qs<SVGRectElement>(rocks, ".wet-rect");
  wet.setAttribute("y", rocksY.toFixed(2));
  wet.setAttribute("height", String(460 - rocksY));

  const meniscus = qs<SVGEllipseElement>(rocks, ".meniscus");
  meniscus.setAttribute("fill", rgbCss(lighten(state.color, 0.42)));
  qs<SVGEllipseElement>(mix, ".meniscus").setAttribute("fill", rgbCss(lighten(state.color, 0.42)));

  const stirWave = Math.sin(state.stirTurns * Math.PI * 2) * (state.stirLive ? 3.5 : 0.6);
  qs<SVGEllipseElement>(mix, ".meniscus").setAttribute("ry", String(6 + Math.abs(stirWave)));

  applyPour(mix, state, recipe);
  applyDashes(mix, state, recipe);
  applySpecks(mix, Math.max(state.angostura, state.bananaBitters) / 2, state.mixOz, state.bananaBitters);
  applySpecks(rocks, Math.max(state.angostura, state.bananaBitters) / 2, state.rocksOz, state.bananaBitters);

  const cubes = mix.querySelectorAll<SVGGElement>(".mini");
  cubes.forEach((node, i) => {
    const base = CUBE_LAYOUT[i];
    const appear = state.mixIce;
    const orbit = state.stirTurns * Math.PI * 2;
    const ox = Math.cos(orbit + i) * 7 * Math.max(state.stirLive, state.stirTurns > 0 && state.strain < 1 ? 0.35 : 0);
    const oy = Math.sin(orbit + i * 0.7) * 5 * state.stirLive;
    const fall = (1 - appear) * -30;
    node.setAttribute(
      "transform",
      `translate(${ox.toFixed(1)} ${(oy + fall).toFixed(1)}) rotate(${base.r + Math.sin(orbit + i) * 8 * state.stirLive} ${base.x + base.w / 2} ${base.y + base.h / 2})`,
    );
    node.setAttribute("opacity", appear.toFixed(3));
  });

  const spoon = qs<SVGGElement>(mix, ".spoon");
  const spoonOn = state.stirTurns > 0 && state.strain < 0.85;
  spoon.setAttribute("opacity", spoonOn ? String(state.stirLive || state.strain < 0.2 ? 1 : 0.85) : "0");
  spoon.setAttribute("transform", `rotate(${(state.stirTurns * 360).toFixed(2)} 200 230)`);

  const strainer = qs<SVGGElement>(mix, ".strainer");
  strainer.setAttribute("opacity", state.strain > 0.05 && state.strain < 0.98 ? String(Math.min(1, state.strain * 2)) : "0");

  const frost = qs<SVGRectElement>(mix, ".frost");
  frost.setAttribute("fill", "rgba(255,255,255,0.45)");
  frost.setAttribute("opacity", String(state.frost * 0.55 * (state.mixIn > 0.2 ? 1 : 0)));

  const garnish = qs<SVGGElement>(rocks, ".garnish");
  const g = state.garnish;
  garnish.setAttribute("opacity", g.toFixed(3));
  garnish.setAttribute(
    "transform",
    `translate(${((1 - g) * 36).toFixed(1)} ${((1 - g) * -28).toFixed(1)}) rotate(${(-16 + g * 10).toFixed(2)} 220 90)`,
  );

  const condense = qs<SVGGElement>(rocks, ".condense");
  condense.setAttribute("opacity", String(state.frost * Math.min(1, state.rocksOz * 2)));

  const glow = qs<SVGEllipseElement>(rocks, ".hero-glow");
  glow.setAttribute("fill", `rgba(228,176,106,${(0.04 + state.hero * 0.16).toFixed(3)})`);

  if (ui.title.textContent !== state.beat.title) {
    ui.card.classList.remove("swap");
    ui.kicker.textContent = state.beat.kicker;
    ui.title.textContent = state.beat.title;
    ui.measure.textContent = state.beat.measure;
    ui.detail.textContent = state.beat.detail;
    ui.live.textContent = `${state.beat.title}. ${state.beat.measure}. ${state.beat.detail}`;
    void ui.card.offsetWidth;
    ui.card.classList.add("swap");
  }
  ui.count.textContent = `${String(state.index + 1).padStart(2, "0")}  /  ${String(state.count).padStart(2, "0")}`;
  ui.clock.textContent = `${formatClock(state.t)}  /  ${formatClock(recipe.duration)}`;
  ui.stage.dataset.t = state.t.toFixed(3);

  drawFx(ui, state);
}

function drawFx(ui: Handles, state: FilmState) {
  const stageBox = ui.stage.getBoundingClientRect();
  const fx = ui.stage.querySelector(".fx");
  fx?.setAttribute("viewBox", `0 0 ${stageBox.width} ${stageBox.height}`);
  if (state.smoke <= 0.02) {
    for (const ell of ui.wisps) ell.setAttribute("opacity", "0");
    return;
  }
  const host = state.mixIn > state.rocksIn ? ui.mix : ui.rocks;
  const box = host.getBoundingClientRect();
  const stage = ui.stage.getBoundingClientRect();
  const cx = box.left - stage.left + box.width * 0.5;
  const cy = box.top - stage.top + box.height * 0.2;
  ui.wisps.forEach((ell, i) => {
    const life = (state.t * 0.09 + i * 0.17) % 1;
    const alpha = Math.sin(life * Math.PI) * 0.22 * state.smoke;
    const x = cx + Math.sin(state.t * 0.8 + i * 1.7) * 28 * (1 - life);
    const y = cy - life * stage.height * 0.26;
    const rad = 26 + life * 64;
    ell.setAttribute("cx", x.toFixed(1));
    ell.setAttribute("cy", y.toFixed(1));
    ell.setAttribute("rx", rad.toFixed(1));
    ell.setAttribute("ry", (rad * 0.72).toFixed(1));
    ell.setAttribute("opacity", alpha.toFixed(3));
  });
}

export function mountFilm(root: HTMLElement, recipe: Recipe): () => void {
  const ui = build(root, recipe);
  const params = new URLSearchParams(window.location.search);
  const capture = params.get("capture") === "1";
  let time = Math.min(recipe.duration, Math.max(0, Number(params.get("t")) || 0));
  let playing = params.get("pause") === "1" ? false : true;
  if (capture) ui.stage.classList.add("is-capturing");

  let beatId = "";
  const paint = () => {
    const state = derive(recipe, time);
    if (state.beat.id !== beatId) {
      beatId = state.beat.id;
      ui.title.textContent = "";
    }
    renderFrame(ui, recipe, state);
    ui.scrub.value = String(time);
    ui.play.innerHTML = playing ? pauseIcon() : playIcon();
    ui.play.setAttribute("aria-label", playing ? "Pause" : "Play");
  };

  const api: FilmController = {
    seek(t: number) {
      time = Math.min(recipe.duration, Math.max(0, t));
      paint();
    },
    play() {
      if (time >= recipe.duration) time = 0;
      playing = true;
      last = performance.now();
      paint();
    },
    pause() {
      playing = false;
      paint();
    },
    restart() {
      time = 0;
      playing = true;
      last = performance.now();
      beatId = "";
      paint();
    },
    getTime() {
      return time;
    },
  };
  (window as unknown as { __film?: FilmController }).__film = api;

  let last = performance.now();
  let raf = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (playing) {
      time = Math.min(recipe.duration, time + dt);
      if (time >= recipe.duration) playing = false;
    }
    paint();
    raf = requestAnimationFrame(loop);
  };

  ui.play.addEventListener("click", () => {
    if (playing) api.pause();
    else api.play();
  });
  ui.restart.addEventListener("click", () => api.restart());
  ui.capture.addEventListener("click", () => {
    ui.stage.classList.toggle("is-capturing");
  });
  ui.scrub.addEventListener("input", () => {
    playing = false;
    api.seek(Number(ui.scrub.value));
  });

  const onKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
    if (event.code === "Space") {
      event.preventDefault();
      if (playing) api.pause();
      else api.play();
    } else if (event.code === "KeyR") {
      api.restart();
    } else if (event.code === "Escape") {
      ui.stage.classList.remove("is-capturing");
    }
  };
  window.addEventListener("keydown", onKey);

  const onResize = () => paint();
  window.addEventListener("resize", onResize);

  ui.stage.dataset.ready = "1";
  paint();
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", onResize);
    const holder = window as unknown as { __film?: FilmController };
    if (holder.__film === api) delete holder.__film;
    root.replaceChildren();
  };
}
