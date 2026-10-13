/*
Enforces the versioning rule: every change to the theme bumps the patch number
(z in x.y.z) by one. A minor or major bump (x.y+1.0, x+1.0.0) is also accepted,
for the rare release that deserves one.

  node check-version.mjs <base-ref>

Compares HEAD against <base-ref> (in CI, the PR's base commit). A change to the
theme is any change under src/ or to theme.css. When there is one, the version
must have moved to the next patch (or minor/major). Whenever the version moves,
manifest.json, package.json and versions.json must agree on it.
*/
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const base = process.argv[2];
if (!base) {
  console.error('Usage: node check-version.mjs <base-ref>');
  process.exit(2);
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
const errors = [];

const before = JSON.parse(git('show', `${base}:manifest.json`)).version;
const after = JSON.parse(readFileSync('manifest.json', 'utf8')).version;

const themeChanged = git('diff', '--name-only', `${base}...HEAD`, '--', 'src', 'theme.css').trim() !== '';

const [x, y, z] = before.split('.').map(Number);
const patch = `${x}.${y}.${z + 1}`;
const allowed = [patch, `${x}.${y + 1}.0`, `${x + 1}.0.0`];

if (after !== before && !allowed.includes(after)) {
  errors.push(`Version went from ${before} to ${after}. The next version should be ${patch}.`);
}
if (themeChanged && after === before) {
  errors.push(`The theme changed but the version is still ${before}. Run \`npm version patch --no-git-tag-version\` to bump it to ${patch}.`);
}

if (after !== before) {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8')).version;
  const versions = JSON.parse(readFileSync('versions.json', 'utf8'));
  if (pkg !== after) errors.push(`package.json is at ${pkg} but manifest.json is at ${after}.`);
  if (!(after in versions)) errors.push(`versions.json has no entry for ${after}.`);
}

if (errors.length) {
  for (const error of errors) console.error(`::error::${error}`);
  process.exit(1);
}
console.log(themeChanged ? `Theme changed; version bumped ${before} -> ${after}.` : `No theme change; version ${after}.`);
