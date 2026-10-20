/**
 * Ni de Aquí Ni de Allá — editable recipe film.
 *
 * Official build from Danny González & Pedro Tobar, Bar Providencia,
 * Washington, D.C. Do not add ingredients that are not in this spec.
 *
 * Timing: beats must run back-to-back and cover exactly `duration` seconds.
 * Animation (pours, ice, stir, strain, garnish) follows these ids and windows,
 * so changing a start/end retimes that step. Keep ids stable.
 *
 *   0–3    title + empty glass
 *   3–25   prep, build, stir, strain
 *   25–30  garnish + hero hold
 */

export const FILM_DURATION = 30;

export type BeatId =
  | "title"
  | "leaf-liner"
  | "ice-cube"
  | "mix-ice"
  | "bourbon"
  | "mezcal"
  | "syrup"
  | "angostura"
  | "banana-bitters"
  | "stir"
  | "strain"
  | "garnish"
  | "hero";

export type Rgb = readonly [number, number, number];

export type Beat = {
  id: BeatId;
  start: number;
  end: number;
  kicker: string;
  title: string;
  measure: string;
  detail: string;
};

export type Recipe = {
  duration: number;
  cocktail: {
    name: string;
    with: string;
    translation: string;
    creators: string;
    bar: string;
    city: string;
    glass: string;
  };
  liquids: {
    bourbon: { oz: number; rgb: Rgb };
    mezcal: { oz: number; rgb: Rgb };
    syrup: { oz: number; rgb: Rgb; label: string };
    angostura: { dashes: number; rgb: Rgb };
    bananaBitters: { dashes: number; rgb: Rgb };
  };
  beats: Beat[];
};

export const recipe: Recipe = {
  duration: FILM_DURATION,
  cocktail: {
    name: "Ni de Aquí Ni de Allá",
    with: "with Grok",
    translation: "Neither from here nor from there",
    creators: "Danny González & Pedro Tobar",
    bar: "Bar Providencia",
    city: "Washington, D.C.",
    glass: "Rocks glass",
  },
  liquids: {
    bourbon: { oz: 1, rgb: [198, 122, 46] },
    mezcal: { oz: 1, rgb: [168, 114, 68] },
    syrup: { oz: 0.5, rgb: [118, 68, 30], label: "Plantain syrup" },
    angostura: { dashes: 2, rgb: [112, 26, 20] },
    bananaBitters: { dashes: 2, rgb: [204, 158, 52] },
  },
  beats: [
    {
      id: "title",
      start: 0,
      end: 3,
      kicker: "Bar Providencia",
      title: "Ni de Aquí Ni de Allá",
      measure: "with Grok",
      detail: "Neither from here nor from there.",
    },
    {
      id: "leaf-liner",
      start: 3,
      end: 5.3,
      kicker: "Prep the glass",
      title: "Banana leaf",
      measure: "Trimmed liner",
      detail: "Line the inside of a rocks glass.",
    },
    {
      id: "ice-cube",
      start: 5.3,
      end: 7.1,
      kicker: "Prep the glass",
      title: "Large ice cube",
      measure: "1 cube",
      detail: "Place one large ice cube inside.",
    },
    {
      id: "mix-ice",
      start: 7.1,
      end: 8.7,
      kicker: "Mix",
      title: "Mixing glass",
      measure: "Filled with ice",
      detail: "Combine the drink in a mixing glass of ice.",
    },
    {
      id: "bourbon",
      start: 8.7,
      end: 11.1,
      kicker: "Build",
      title: "Bourbon",
      measure: "1 oz",
      detail: "Pour into the mixing glass.",
    },
    {
      id: "mezcal",
      start: 11.1,
      end: 13.5,
      kicker: "Build",
      title: "Mezcal",
      measure: "1 oz",
      detail: "Smoke meets the bourbon.",
    },
    {
      id: "syrup",
      start: 13.5,
      end: 15.9,
      kicker: "Build",
      title: "Plantain syrup",
      measure: "½ oz",
      detail: "Or spiced plantain purée.",
    },
    {
      id: "angostura",
      start: 15.9,
      end: 17.5,
      kicker: "Build",
      title: "Angostura bitters",
      measure: "2 dashes",
      detail: "Two dashes into the mixing glass.",
    },
    {
      id: "banana-bitters",
      start: 17.5,
      end: 19.1,
      kicker: "Build",
      title: "Banana bitters",
      measure: "2 dashes",
      detail: "Two dashes to finish the build.",
    },
    {
      id: "stir",
      start: 19.1,
      end: 22.1,
      kicker: "Stir",
      title: "Stir",
      measure: "Until chilled",
      detail: "Stir until thoroughly chilled.",
    },
    {
      id: "strain",
      start: 22.1,
      end: 25,
      kicker: "Strain",
      title: "Strain",
      measure: "Into the rocks glass",
      detail: "Strain directly over the leaf and the cube.",
    },
    {
      id: "garnish",
      start: 25,
      end: 27.6,
      kicker: "Garnish",
      title: "Fresh banana leaf",
      measure: "1 leaf",
      detail: "Garnish the finished cocktail.",
    },
    {
      id: "hero",
      start: 27.6,
      end: 30,
      kicker: "Serve",
      title: "Ni de Aquí Ni de Allá",
      measure: "with Grok",
      detail: "Neither from here nor from there.",
    },
  ],
};

export function beatById(recipe: Recipe, id: BeatId): Beat {
  const found = recipe.beats.find((beat) => beat.id === id);
  if (found) return found;
  return {
    id,
    start: recipe.duration,
    end: recipe.duration,
    kicker: "",
    title: "",
    measure: "",
    detail: "",
  };
}
