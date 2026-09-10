# Newspaper

A newspaper-inspired theme for [Obsidian](https://obsidian.md).

## Status

Early development. The theme currently ships the sample-theme baseline (squared-off
radii, flattened menus) and is being built out toward a print/editorial look.

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

See the official [Submit your theme](https://docs.obsidian.md/Themes/App+themes/Submit+your+theme)
guide and the [Theme guidelines](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines).

## License

MIT — see [LICENSE](LICENSE).
