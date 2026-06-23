/* nav.js – baut Header/Navigation aus content.js und steuert das Mobil-Menü.
   Erwartet ein Element <div id="site-header"></div> im Markup. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;
  var c = S.company;

  // aktuelle Seite ermitteln (für aktiven Menüpunkt)
  var path = window.location.pathname.split("/").pop() || "index.html";

  var inLeistungen = window.location.pathname.indexOf("/leistungen/") !== -1;
  var prefix = inLeistungen ? "../" : "";

  // Untermenü für „Leistungen" aus content.js (alle Leistungs-Detailseiten).
  // Erster Eintrag verlinkt auf die Übersichtsseite.
  var submenu =
    '<a href="' + prefix + 'leistungen.html">Alle Leistungen</a>' +
    S.leistungen.map(function (l) {
      return '<a href="' + prefix + "leistungen/" + l.file + '">' + l.shortTitle + "</a>";
    }).join("");

  var navLinks = S.nav.map(function (item) {
    var href = item.href;
    // Wenn wir uns in /leistungen/ befinden, relative Pfade nach oben korrigieren
    if (inLeistungen && href.indexOf("http") !== 0) {
      href = "../" + href;
    }
    var active = (item.href === path || (item.href === "leistungen.html" && inLeistungen)) ? " is-active" : "";

    // „Leistungen" erhält ein aufklappbares Untermenü
    if (item.href === "leistungen.html") {
      return (
        '<div class="nav__group">' +
          '<a href="' + href + '" class="nav__grouptop' + active + '" aria-haspopup="true" aria-expanded="false">' +
            item.label + '<span class="nav__caret" aria-hidden="true">▾</span>' +
          "</a>" +
          '<div class="submenu">' + submenu + "</div>" +
        "</div>"
      );
    }
    return '<a href="' + href + '" class="' + active.trim() + '">' + item.label + "</a>";
  }).join("");

  var html =
    '<div class="topbar"><div class="container">' +
      '<span>Maler- und Lackiererbetrieb in ' + c.city + ' &amp; ' + c.region + '</span>' +
      '<span class="topbar__contact">' +
        '<a href="tel:' + c.phoneHref + '">☎ ' + c.phone + '</a>' +
        '<a href="mailto:' + c.email + '">✉ ' + c.email + '</a>' +
      "</span>" +
    "</div></div>" +
    '<header class="site-header"><div class="container">' +
      '<a class="brand" href="' + prefix + 'index.html">' +
        '<img src="' + prefix + 'images/logo.png" alt="' + c.name + ' Logo" onerror="this.style.display=\'none\'">' +
        "<span>" + c.name + "</span>" +
      "</a>" +
      '<button class="nav-toggle" aria-label="Menü öffnen" aria-expanded="false">' +
        "<span></span><span></span><span></span></button>" +
      '<nav class="nav" id="primary-nav">' + navLinks +
        '<span class="nav__cta"><a class="btn btn--primary" href="' + prefix + 'kontakt.html">Angebot anfragen</a></span>' +
      "</nav>" +
    "</div></header>" +
    '<div class="nav-backdrop"></div>';

  var mount = document.getElementById("site-header");
  if (mount) mount.innerHTML = html;

  // Mobil-Menü-Steuerung
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var backdrop = document.querySelector(".nav-backdrop");

  function closeMenu() {
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function toggleMenu() {
    var open = nav.classList.toggle("is-open");
    backdrop.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle) toggle.addEventListener("click", toggleMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  // Untermenü „Leistungen" auf Mobilgeräten per Tipp auf-/zuklappen
  var mqMobile = window.matchMedia("(max-width: 979px)");
  var group = nav ? nav.querySelector(".nav__group") : null;
  var groupTop = group ? group.querySelector(".nav__grouptop") : null;
  if (groupTop && group) {
    groupTop.addEventListener("click", function (e) {
      if (!mqMobile.matches) return;          // Desktop: normal zur Übersichtsseite
      e.preventDefault();
      var open = group.classList.toggle("is-open");
      groupTop.setAttribute("aria-expanded", String(open));
    });
  }

  // Klick auf einen Menüpunkt schließt das Mobil-Menü –
  // außer auf „Leistungen" selbst (das klappt nur das Untermenü auf/zu).
  if (nav) nav.querySelectorAll("a").forEach(function (a) {
    if (a.classList.contains("nav__grouptop")) return;
    a.addEventListener("click", closeMenu);
  });
})();
