/*
Builds theme.css: compiles src/scss/index.scss and appends the Style Settings
block. Replaces the Grunt pipeline this was forked with, which only ever ran
these two steps plus a copy, and pulled in a long tail of unmaintained
dependencies to do it.

  node build.mjs           compile, then copy into the vault named in .env
  node build.mjs --ci      compile only (CI has no .env and no vault)
  node build.mjs --watch   compile and copy on every change under src/
*/
import { copyFileSync, mkdirSync, readFileSync, watch, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import dotenv from 'dotenv';
import * as sass from 'sass';

const ci = process.argv.includes('--ci');
const watching = process.argv.includes('--watch');

function compile() {
  const { css } = sass.compile('src/scss/index.scss', { style: 'compressed' });
  const settings = readFileSync('src/css/style-settings.css', 'utf8');
  writeFileSync('theme.css', `${css}\n${settings}\n`);
}

/* Get the user-defined OBSIDIAN_PATH from the .env file so the theme can be
   live reloaded in a vault. */
function vaultPath() {
  dotenv.config({ quiet: true });
  const path = process.env.OBSIDIAN_PATH;
  if (!path) {
    throw new Error('OBSIDIAN_PATH is not set. Copy .env.example to .env and point it at your vault.');
  }
  return path;
}

function deploy(path) {
  mkdirSync(path, { recursive: true });
  for (const file of ['theme.css', 'manifest.json']) {
    copyFileSync(file, join(path, file));
  }
}

function run(path) {
  compile();
  if (path) deploy(path);
  console.log(`Built theme.css${path ? ` and copied it to ${path}` : ''}`);
}

const path = ci ? null : vaultPath();
run(path);

if (watching) {
  console.log('Watching src/ for changes…');
  watch('src', { recursive: true }, (_event, file) => {
    if (!file || !/\.s?css$/.test(file)) return;
    try {
      run(path);
    } catch (error) {
      console.error(error.message);
    }
  });
}
