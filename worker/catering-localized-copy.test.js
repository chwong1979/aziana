import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../public/events-catering-sint-maarten.html', import.meta.url), 'utf8');
const source = await readFile(new URL('../public/catering-localized-copy.js', import.meta.url), 'utf8');

test('catering page loads its peer-locale document and language control', () => {
  assert.match(page, /id="az-catering-lang"/);
  assert.match(page, /catering-localized-copy\.js/);
  assert.match(page, /data-auto-event-email/);
  assert.match(page, /data-auto-event-whatsapp/);
  assert.match(page, /data-az-action="menu"/);
  assert.match(source, /\[data-campaign-id\]/);
});

test('every guest locale has the complete catering document', () => {
  const locales = ['en', 'nl', 'fr', 'es'];
  const keys = ['title', 'description', 'ogTitle', 'ogDescription', 'heading', 'lede', 'companyTitle', 'company', 'foodTitle', 'food', 'flowTitle', 'flow', 'contactTitle', 'contact', 'eventText', 'emailSubject', 'emailBody'];
  const starts = locales.map(locale => source.indexOf(`\n    ${locale}: {`));
  starts.forEach((start, index) => {
    assert.notEqual(start, -1, `${locales[index]} catalog must exist`);
    const end = starts[index + 1] === undefined ? source.indexOf('\n  };', start) : starts[index + 1];
    const catalog = source.slice(start, end);
    for (const key of keys) assert.match(catalog, new RegExp(`\\b${key}:`), `${key} must exist in ${locales[index]}`);
  });
});

test('catering localization preserves stable fact and integration ownership', () => {
  for (const fact of ["Bobby's Marina", 'Philipsburg', 'Sint Maarten']) assert.match(page + source, new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(source, /17215880022|azianabv@gmail\.com|Marina_Menu_2026/);
  assert.match(source, /localStorage\.getItem\('aziana\.lang'\)/);
  assert.match(source, /document\.documentElement\.lang = locale/);
});
