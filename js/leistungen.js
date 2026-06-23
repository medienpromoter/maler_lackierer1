/* leistungen.js – rendert auf index.html den Leistungs-Teaser und auf
   leistungen.html die vollständige Übersicht (Karten verlinken auf die
   generierten Detailseiten in /leistungen/). Liest aus content.js. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  // Inline-SVG-Icons je Leistung (Schlüssel = leistung.icon)
  var ICONS = {
    roller: '<path d="M4 4h12v6H4z"/><path d="M16 7h3v3h-2v3h-5v3h2v5h-4v-7h5V7"/>',
    facade: '<path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/><path d="M7 11h2M11 11h2M15 11h2"/>',
    brush: '<path d="M7 14c-1.5 1.5-2 4-2 5 1 0 3.5-.5 5-2 1-1 1-2 0-3s-2-1-3 0z"/><path d="M14 11l6-6a2 2 0 0 0-3-3l-6 6"/><path d="M10 13l1 1"/>',
    floor: '<path d="M3 4h18v16H3z"/><path d="M3 10h18M3 16h18M9 4v16M15 4v16"/>',
    design: '<path d="M3 3h18v18H3z"/><path d="M3 9h18M9 9v12"/><circle cx="15" cy="15" r="2"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>',
    thermometer: '<path d="M14 14V5a2 2 0 0 0-4 0v9a4 4 0 1 0 4 0z"/><path d="M12 9v6"/>',
    building: '<path d="M4 21V4h10v17M14 21V9h6v12"/><path d="M7 8h2M7 12h2M7 16h2M17 13h1M17 17h1"/>'
  };

  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.roller) + "</svg>";
  }

  function cardHTML(l, prefix) {
    var href = prefix + "leistungen/" + l.file;
    var media = l.image
      ? '<a class="card__media" href="' + href + '" aria-label="' + l.title + '">' +
          '<img loading="lazy" src="' + prefix + l.image + '" alt="' + l.title + '" ' +
            'onerror="this.closest(\'.card__media\').classList.add(\'is-empty\')">' +
          '<span class="card__badge">' + icon(l.icon) + "</span>" +
        "</a>"
      : "";
    return (
      '<article class="card" data-animate="fade-up">' +
        media +
        '<div class="card__body">' +
          "<h3>" + l.title + "</h3>" +
          "<p>" + l.teaser + "</p>" +
          '<a class="card__link" href="' + href + '">' +
            "Mehr erfahren &rarr;</a>" +
        "</div>" +
      "</article>"
    );
  }

  // Teaser auf der Startseite: nur erste 6 Leistungen
  var teaser = document.getElementById("leistungen-teaser");
  if (teaser) {
    teaser.innerHTML = S.leistungen.slice(0, 6).map(function (l) {
      return cardHTML(l, "");
    }).join("");
  }

  // Vollständige Übersicht auf leistungen.html
  var full = document.getElementById("leistungen-grid");
  if (full) {
    full.innerHTML = S.leistungen.map(function (l) { return cardHTML(l, ""); }).join("");
  }

  // Projekt-Galerie auf der Startseite (aus media.projects)
  var projekte = document.getElementById("projekte-grid");
  if (projekte && S.media && S.media.projects) {
    projekte.innerHTML = S.media.projects.map(function (p) {
      return '<figure class="gallery__item" data-animate="fade-up">' +
        '<img loading="lazy" src="' + p.src + '" alt="' + p.label + '" ' +
          'onerror="this.closest(\'.gallery__item\').style.display=\'none\'">' +
        '<figcaption>' + p.label + "</figcaption>" +
      "</figure>";
    }).join("");
  }
})();
