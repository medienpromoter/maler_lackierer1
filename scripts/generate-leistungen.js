#!/usr/bin/env node
/* =============================================================================
   generate-leistungen.js
   -----------------------------------------------------------------------------
   Liest content/content.js und generiert für jede Leistung eine statische
   HTML-Seite unter /leistungen/<file>.html. Wird vom GitHub-Actions-Workflow
   beim Deployment ausgeführt (.github/workflows/deploy.yml).

   Lokaler Aufruf:  node scripts/generate-leistungen.js
   ============================================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = require(path.join(ROOT, "content", "content.js"));
const OUT_DIR = path.join(ROOT, "leistungen");

// Inline-SVG-Icons (identisch zu js/leistungen.js)
const ICONS = {
  roller: '<path d="M4 4h12v6H4z"/><path d="M16 7h3v3h-2v3h-5v3h2v5h-4v-7h5V7"/>',
  facade: '<path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/><path d="M7 11h2M11 11h2M15 11h2"/>',
  brush: '<path d="M7 14c-1.5 1.5-2 4-2 5 1 0 3.5-.5 5-2 1-1 1-2 0-3s-2-1-3 0z"/><path d="M14 11l6-6a2 2 0 0 0-3-3l-6 6"/><path d="M10 13l1 1"/>',
  floor: '<path d="M3 4h18v16H3z"/><path d="M3 10h18M3 16h18M9 4v16M15 4v16"/>',
  design: '<path d="M3 3h18v18H3z"/><path d="M3 9h18M9 9v12"/><circle cx="15" cy="15" r="2"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>',
  thermometer: '<path d="M14 14V5a2 2 0 0 0-4 0v9a4 4 0 1 0 4 0z"/><path d="M12 9v6"/>',
  building: '<path d="M4 21V4h10v17M14 21V9h6v12"/><path d="M7 8h2M7 12h2M7 16h2M17 13h1M17 17h1"/>'
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function icon(name) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    (ICONS[name] || ICONS.roller) + "</svg>";
}

function renderPage(l, c) {
  const sections = l.sections.map(s =>
    `<div style="margin-bottom:1.5rem"><h3>${esc(s.heading)}</h3><p>${s.text}</p></div>`
  ).join("\n");

  const benefits = (l.benefits || []).map(b => `<li>${b}</li>`).join("\n");

  const steps = l.steps.map(s =>
    `<div class="step"><h4>${esc(s.title)}</h4><p>${s.text}</p></div>`
  ).join("\n");

  const foerderung = l.foerderung
    ? `<div class="notice"><strong>Förderung möglich:</strong> ${l.foerderung}</div>`
    : "";

  const heroBg = l.image
    ? `<div class="hero__bg" style="background-image:url('../${l.image}')"></div>`
    : "";

  const introImg = l.image
    ? `<figure class="media-frame" style="margin:0 0 1.5rem">
            <img loading="lazy" src="../${l.image}" alt="${esc(l.title)}" onerror="this.closest('.media-frame').style.display='none'">
          </figure>`
    : "";

  const gallery = (l.gallery && l.gallery.length)
    ? `<section class="section section--dark">
      <div class="container">
        <div class="section__head section__head--center"><span class="eyebrow">Einblicke</span><h2>Beispiele aus unserer Arbeit</h2></div>
        <div class="gallery">${l.gallery.map(src =>
          `<figure class="gallery__item"><img loading="lazy" src="../${src}" alt="${esc(l.shortTitle)}" onerror="this.closest('.gallery__item').style.display='none'"></figure>`
        ).join("\n          ")}</div>
      </div>
    </section>`
    : "";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(l.title)} – ${esc(c.name)} aus ${esc(c.city)}</title>
  <meta name="description" content="${esc(l.teaser)}">
  <link rel="canonical" href="${c.domain}/leistungen/${l.file}">
  <link rel="icon" href="../images/logo.png">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "${esc(l.title)}",
    "provider": { "@type": "HousePainter", "name": "${esc(c.name)}", "areaServed": "${esc(c.city)}" },
    "areaServed": "${esc(c.region)}",
    "description": "${esc(l.teaser)}"
  }
  </script>
</head>
<body>
  <div id="site-header"></div>

  <main>
    <section class="hero hero--inner">
      ${heroBg}
      <div class="container">
        <span class="hero__location">📍 Für ${esc(c.city)} und ${esc(c.region)}</span>
        <h1>${esc(l.title)}</h1>
        <p>${esc(l.teaser)}</p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="../kontakt.html">${esc(l.cta.text)}</a>
          <a class="btn btn--light" href="tel:${c.phoneHref}">☎ ${esc(c.phone)}</a>
        </div>
      </div>
    </section>

    <div class="container">
      <nav class="breadcrumb"><a href="../index.html">Start</a> › <a href="../leistungen.html">Leistungen</a> › ${esc(l.shortTitle)}</nav>
    </div>

    <section class="section" style="padding-top:1rem">
      <div class="container">
        <div class="about-grid" style="align-items:start">
          <div>
            <span class="eyebrow">Leistung</span>
            <h2>Worum es geht</h2>
            ${introImg}
            <p class="lead">${l.intro}</p>
            <p><strong>Für wen geeignet:</strong> ${l.forWhom}</p>
          </div>
          <div class="card card--soft" style="padding:1.6rem">
            <div class="card__icon">${icon(l.icon)}</div>
            <h3>Ihr Nutzen auf einen Blick</h3>
            <ul class="check-list" style="margin:0">${benefits}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section__head"><h2>Was wir konkret anbieten</h2></div>
        ${sections}
        ${foerderung}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section__head section__head--center"><span class="eyebrow">So arbeiten wir</span><h2>Der Ablauf</h2></div>
        <div class="steps">${steps}</div>
      </div>
    </section>

    ${gallery}

    <section class="section">
      <div class="container">
        <div class="cta-band">
          <h2>${esc(l.cta.text)}</h2>
          <p>${esc(l.cta.sub)}. Wir besichtigen kostenlos und erstellen Ihnen ein verständliches Festpreisangebot.</p>
          <a class="btn btn--light" href="../kontakt.html">${esc(l.cta.text)}</a>
          <span class="cta-band__phone">Kurzfristig? ☎ <a href="tel:${c.phoneHref}">${esc(c.phone)}</a></span>
        </div>
      </div>
    </section>
  </main>

  <footer id="site-footer"></footer>

  <script src="../content/content.js"></script>
  <script src="../js/nav.js"></script>
  <script src="../js/footer.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const c = SITE.company;
  let count = 0;
  SITE.leistungen.forEach(l => {
    const html = renderPage(l, c);
    fs.writeFileSync(path.join(OUT_DIR, l.file), html, "utf8");
    console.log("  ✓ leistungen/" + l.file + "  (" + l.title + ")");
    count++;
  });
  console.log("\n" + count + " Leistungsseiten generiert.");
}

main();
