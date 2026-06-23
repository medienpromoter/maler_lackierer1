/* Einmaliges Hilfsskript: ersetzt alle Platzhalter durch Musterdaten.
   Quelldateien werden bearbeitet; leistungen/*.html danach neu generieren. */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

// Reihenfolge wichtig: Phrasen (kontextabhängig) vor einfachen Tokens.
const replacements = [
  // kontextabhängige [Anzahl]
  ["aus [Anzahl] Rezensionen", "aus 187 Rezensionen"],
  ["über [Anzahl] Jahre Erfahrung", "über 20 Jahre Erfahrung"],
  ['value: "über [Anzahl]"', 'value: "über 800"'],
  ["nach [Anzahl] Tagen", "nach 7 Tagen"],
  // Kundenstimmen [Name] (content.js)
  ['author: "[Name]", role: "Privatkunde', 'author: "Sabine Keller", role: "Privatkunde'],
  ['author: "[Name]", role: "Eigenheimbesitzer', 'author: "Michael Brunner", role: "Eigenheimbesitzer'],
  ['author: "[Name]", role: "Hausverwaltung', 'author: "Andrea Walter", role: "Hausverwaltung'],
  // Kundenstimmen [Name] (index.html)
  ['[Name] <span class="quote__role">Privatkunde', 'Sabine Keller <span class="quote__role">Privatkunde'],
  ['[Name] <span class="quote__role">Eigenheimbesitzer', 'Michael Brunner <span class="quote__role">Eigenheimbesitzer'],
  ['[Name] <span class="quote__role">Hausverwaltung', 'Andrea Walter <span class="quote__role">Hausverwaltung'],
  ["unserem [Google-Profil]", "unserem Google-Unternehmensprofil"],
  // Impressum / rechtliche Spezialfelder
  ["[Geschäftsführer/in]", "Thomas Wagner"],
  ["[Amtsgericht]", "Amtsgericht Mannheim"],
  ["[HRB-Nummer]", "HRB 712345"],
  ["[USt-IdNr.]", "DE123456789"],
  ["[Kammer/Ort]", "Mannheim"],
  ["[Eintragsnummer]", "Handwerksrolle-Nr. 1234"],
  ["[Verantwortliche Person]", "Thomas Wagner"],
  ["[Hosting-Anbieter]", "IONOS SE, Montabaur"],
  ["[Monat/Jahr]", "Juni 2026"],
  // einfache Tokens (eindeutig)
  ["[Firmenname]", "Malerbetrieb Wagner"],
  ["[Stadt]", "Mannheim"],
  ["[Region]", "Rhein-Neckar-Region"],
  ["[Gründungsjahr]", "2005"],
  ["[Telefonnummer-Link]", "+496211234567"],
  ["[Telefonnummer]", "0621 1234567"],
  ["[Bewerbungs-E-Mail]", "bewerbung@maler-wagner.de"],
  ["[E-Mail]", "info@maler-wagner.de"],
  ["[Straße und Hausnummer]", "Industriestraße 12"],
  ["[PLZ]", "68159"],
  ["[Inhaber/in]", "Thomas Wagner"],
  ["[domain]", "maler-wagner"],
  ["[Hersteller]", "Caparol"],
];

// Bearbeitete Dateien (README.md bleibt als Doku unverändert; leistungen/*
// werden generiert; js/* und css/* enthalten keine Inhaltsplatzhalter).
const files = [
  "index.html", "leistungen.html", "kontakt.html", "kalkulator.html",
  "impressum.html", "datenschutz.html",
  "content/content.js",
  "sitemap.xml", "robots.txt", "llms.txt", "nginx.conf",
  ".github/workflows/deploy.yml",
];

let totalChanged = 0;
for (const rel of files) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) { console.log("  – fehlt:", rel); continue; }
  let text = fs.readFileSync(file, "utf8");
  let count = 0;
  for (const [from, to] of replacements) {
    const parts = text.split(from);
    if (parts.length > 1) { count += parts.length - 1; text = parts.join(to); }
  }
  if (count > 0) { fs.writeFileSync(file, text); totalChanged += count; }
  console.log("  " + (count > 0 ? "✓" : "·") + " " + rel + "  (" + count + ")");
}
console.log("\n" + totalChanged + " Ersetzungen insgesamt.");
