import { beatById, type Beat, type Recipe, type Rgb } from "./recipe";

export type PourKind = "bourbon" | "mezcal" | "syrup" | null;

export type FilmState = {
  t: number;
  beat: Beat;
  index: number;
  count: number;
  leaf: number;
  cube: number;
  cubeSquash: number;
  mixIce: number;
  rocksIn: number;
  mixIn: number;
  mixX: number;
  rocksX: number;
  mixRot: number;
  rocksScale: number;
  mixOz: number;
  rocksOz: number;
  totalOz: number;
  color: Rgb;
  pour: PourKind;
  pourLevel: number;
  angostura: number;
  bananaBitters: number;
  stirTurns: number;
  stirLive: number;
  frost: number;
  strain: number;
  garnish: number;
  hero: number;
  smoke: number;
  intro: number;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function range(t: number, a: number, b: number) {
  if (b <= a) return t >= b ? 1 : 0;
  return clamp((t - a) / (b - a));
}

export function smooth(v: number) {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function done(t: number, beat: Beat) {
  if (t <= beat.start) return 0;
  if (t >= beat.end) return 1;
  return smooth(range(t, beat.start, beat.end));
}

function pourWindow(t: number, beat: Beat) {
  const span = beat.end - beat.start;
  return smooth(range(t, beat.start + span * 0.08, beat.end - span * 0.08));
}

/** Bounce-out used for the single large cube. */
function bounceOut(t: number) {
  const p = clamp(t);
  const n1 = 7.5625;
  const d1 = 2.75;
  if (p < 1 / d1) return n1 * p * p;
  if (p < 2 / d1) {
    const x = p - 1.5 / d1;
    return n1 * x * x + 0.75;
  }
  if (p < 2.5 / d1) {
    const x = p - 2.25 / d1;
    return n1 * x * x + 0.9375;
  }
  const x = p - 2.625 / d1;
  return n1 * x * x + 0.984375;
}

function mixRgb(parts: { w: number; rgb: Rgb }[]): Rgb {
  let r = 0;
  let g = 0;
  let b = 0;
  let w = 0;
  for (const part of parts) {
    if (part.w <= 0) continue;
    r += part.rgb[0] * part.w;
    g += part.rgb[1] * part.w;
    b += part.rgb[2] * part.w;
    w += part.w;
  }
  if (w <= 0) return [92, 62, 40];
  return [r / w, g / w, b / w];
}

export function beatAt(recipe: Recipe, t: number) {
  const beats = recipe.beats;
  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];
    const last = i === beats.length - 1;
    if (t >= beat.start && (t < beat.end || last)) return { beat, index: i };
  }
  const last = Math.max(0, beats.length - 1);
  return { beat: beats[last], index: last };
}

export function derive(recipe: Recipe, time: number): FilmState {
  const t = clamp(time, 0, recipe.duration);
  const { beat, index } = beatAt(recipe, t);
  const title = beatById(recipe, "title");
  const leafBeat = beatById(recipe, "leaf-liner");
  const iceBeat = beatById(recipe, "ice-cube");
  const mixIceBeat = beatById(recipe, "mix-ice");
  const bourbon = beatById(recipe, "bourbon");
  const mezcal = beatById(recipe, "mezcal");
  const syrup = beatById(recipe, "syrup");
  const angostura = beatById(recipe, "angostura");
  const banana = beatById(recipe, "banana-bitters");
  const stir = beatById(recipe, "stir");
  const strainBeat = beatById(recipe, "strain");
  const garnishBeat = beatById(recipe, "garnish");
  const heroBeat = beatById(recipe, "hero");

  const leaf = done(t, leafBeat);
  const cubeRaw = range(
    t,
    iceBeat.start,
    iceBeat.start + Math.max(0.001, (iceBeat.end - iceBeat.start) * 0.85),
  );
  const cube = t < iceBeat.start ? 0 : bounceOut(cubeRaw);
  const impact = range(cubeRaw, 0.68, 0.8) * (1 - range(cubeRaw, 0.8, 0.95));
  const cubeSquash = 1 + impact * 0.09;

  const mixIce = done(t, mixIceBeat);
  const rocksFade = smooth(range(t, mixIceBeat.start, mixIceBeat.end));
  const strainIn = smooth(range(t, strainBeat.start, strainBeat.start + (strainBeat.end - strainBeat.start) * 0.28));
  let rocksIn = 1;
  if (t >= mixIceBeat.start && t < strainBeat.start) rocksIn = 1 - rocksFade;
  else if (t >= strainBeat.start) rocksIn = Math.max(strainIn, t >= strainBeat.end ? 1 : strainIn);

  let mixIn = 0;
  if (t >= mixIceBeat.start && t < mixIceBeat.end) mixIn = smooth(range(t, mixIceBeat.start, mixIceBeat.end));
  else if (t >= mixIceBeat.end && t < strainBeat.start) mixIn = 1;
  else if (t >= strainBeat.start && t < strainBeat.end) {
    mixIn = 1 - smooth(range(t, strainBeat.start + (strainBeat.end - strainBeat.start) * 0.62, strainBeat.end));
  }

  const strain = t <= strainBeat.start ? 0 : t >= strainBeat.end ? 1 : smooth(range(t, strainBeat.start + 0.15, strainBeat.end - 0.12));
  const garnish = done(t, garnishBeat);
  const hero = done(t, heroBeat);
  const intro = smooth(range(t, title.start, Math.min(title.end, title.start + 1.35)));

  const ozB = recipe.liquids.bourbon.oz * pourWindow(t, bourbon);
  const ozM = recipe.liquids.mezcal.oz * pourWindow(t, mezcal);
  const ozS = recipe.liquids.syrup.oz * pourWindow(t, syrup);
  const totalOz = ozB + ozM + ozS;
  const mixOz = totalOz * (1 - strain);
  const rocksOz = totalOz * strain;

  const angosturaAmt = recipe.liquids.angostura.dashes * done(t, angostura);
  const bananaAmt = recipe.liquids.bananaBitters.dashes * done(t, banana);

  const color = mixRgb([
    { w: ozB, rgb: recipe.liquids.bourbon.rgb },
    { w: ozM, rgb: recipe.liquids.mezcal.rgb },
    { w: ozS, rgb: recipe.liquids.syrup.rgb },
    { w: (angosturaAmt / recipe.liquids.angostura.dashes) * 0.2, rgb: recipe.liquids.angostura.rgb },
    { w: (bananaAmt / recipe.liquids.bananaBitters.dashes) * 0.12, rgb: recipe.liquids.bananaBitters.rgb },
  ]);

  let pour: PourKind = null;
  let pourLevel = 0;
  const pours: { id: Beat; kind: PourKind }[] = [
    { id: bourbon, kind: "bourbon" },
    { id: mezcal, kind: "mezcal" },
    { id: syrup, kind: "syrup" },
  ];
  for (const item of pours) {
    if (t >= item.id.start && t <= item.id.end) {
      const p = range(t, item.id.start, item.id.end);
      if (p > 0.06 && p < 0.94) {
        pour = item.kind;
        pourLevel = p;
      }
    }
  }

  const stirP = done(t, stir);
  const stirTurns = stirP * 4.25;
  const stirLive = t >= stir.start && t < stir.end ? 1 : 0;
  const frost = stirP;
  const smokeBase = done(t, mezcal);
  const smoke = smokeBase * (t >= heroBeat.start ? 0.55 : 1);

  const strainP = range(t, strainBeat.start, strainBeat.end);
  const mixX = t < strainBeat.start ? 0 : lerp(0, -168, smooth(strainP));
  const mixRot = t < strainBeat.start ? 0 : lerp(0, -26, smooth(strainP));
  let rocksX = 0;
  if (t >= strainBeat.start && t < strainBeat.end) rocksX = lerp(150, 28, smooth(strainP));
  else if (t >= strainBeat.end) rocksX = lerp(28, 0, smooth(range(t, garnishBeat.start, garnishBeat.start + 0.8)));

  const rocksScale = lerp(0.92, 1, intro) + garnish * 0.02 + hero * 0.07;

  return {
    t,
    beat,
    index,
    count: recipe.beats.length,
    leaf,
    cube,
    cubeSquash,
    mixIce,
    rocksIn,
    mixIn,
    mixX,
    rocksX,
    mixRot,
    rocksScale,
    mixOz,
    rocksOz,
    totalOz,
    color,
    pour,
    pourLevel,
    angostura: angosturaAmt,
    bananaBitters: bananaAmt,
    stirTurns,
    stirLive,
    frost,
    strain,
    garnish,
    hero,
    smoke,
    intro,
  };
}

export function formatClock(t: number) {
  const clamped = Math.max(0, t);
  const m = Math.floor(clamped / 60);
  const s = clamped - m * 60;
  const whole = Math.floor(s);
  const tenth = Math.floor((s - whole) * 10);
  return `${m}:${String(whole).padStart(2, "0")}.${tenth}`;
}
