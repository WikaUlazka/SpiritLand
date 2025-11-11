import axios from 'axios';
import * as cheerio from 'cheerio';
import { sequelize, Spirit } from './models/index.js';

const BASE_URL = 'https://spiritislandwiki.com';
const START_URL = `${BASE_URL}/index.php?title=List_of_Spirits`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeName(s) {
  return s.replace(/\s+/g, ' ').trim();
}

async function scrapeSpirits() {
  const res = await axios.get(START_URL, { timeout: 15000 });
  const $ = cheerio.load(res.data);

  // Zbierz linki unikatowo, ale wybierz link "tekstowy" z wiersza (nie link do obrazu)
  const links = new Set();

  $('table.wikitable tbody tr').each((i, row) => {
    const anchors = $(row).find('a');
    // iteruj po anchorach w wierszu i wybierz pierwszy który:
    // - zawiera "title=" w href
    // - nie prowadzi do File:
    // - jego tekst nie jest pusty i nie wygląda jak nazwa pliku
    let chosenHref = null;
    anchors.each((j, a) => {
      const href = $(a).attr('href') || '';
      const text = $(a).text().trim();
      if (!href) return;
      if (!href.includes('title=')) return;
      if (/\/index\.php\?title=File:/i.test(href)) return; // pomiń pliki
      if (/\.(png|jpg|jpeg|svg|gif)$/i.test(text)) return;
      if (!text) return;
      // wybieramy ten link
      chosenHref = href;
      return false; // break
    });

    if (chosenHref) {
      // ujednolicenie (może zawierać dodatkowe anchor params)
      const url = new URL(chosenHref, BASE_URL).toString();
      links.add(url);
    }
  });

  console.log(`🔗 Znaleziono ${links.size} unikalnych linków do duchów.`);

  let added = 0;

  for (const link of links) {
    try {
      // małe opóźnienie
      await sleep(200);

      const { data } = await axios.get(link, { timeout: 15000 });
      const $$ = cheerio.load(data);

      // tytuł strony
      let name = $$('#firstHeading').text().trim();
      name = normalizeName(name);

      // pomiń, jeśli nazwa wygląda jak plik lub pusta
      if (!name || /^file:/i.test(name)) {
        console.log('⚠️ Pomijam (brak nazwy lub plik):', name || link);
        continue;
      }

      // sprawdź czy już istnieje
      const existing = await Spirit.findOne({ where: { name } });
      if (existing) {
        console.log('ℹ️ Już istnieje, pomijam:', name);
        continue;
      }

      // opis: wybierz pierwszy paragraf o sensownej długości
      let description = '';
      $$('#mw-content-text p').each((i, p) => {
        const txt = $$(p).text().trim();
        if (txt.length > 30 && !description) {
          description = normalizeName(txt);
        }
      });
      if (!description) {
        // fallback - pierwszy <p>
        description = normalizeName($$('p').first().text().trim() || '');
      }

      // complexity: spróbuj znaleźć w infoboxie albo po pogrubionym "Complexity"
      let complexity = '';
      const infobox = $$('.infobox, table.infobox, .mw-parser-output table').first();
      if (infobox && infobox.length) {
        infobox.find('tr').each((i, tr) => {
          const th = $$(tr).find('th').text().trim();
          if (/Complexity/i.test(th)) {
            complexity = normalizeName($$(tr).find('td').text().trim());
          }
        });
      }
      if (!complexity) {
        // szukaj bold + 'Complexity'
        $$('b, strong').each((_, b) => {
          const t = $$(b).text();
          if (/Complexity/i.test(t)) {
            const parent = $$(b)
              .parent()
              .text()
              .replace(/Complexity/i, '')
              .trim();
            if (parent) complexity = normalizeName(parent);
          }
        });
      }
      // czysty wartościowy fallback
      if (!complexity) complexity = '';

      // zapisz do bazy
      await Spirit.create({ name, complexity, description });
      console.log(`✅ Dodano ducha: ${name}`);
      added++;
    } catch (err) {
      console.error(`⚠️ Błąd przy przetwarzaniu ${link}:`, err.message);
    }
  }

  console.log(`\n--- Zakończono: dodano ${added} duchów ---`);
}

async function main() {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Połączono z bazą PostgreSQL i zsynchronizowano modele.');

    await scrapeSpirits();
  } catch (err) {
    console.error('❌ Błąd:', err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

main();
