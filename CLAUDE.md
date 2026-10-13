# Newsprint theme

## Versioning rule

Every change to the theme bumps the patch version (z in x.y.z) by one. A change
to the theme is any change under `src/` or to `theme.css`. Bump on the same
branch as the change, before opening the PR:

    npm version patch --no-git-tag-version

That updates `package.json`, `package-lock.json`, `manifest.json` and
`versions.json` together. Never edit the versions by hand, and never push tags:
merging a new version into `main` publishes the release automatically
(`.github/workflows/release.yml`). CI fails the PR if the bump is missing
(`check-version.mjs`).

## Build

`theme.css` is generated and committed. After editing `src/`, run
`npm run build:ci` (or `npm run build` to also copy into a vault) and commit the
result alongside the source.
