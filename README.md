# Newspaper

A newspaper-inspired theme for [Obsidian](https://obsidian.md).

Flat monochrome newsprint: a toned paper ramp that never reaches white, near-black
ink, squared corners, no shadows, and black hairline rules where a boundary carries
meaning. The accent is the ink — links are underlined ink, active states are solid
ink — so colour appears only where it means something.

**Light mode only.** There is no newsprint dark palette, so dark mode falls back to
Obsidian's defaults (squared corners still apply).

Typography is left alone. The theme sets colour and shape; `--font-text`,
`--font-interface` and `--font-monospace` stay whatever you picked in
**Appearance settings**.

## Palette provenance

The palette is ported from the `newspaper` appearance of another project. That
project's original token block is kept verbatim at
[`reference/newspaper-palette.css`](reference/newspaper-palette.css) so the reasoning
behind each value stays readable. It is excluded from linting — it is a reference
document, not shipped CSS.

The port is not a copy. The source palette dresses a dense application chrome where
content sits on raised panels above the window background; Obsidian's main surface is
a reading column. So the source's `surface` (`#d2cfc9`) became the editor page and its
`canvas` (`#bbb9b4`) dropped back to the sidebars, preserving the relationship rather
than the variable names.

Two deliberate departures from the source's strict monochrome:

- **Syntax highlighting** uses six low-chroma dark hues. Fully monochrome highlighting
  costs real legibility in a vault holding code; these read as ink with a hint of
  colour rather than as a terminal.
- **`==Highlights==`** use a printer's spot-colour ochre. An ink wash would collide
  with text selection.

All palette colours clear 4.5:1 contrast on every surface the theme uses, including
the code block background. `--text-faint` is the one exception (4.4:1 on the page),
which is still far ahead of Obsidian's stock `#ababab`-on-white at 2.5:1.

## Status

Palette and token coverage are complete: surfaces, ink, rules, accent, shape,
syntax highlighting, callouts, tags, tables, graph view, and selection. Not yet
reviewed against every view (PDF, Canvas, Bases, mobile).

## Local development

Obsidian loads themes from `<vault>/.obsidian/themes/<Theme Name>/`. Symlink this
repo into a vault so edits show up live:

```bash
ln -s "$(pwd)" "/path/to/vault/.obsidian/themes/Newspaper"
```

Then in Obsidian: **Settings → Appearance → Themes → Newspaper**.

Reload styles after each edit with the **Reload app without saving** command, or
install the [Hot Reload](https://github.com/pjeby/hot-reload) plugin for automatic
refresh.

Files Obsidian actually reads:

- `manifest.json` — theme name, version, author, `minAppVersion`
- `theme.css` — the entire theme; all CSS lives here

## Linting

CSS is checked against [`stylelint-config-obsidianmd`](https://github.com/obsidianmd/stylelint-config),
the same rule set used during Obsidian's theme review.

```bash
npm install   # once
npm run lint
npm run lint:fix
```

Linting also runs on every push and pull request via `.github/workflows/lint.yml`.

## Releasing

1. Bump the version: `npm version <patch|minor|major>`. This runs
   `version-bump.mjs`, which syncs `manifest.json` and adds a `versions.json`
   entry mapping the new theme version to `minAppVersion`.
2. Push the commit and the tag: `git push && git push --tags`.
3. `.github/workflows/release.yml` creates a **draft** GitHub release with
   `manifest.json` and `theme.css` attached. Review it, then publish.

Obsidian downloads `manifest.json` and `theme.css` from the release whose tag
matches the version in `manifest.json`, so the release must be published for
installs to work.

## Community directory submission

Needed before submitting to [community.obsidian.md](https://community.obsidian.md):

- A published release (see above).
- A `screenshots/screenshot.png` thumbnail, 16:9, recommended 512x288.
- A `LICENSE` file (MIT, included).
- A clean `npm run lint`.
- **Supported modes: Light** only, on the submission form.

See the official [Submit your theme](https://docs.obsidian.md/Themes/App+themes/Submit+your+theme)
guide and the [Theme guidelines](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines).

## License

MIT — see [LICENSE](LICENSE).
