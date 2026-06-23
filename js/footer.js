/* footer.js – baut den Footer aus content.js.
   Erwartet ein Element <div id="site-footer"></div> im Markup. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;
  var c = S.company;
  var prefix = (window.location.pathname.indexOf("/leistungen/") !== -1) ? "../" : "";

  // Leistungs-Links für den Footer
  var leistungLinks = S.leistungen.slice(0, 6).map(function (l) {
    return '<li><a href="' + prefix + "leistungen/" + l.file + '">' + l.shortTitle + "</a></li>";
  }).join("");

  var hours = c.hours.map(function (h) {
    return "<li><span>" + h.day + "</span> &nbsp;" + h.time + "</li>";
  }).join("");

  var html =
    '<div class="container"><div class="footer-grid">' +
      // Spalte 1: Marke + Adresse
      '<div class="footer-brand">' +
        '<img src="' + prefix + 'images/logo_footer.png" alt="' + c.name + '" onerror="this.style.display=\'none\'">' +
        "<p>" + c.claim + ".<br>Sauber, termintreu und mit Meisterhand.</p>" +
        "<p><strong>" + c.legalName + "</strong><br>" +
          c.street + "<br>" + c.zip + " " + c.addressCity + "</p>" +
      "</div>" +
      // Spalte 2: Leistungen
      '<div><h4>Leistungen</h4><ul class="footer-list">' + leistungLinks +
        '<li><a href="' + prefix + 'leistungen.html">Alle Leistungen</a></li></ul></div>' +
      // Spalte 3: Unternehmen
      '<div><h4>Unternehmen</h4><ul class="footer-list">' +
        '<li><a href="' + prefix + 'index.html#ueber-uns">Über uns</a></li>' +
        '<li><a href="' + prefix + 'index.html#referenzen">Referenzen</a></li>' +
        '<li><a href="' + prefix + 'index.html#karriere">Karriere</a></li>' +
        '<li><a href="' + prefix + 'kontakt.html">Kontakt</a></li>' +
        '<li><a href="' + prefix + 'impressum.html">Impressum</a></li>' +
        '<li><a href="' + prefix + 'datenschutz.html">Datenschutz</a></li>' +
      "</ul></div>" +
      // Spalte 4: Kontakt + Zeiten
      '<div><h4>Kontakt</h4><ul class="footer-list">' +
        '<li>☎ <a href="tel:' + c.phoneHref + '">' + c.phone + "</a></li>" +
        '<li>✉ <a href="mailto:' + c.email + '">' + c.email + "</a></li>" +
      "</ul><h4 style=\"margin-top:1.2rem\">Öffnungszeiten</h4><ul class=\"footer-list\">" + hours + "</ul></div>" +
    "</div>" +
    '<div class="footer-bottom">' +
      "<span>© " + new Date().getFullYear() + " " + c.legalName + " · Alle Rechte vorbehalten.</span>" +
      '<span><a href="' + prefix + 'impressum.html">Impressum</a> · <a href="' + prefix + 'datenschutz.html">Datenschutz</a></span>' +
    "</div></div>";

  var mount = document.getElementById("site-footer");
  if (mount) { mount.className = "site-footer"; mount.innerHTML = html; }
})();
