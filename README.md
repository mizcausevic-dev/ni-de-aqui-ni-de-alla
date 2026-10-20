# Ni de Aquí Ni de Allá with Grok

A 30-second recipe film for the official Bar Providencia cocktail by Danny González and Pedro Tobar, Washington, D.C.

The drink means “neither from here nor from there.”

## Watch

Open `index.html` (or the GitHub Pages site). The film autoplays and holds on the finished glass at 30 seconds.

- **Play / Pause** and **Space**
- **Restart** and **R**
- Drag the timeline to scrub. Playback stays deterministic: the same time always shows the same frame.
- **Capture** hides the controls. **Esc** brings them back.
- Add `?capture=1` for a clean frame from the first moment.
- Add `?t=12.5&pause=1` to open on a specific second.

`ni-de-aqui-ni-de-alla.mp4` is a 30-second, 30 fps, 1280×720 export of that capture view.

## Recipe

Rocks glass, lined with a trimmed banana leaf, one large ice cube.

Built in a mixing glass of ice, then stirred until chilled and strained over the cube:

- 1 oz bourbon
- 1 oz mezcal
- ½ oz plantain syrup (or spiced plantain purée)
- 2 dashes Angostura bitters
- 2 dashes banana bitters
- Garnish: a fresh banana leaf

## Edit timing and copy

Everything you might change is in [`src/cocktail/recipe.ts`](src/cocktail/recipe.ts): names, measures, and the beat list.

Beats must run back to back and end at exactly 30 seconds. Keep the beat `id`s (`title`, `leaf-liner`, `ice-cube`, `mix-ice`, `bourbon`, `mezcal`, `syrup`, `angostura`, `banana-bitters`, `stir`, `strain`, `garnish`, `hero`). The animation follows those windows.

Rebuild the page bundle from this folder:

```bash
npx esbuild src/cocktail/pages-entry.ts --bundle --outfile=film.js --format=iife --minify
```

No install step is required to watch the film. Opening `index.html` is enough.
