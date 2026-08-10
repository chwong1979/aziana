import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../public/localized-copy.js', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');

test('homepage loads the adapted visitor-copy layer', () => {
  assert.match(homepage, /localized-copy\.js/);
  assert.doesNotMatch(homepage, /Machine-drafted NL\/FR\/ES/);
});

test('all supported guest languages have complete peer catalogs', () => {
  for (const locale of ['en', 'nl', 'fr', 'es']) {
    assert.match(source, new RegExp(`\\n    ${locale}: \\{`));
  }
  for (const key of ['hero', 'setting', 'welcome', 'cuisine', 'gallery', 'story1', 'story2', 'bar', 'events', 'hoursNote']) {
    assert.equal((source.match(new RegExp(`\\n      ${key}:`, 'g')) || []).length, 4, `${key} must exist in every locale`);
  }
});

test('localized story copy is independently written and preserves fixed facts', () => {
  assert.match(source, /Notre histoire commence en 1995/);
  assert.match(source, /Nuestra historia comenzó en 1995/);
  assert.match(source, /Ons verhaal begon in 1995/);
  for (const fact of ['1995', '2018', 'Bobby', 'Philipsburg']) assert.match(source, new RegExp(fact));
});
