/* main.js – allgemeine Interaktionen: Formular-Handling, sanftes Scrollen,
   Zähler-Animation für Vertrauenssignale. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initForms();
    initCounters();
    initYearLinks();
  });

  /* Kontakt- und Bewerbungsformular: clientseitige Validierung + Feedback.
     Hinweis: Der tatsächliche Versand muss serverseitig angebunden werden
     (z. B. PHP-Mailer, Formspree o. Ä.). Hier wird nur das UX-Feedback gezeigt. */
  function initForms() {
    document.querySelectorAll("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var msg = form.querySelector(".form-msg");
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet …"; }

        // Platzhalter für echten Versand (fetch an Backend/Mailservice).
        setTimeout(function () {
          if (msg) {
            msg.classList.add("is-visible", "form-msg--ok");
            msg.textContent =
              form.getAttribute("data-form") === "bewerbung"
                ? "Vielen Dank für Ihre Bewerbung! Wir melden uns in Kürze bei Ihnen."
                : "Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich – meist noch am selben Werktag.";
          }
          form.reset();
          if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute("data-label") || "Absenden"; }
        }, 600);
      });
    });
  }

  /* Zähler-Animation: <span data-count="800">0</span> zählt beim Sichtbarwerden hoch. */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          el.textContent = Math.floor(p * target).toLocaleString("de-DE");
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* Jahreszahl in [data-year] einsetzen (z. B. im Copyright). */
  function initYearLinks() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
