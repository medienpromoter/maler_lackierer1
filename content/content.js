/* =============================================================================
   content.js – Zentrale Inhalts- und Datenquelle der gesamten Website
   -----------------------------------------------------------------------------
   - Wird beim Deployment vom Build-Skript (.github/workflows) eingelesen, um
     die Seiten unter /leistungen/*.html automatisch zu generieren.
   - Wird im Browser von js/nav.js, js/footer.js und js/leistungen.js genutzt.
   - Platzhalter in eckigen Klammern (z. B. Malerbetrieb Wagner, Mannheim) vor dem
     Livegang ersetzen. Eine vollständige Liste steht in der README.
   ============================================================================ */

(function (root, factory) {
  // Universelles Modul: funktioniert in Node (Build) und im Browser.
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SITE = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ---------------------------------------------------------------------------
     1) Betriebsdaten – zentral pflegen, wirken sich auf alle Seiten aus.
     --------------------------------------------------------------------------- */
  const company = {
    name: "Malerbetrieb Wagner",
    legalName: "Malerbetrieb Wagner GmbH",          // für Impressum
    claim: "Maler- und Lackiererbetrieb aus Mannheim",
    city: "Mannheim",
    region: "Rhein-Neckar-Region",                       // Einzugsgebiet, z. B. "Großraum Mannheim"
    founded: "2005",               // z. B. "2005"
    phone: "0621 1234567",                 // Anzeige, z. B. "0123 4567890"
    phoneHref: "+496211234567",        // ohne Leerzeichen, z. B. "+4912345678 90"
    email: "info@maler-wagner.de",                        // z. B. "info@firmenname.de"
    careerEmail: "bewerbung@maler-wagner.de",       // z. B. "bewerbung@firmenname.de"
    street: "Industriestraße 12",
    zip: "68159",
    addressCity: "Mannheim",
    owner: "Thomas Wagner",                     // z. B. "Familie Mustermann"
    domain: "https://www.maler-wagner.de",
    hours: [
      { day: "Mo–Fr", time: "07:30 – 17:00 Uhr" },
      { day: "Sa", time: "nach Vereinbarung" },
      { day: "So", time: "geschlossen" }
    ],
    social: {
      instagram: "",   // optional: vollständige URL
      facebook: ""     // optional: vollständige URL
    }
  };

  /* ---------------------------------------------------------------------------
     2) Vertrauenssignale – erscheinen auf Startseite, Über uns, Leistungen.
        Platzhalterwerte vor Livegang prüfen / mit echten Zahlen ersetzen.
     --------------------------------------------------------------------------- */
  const trust = [
    { value: "4,9 / 5", label: "Google-Bewertung", detail: "aus 187 Rezensionen" },
    { value: "Meisterbetrieb", label: "geführt vom Maler­meister", detail: "Mitglied der Maler-Innung Mannheim" },
    { value: "seit 2005", label: "in Mannheim tätig", detail: "über 20 Jahre Erfahrung" },
    { value: "über 800", label: "renovierte Wohnungen", detail: "Privat- und Gewerbekunden" }
  ];

  // Herstellerzertifikate / Partnersysteme (Logos in /images ablegen).
  const partners = ["Caparol", "Brillux", "Sto", "Sikkens"];

  /* ---------------------------------------------------------------------------
     2b) Medien – zentrale Bildpfade für Hero und wiederkehrende Sektionen.
        Liegt ein Bild nicht vor, blendet onerror das <img> automatisch aus.
     --------------------------------------------------------------------------- */
  const media = {
    hero: "images/fassadenanstrich_fassadensanierung/fassadenanstrich_adobe2.jpg",
    steps: "images/innenanstrich_innenrenovierung/wandanstrich_adobe2.jpg",
    promise: "images/lackierarbeit/lackierung_von_holzbauteilen_adobe2.jpg",
    about: "images/gewerbe_grossprojekte/renovierung_fuer_hausverwaltung_adobe1.jpg",
    career: "images/innenanstrich_innenrenovierung/spachtelarbeiten_adobe2.jpg",
    contact: "images/fassadenanstrich_fassadensanierung/fassadenanstrich_adobe3.jpg",
    // Projekt-Galerie (Startseite, „Echte Projekte")
    projects: [
      { src: "images/innenanstrich_innenrenovierung/wandanstrich1_adobe.jpg", label: "Innenanstrich, Mannheim-Neckarstadt" },
      { src: "images/fassadenanstrich_fassadensanierung/fassadensanierung_adobe1.jpg", label: "Fassadensanierung, Altbau Rhein-Neckar" },
      { src: "images/lackierarbeit/lackierung_von_metallbauteilen_adobe1.jpg", label: "Geländer entrostet & lackiert" },
      { src: "images/bodenbeschichtung_bodenbelaege/garagen_und_kellerbodenbeschichtung_abobe1.jpg", label: "Garagenboden mit Epoxidharz" },
      { src: "images/tapezier_dekorationsarbeiten/strukturputz_adobe1.jpg", label: "Effektputz im Wohnzimmer" },
      { src: "images/schimmelsanierung/schimmelbeseitigung_adobe1.jpg", label: "Schimmelsanierung mit Ursachenanalyse" }
    ]
  };

  /* ---------------------------------------------------------------------------
     3) Leistungen – Quelle für /leistungen.html und /leistungen/<slug>.html.
        Aufbau je Leistung folgt dem Schema:
        was → für wen → nutzen → ablauf → (förderung) → CTA
     --------------------------------------------------------------------------- */
  const leistungen = [
    {
      slug: "innenanstrich-innenrenovierung",
      file: "leistung-1.html",
      shortTitle: "Innenanstrich & Renovierung",
      title: "Innenanstrich & Innenrenovierung",
      icon: "roller",
      image: "images/innenanstrich_innenrenovierung/wandanstrich1_adobe.jpg",
      gallery: [
        "images/innenanstrich_innenrenovierung/deckenanstrich_adobe1.jpg",
        "images/innenanstrich_innenrenovierung/tapezierarbeiten_adobe1.jpg",
        "images/innenanstrich_innenrenovierung/spachtelarbeiten_adobe1.jpg",
        "images/innenanstrich_innenrenovierung/wohungsuebergabe_adobe1.jpg"
      ],
      teaser:
        "Frisch gestrichene Wände lassen Räume heller und gepflegter wirken. Wir übernehmen Untergrund, Anstrich und die komplette Endreinigung – Ihre Möbel bleiben sauber abgedeckt.",
      intro:
        "Ein neuer Anstrich verändert einen Raum spürbar: Wände wirken heller, gleichmäßiger und gepflegter. Damit das Ergebnis lange so bleibt, kommt es auf die Vorbereitung an – auf saubere Kanten, einen tragfähigen Untergrund und den richtigen Farbaufbau. Wir streichen Wohn- und Schlafräume in Mannheim und Rhein-Neckar-Region, renovieren komplette Wohnungen und übernehmen auf Wunsch die termingebundene Übergabe-Renovierung beim Mieterwechsel.",
      forWhom:
        "Geeignet für Wohn- und Schlafräume, Flure, Küchen und Bäder im Altbau wie im Neubau – ob einzelner Raum, komplette Wohnung oder Renovierung vor Ein- oder Auszug.",
      sections: [
        {
          heading: "Wandanstrich in Wohn- und Schlafräumen",
          text:
            "Vor dem ersten Pinselstrich bereiten wir den Untergrund vor: spachteln, schleifen und grundieren. Dieser Schritt entscheidet darüber, ob die Wand am Ende gleichmäßig deckt. In Wohnräumen verwenden wir meist hochwertige Dispersionsfarbe; für stark beanspruchte Bereiche wie Flur und Küche empfehlen wir abwaschbare Latexfarbe. Wir streichen in der Regel zwei Anstriche – ein einzelner Anstrich lässt den alten Farbton oder Flecken oft durchschimmern."
        },
        {
          heading: "Deckenanstrich",
          text:
            "Decken zeigen Unregelmäßigkeiten durch Lichteinfall besonders deutlich. Wir verwenden hier überwiegend matte Farben, die das Licht weich streuen und Ansätze kaschieren. Möbel und Böden decken wir vollflächig ab, bevor wir beginnen."
        },
        {
          heading: "Tapezierarbeiten",
          text:
            "Wir entfernen alte Tapeten und entsorgen sie fachgerecht. Beim Neubezug beraten wir zur passenden Tapetenart: Vliestapete ist verarbeitungsfreundlich und gut wieder entfernbar, Raufaser kaschiert kleine Unebenheiten, Vinyltapete eignet sich für feuchtere Bereiche. Bei unebenen Wänden sind streichfähige Tapeten oft die unkomplizierte Lösung."
        },
        {
          heading: "Spachtel- und Putzarbeiten",
          text:
            "Risse, alte Bohrlöcher und Unebenheiten gleichen wir vor dem Anstrich aus. Je nach gewünschter Oberflächenqualität arbeiten wir in den Spachtelstufen Q1 bis Q4. Wo Licht flach über die Wand streift – etwa neben großen Fenstern – ist eine höhere Stufe (Q3/Q4) sinnvoll, weil dort jede Unebenheit sichtbar würde."
        },
        {
          heading: "Renovierung bei Wohnungsübergabe",
          text:
            "Beim Mieterwechsel zählt der Termin. Wir kombinieren Streichen, kleine Spachtelarbeiten und Endreinigung so, dass die Wohnung pünktlich zur Übergabe frisch und sauber ist – auf Wunsch innerhalb weniger Tage."
        }
      ],
      benefits: [
        "Möbel und Böden werden vollflächig abgedeckt, Türen mit Staubschutz versehen",
        "Am Ende reinigen wir den Raum besenrein – Sie ziehen in einen sauberen Raum ein",
        "Für Feuchträume wie Bad und Küche wählen wir passende, schimmelhemmende Farbsysteme"
      ],
      steps: [
        { title: "Besichtigung & Beratung", text: "Wir sehen uns die Räume an, klären Farbwünsche und erstellen ein verbindliches Angebot." },
        { title: "Untergrundvorbereitung", text: "Abkleben, abdecken, spachteln, schleifen und grundieren – die Basis für ein sauberes Ergebnis." },
        { title: "Anstrich / Tapezierung", text: "Zwei deckende Anstriche oder fachgerechter Tapezierbezug, sauber abgesetzt an allen Kanten." },
        { title: "Endreinigung & Übergabe", text: "Wir räumen Abdeckungen ab, reinigen besenrein und übergeben den fertigen Raum." }
      ],
      cta: { text: "Jetzt Renovierung anfragen", sub: "Oder kostenlosen Besichtigungstermin vereinbaren" }
    },

    {
      slug: "fassadenanstrich-sanierung",
      file: "leistung-2.html",
      shortTitle: "Fassadenanstrich & -sanierung",
      title: "Fassadenanstrich & Fassadensanierung",
      icon: "facade",
      image: "images/fassadenanstrich_fassadensanierung/fassadenanstrich_adobe1.jpg",
      gallery: [
        "images/fassadenanstrich_fassadensanierung/fassadenreinigung_adobe1.jpg",
        "images/fassadenanstrich_fassadensanierung/fassadensanierung_adobe1.jpg",
        "images/fassadenanstrich_fassadensanierung/graffitischutz_adobe1.jpg",
        "images/fassadenanstrich_fassadensanierung/waermedaemmverbundsystem_adobe1.jpg"
      ],
      teaser:
        "Eine frische Fassade schützt das Gebäude vor Witterung und wertet es sichtbar auf. Wir reinigen, sanieren Risse und beschichten mit langlebigen Farbsystemen – passend zu Ihrem Fassadentyp.",
      intro:
        "Die Fassade ist die Schutzhülle des Hauses – und das Erste, was man sieht. Ein guter Anstrich hält je nach Material und Wetterseite 10 bis 15 Jahre und bewahrt das Mauerwerk vor Feuchtigkeit. Wir beraten Sie zum passenden Farbsystem für Ihren Fassadentyp und planen die Arbeiten wetterabhängig, weil Fassadenfarbe nur bei geeigneter Temperatur und Trockenheit sauber aushärtet.",
      forWhom:
        "Für Ein- und Mehrfamilienhäuser in Mannheim und Rhein-Neckar-Region – Putzfassaden, Sichtmauerwerk und Betonflächen, ob Neuanstrich, Auffrischung oder Sanierung einer rissigen Altbaufassade.",
      sections: [
        {
          heading: "Fassadenanstrich – Neuanstrich und Auffrischung",
          text:
            "Welche Farbe sinnvoll ist, hängt vom Untergrund ab. Silikatfarbe ist hoch diffusionsoffen und sehr langlebig – ideal auf mineralischem Putz. Silikonharzfarbe ist wasserabweisend und elastisch und überbrückt feine Risse, was sie für Altbauten interessant macht. Wir empfehlen das System, das zu Ihrer Fassade und Wetterseite passt."
        },
        {
          heading: "Fassadenreinigung",
          text:
            "Vor jedem Anstrich entfernen wir Algen, Moos und Witterungsablagerungen. Dabei arbeiten wir schonend und mit angepasstem Druck – zu hoher Druck schädigt den Putz und schafft neue Probleme statt sie zu lösen."
        },
        {
          heading: "Rissfassaden-Sanierung",
          text:
            "Nicht jeder Riss ist gleich: Oberflächliche Putzrisse lassen sich mit elastischen Beschichtungen überbrücken, tiefer reichende Setzungsrisse erfordern eine genauere Begutachtung und Sanierputz. Wir ordnen die Ursache ein, bevor wir beschichten."
        },
        {
          heading: "Graffiti-Schutz und -Entfernung",
          text:
            "Wir entfernen Graffiti, ohne die Fassade zu beschädigen, und tragen auf Wunsch eine Schutzbeschichtung auf. Sie macht erneute Verschmutzungen abwaschbar und lässt sich später wiederherstellen."
        },
        {
          heading: "WDVS – Anstrich und Instandsetzung",
          text:
            "Gedämmte Fassaden (Wärmedämmverbundsystem) brauchen abgestimmte Beschichtungen auf dem Dämmputz. Wo Spechte den Dämmputz beschädigen, ergänzen wir bei Bedarf ein Schutzgitter."
        }
      ],
      benefits: [
        "Realistische Lebensdauer: je nach Material und Wetterseite rund 10–15 Jahre",
        "Witterungsabhängige Terminplanung – wir arbeiten, wenn das Wetter es zulässt",
        "Gerüstbau koordinieren wir für Sie (eigene Leistung bzw. geprüfter Partnerbetrieb)"
      ],
      foerderung:
        "Wird der Fassadenanstrich mit einer Dämmmaßnahme kombiniert, sind Förderungen über BAFA und KfW (BEG-Einzelmaßnahmen) möglich. Wichtig: Der Förderantrag muss vor Auftragsvergabe gestellt werden. Wir verweisen Sie an eine Energieberatung und unterstützen bei den nötigen Nachweisen.",
      steps: [
        { title: "Begutachtung", text: "Wir prüfen Untergrund, Risse und Wetterseite vor Ort und empfehlen das passende Farbsystem." },
        { title: "Gerüstbau", text: "Sicheres Gerüst für sauberes Arbeiten – Koordination übernehmen wir." },
        { title: "Reinigung & Vorbereitung", text: "Algen und Ablagerungen schonend entfernen, Risse sanieren, grundieren." },
        { title: "Beschichtung", text: "Langlebiger Fassadenanstrich, in der Regel zweilagig für gleichmäßige Deckung." }
      ],
      cta: { text: "Jetzt Fassadenanstrich anfragen", sub: "Oder kostenlose Fassadenbegutachtung vereinbaren" }
    },

    {
      slug: "lackierarbeiten",
      file: "leistung-3.html",
      shortTitle: "Lackierarbeiten",
      title: "Lackierarbeiten an Holz und Metall",
      icon: "brush",
      image: "images/lackierarbeit/lackierung_von_holzbauteilen_adobe1.jpg",
      gallery: [
        "images/lackierarbeit/lackierung_von_metallbauteilen_adobe1.jpg",
        "images/lackierarbeit/holzschutzanstrich_außen_adobe1.jpg",
        "images/lackierarbeit/industrielackierung_adobe1.jpg"
      ],
      teaser:
        "Fenster, Türen, Heizkörper, Geländer oder Holzfassaden: Mit der richtigen Vorbereitung und passendem Lack halten Bauteile wieder viele Jahre – innen wie außen.",
      intro:
        "Ein sauberer Lack steht und fällt mit der Vorbereitung. Ohne gründliches Schleifen, Entrosten und Grundieren hält keine Beschichtung dauerhaft – egal wie gut der Lack ist. Wir lackieren Holz- und Metallbauteile innen und außen und beraten zur Lebensdauer, die je nach Wetterseite (Süd- oder Nordlage) und Beanspruchung sehr unterschiedlich ausfällt.",
      forWhom:
        "Für Hausbesitzer und Mieter in Mannheim und Rhein-Neckar-Region: Fenster, Türen, Treppen und Geländer, Heizkörper, Zäune, Carports und Gartenhäuser – auch das Aufarbeiten vorhandener Möbel statt Neukauf.",
      sections: [
        {
          heading: "Holzbauteile: Fenster, Türen, Treppen, Möbel",
          text:
            "Holzfenster und -türen brauchen einen Lack, der mit dem Holz arbeitet. Wasserbasierte Lacke sind geruchsärmer und vergilben kaum, lösemittelhaltige sind in bestimmten Außensituationen widerstandsfähiger – wir wählen je nach Bauteil. Treppen, Geländer und Möbel arbeiten wir auf, statt sie zu ersetzen: oft die günstigere und nachhaltigere Lösung."
        },
        {
          heading: "Metallbauteile: Heizkörper, Geländer, Zäune",
          text:
            "Bei Metall entscheidet der Rostschutz über die Haltbarkeit. Wir entrosten, behandeln den Untergrund und grundieren, bevor wir lackieren. Heizkörper erhalten hitzebeständige Beschichtungen, Außengeländer und Zäune einen belastbaren Korrosionsschutz."
        },
        {
          heading: "Holzschutz außen: Lasur oder Lack",
          text:
            "Holzfassaden, Carports, Gartenhäuser und Zäune leben von UV- und Witterungsschutz. Der Unterschied ist einfach: Eine Lasur lässt die Maserung sichtbar und betont den Holzcharakter, eine deckende Farbe verschließt die Oberfläche vollständig und schützt etwas stärker vor Sonne. Wir beraten je nach gewünschter Optik und Lage."
        },
        {
          heading: "Industrielackierung",
          text:
            "Auf Anfrage beschichten wir Stahlkonstruktionen und Metallteile mit normgerechtem Korrosionsschutz – sprechen Sie uns auf Ihre konkrete Anwendung an."
        }
      ],
      benefits: [
        "Vorbereitung als Qualitätsfaktor: schleifen, entrosten, grundieren – darauf hält der Lack",
        "Lasur oder Deckfarbe – wir erklären den Unterschied an Ihrem konkreten Bauteil",
        "Realistische Einschätzung der Lebensdauer je nach Sonnen- und Wetterseite"
      ],
      steps: [
        { title: "Begutachtung", text: "Zustand des Bauteils prüfen, Untergrund und passendes Lacksystem festlegen." },
        { title: "Vorbereitung / Schleifen", text: "Alte Schichten anschleifen oder entfernen, Metall entrosten, Holz ausbessern." },
        { title: "Grundierung", text: "Haftgrund bzw. Rostschutz auftragen – die Basis für Haltbarkeit." },
        { title: "Lackierung", text: "Deckende Lackierung oder Lasur, sauber und gleichmäßig aufgetragen." }
      ],
      cta: { text: "Jetzt Lackierarbeiten anfragen", sub: "Oder Angebot für Fensterlackierung anfordern" }
    },

    {
      slug: "bodenbeschichtung",
      file: "leistung-4.html",
      shortTitle: "Bodenbeschichtung",
      title: "Bodenbeschichtung & Bodenbeläge",
      icon: "floor",
      image: "images/bodenbeschichtung_bodenbelaege/garagen_und_kellerbodenbeschichtung_abobe1.jpg",
      gallery: [
        "images/bodenbeschichtung_bodenbelaege/balkon_und_terrassenbeschichtung_adobe1.jpg",
        "images/bodenbeschichtung_bodenbelaege/industriebodenbeschichtung_adobe1.jpg",
        "images/bodenbeschichtung_bodenbelaege/industriebodenbeschichtung_adobe2.jpg"
      ],
      teaser:
        "Belastbare, abwaschbare Böden für Garage, Keller, Werkstatt, Balkon und Terrasse. Wir beschichten staubfrei, fugenlos und passend zur tatsächlichen Beanspruchung.",
      intro:
        "Ein beschichteter Boden ist staubfrei, leicht zu reinigen und hält jahrelang – vorausgesetzt, der Untergrund stimmt. Die Vorbereitung ist hier der kritische Faktor: Wir reinigen, prüfen die Restfeuchte und gleichen Unebenheiten aus, bevor wir beschichten. So löst sich die Beschichtung später nicht ab.",
      forWhom:
        "Für Garagen, Keller und Werkstätten, Balkone und Terrassen in Mannheim und Rhein-Neckar-Region – sowie für gewerbliche Lager- und Produktionsflächen auf Anfrage.",
      sections: [
        {
          heading: "Garagen- und Kellerboden",
          text:
            "Epoxidharz ist hoch belastbar und beständig gegen Öl und Chemikalien – die typische Wahl für Garage und Werkstatt, wo Reifen und auslaufende Flüssigkeiten den Boden belasten. Polyurethan ist elastischer und verträgt Temperaturschwankungen besser. Wir wählen das System nach Ihrer Nutzung."
        },
        {
          heading: "Balkon- und Terrassenbeschichtung",
          text:
            "Im Außenbereich geht es vor allem um Abdichtung gegen Feuchtigkeit. Wir verwenden abdichtende, rutschhemmende Beschichtungssysteme, die Nässe vom Bauwerk fernhalten und auch bei Regen Trittsicherheit bieten."
        },
        {
          heading: "Industriebodenbeschichtung",
          text:
            "Für Lager- und Produktionsflächen beschichten wir auf Anfrage rutschfest und chemisch beständig – abgestimmt auf Belastung, Reinigung und Nutzung der Fläche."
        }
      ],
      benefits: [
        "Klare Zuordnung von Belastbarkeit und Einsatz: Pkw-Last, Chemikalien, Außenbereich",
        "Realistische Trocknungszeiten: begehbar nach ca. 24 Stunden, voll belastbar nach mehreren Tagen",
        "Staubfreie, abwaschbare Oberfläche – deutlich pflegeleichter als roher Beton"
      ],
      steps: [
        { title: "Untergrundprüfung", text: "Wir prüfen Festigkeit und Restfeuchte – ohne tragfähigen Untergrund keine dauerhafte Beschichtung." },
        { title: "Vorbereitung", text: "Reinigen, anschleifen, grundieren und Unebenheiten ausgleichen." },
        { title: "Beschichtung", text: "Auftrag des passenden Systems, auf Wunsch mit rutschhemmender Oberfläche." }
      ],
      cta: { text: "Jetzt Bodenbeschichtung anfragen", sub: "Oder Angebot für den Garagenboden anfordern" }
    },

    {
      slug: "tapezier-dekorationsarbeiten",
      file: "leistung-5.html",
      shortTitle: "Tapezier- & Dekorationsarbeiten",
      title: "Tapezier- und Dekorationsarbeiten",
      icon: "design",
      image: "images/tapezier_dekorationsarbeiten/vlies_und_strukturtapeten_adobe1.jpg",
      gallery: [
        "images/tapezier_dekorationsarbeiten/strukturputz_adobe1.jpg",
        "images/tapezier_dekorationsarbeiten/streichtechniken_adobe1.jpg"
      ],
      teaser:
        "Von der Vliestapete über Fototapeten bis zu Effektputzen: Wir gestalten Wände, die zu Ihrem Raum passen – und beraten Sie vorab zu Farben und Materialien direkt vor Ort.",
      intro:
        "Eine gestaltete Wand setzt einen Akzent, den ein einfacher Anstrich nicht erreicht. Ob ruhige Struktur, ein großflächiges Motiv oder ein lebendiger Effektputz – wir setzen Ihre Vorstellung um und beraten Sie vorab, welche Materialien zu Raum, Licht und Nutzung passen.",
      forWhom:
        "Für Wohnräume, Schlafzimmer, Kinderzimmer und Empfangsbereiche in Mannheim und Rhein-Neckar-Region – privat wie gewerblich.",
      sections: [
        {
          heading: "Vlies- und Strukturtapeten",
          text:
            "Vliestapeten sind robust, maßhaltig und lassen sich später trocken wieder abziehen. Strukturtapeten bringen Tiefe an die Wand. Wir beraten, welche Variante zum Raum und zur Beanspruchung passt."
        },
        {
          heading: "Fototapeten und individuelle Wandgestaltung",
          text:
            "Mit Digitaldruck-Tapeten gestalten wir ganze Wände – vom dezenten Muster bis zum großformatigen Motiv. Wir prüfen vorab den Untergrund, damit das Bild ohne Stöße und Blasen sitzt."
        },
        {
          heading: "Wandgestaltung mit Effektputzen",
          text:
            "Strukturputze, Stucco und Kalkputz erzeugen lebendige, hochwertige Oberflächen mit spürbarer Tiefe. Je nach Lichteinfall verändert sich die Wirkung über den Tag – ein Effekt, den keine Tapete nachbildet."
        },
        {
          heading: "Dekorative Maltechniken",
          text:
            "Auf Wunsch arbeiten wir mit Wisch- und Schabloniertechniken für individuelle Akzente. Sprechen Sie uns auf Ihre Idee an."
        }
      ],
      benefits: [
        "Beratung vor Ort zu Farben und Materialien, die zu Ihrem Raum passen",
        "Untergrund wird vorab geprüft – Voraussetzung für ein sauberes Tapetenbild",
        "Eignung je Raumtyp und Stil: wir ordnen Material und Wirkung konkret zu"
      ],
      steps: [
        { title: "Gestaltungsberatung", text: "Wir besprechen Stil, Farben und Materialien direkt im Raum." },
        { title: "Untergrundvorbereitung", text: "Wand prüfen, ausgleichen und grundieren für ein sauberes Ergebnis." },
        { title: "Ausführung", text: "Fachgerechtes Tapezieren oder Auftragen des Effektputzes, sauber abgesetzt." }
      ],
      cta: { text: "Jetzt Gestaltungsberatung anfragen", sub: "Oder kostenlosen Beratungstermin vereinbaren" }
    },

    {
      slug: "schimmelsanierung",
      file: "leistung-6.html",
      shortTitle: "Schimmelsanierung",
      title: "Schimmelsanierung",
      icon: "shield",
      image: "images/schimmelsanierung/schimmelbeseitigung_adobe1.jpg",
      gallery: [
        "images/schimmelsanierung/ursachenanalyse_adobe1.jpg",
        "images/schimmelsanierung/vorbeugende_maßnahmen_adobe1.jpg"
      ],
      teaser:
        "Schimmel nur zu überstreichen löst das Problem nicht. Wir finden die Ursache, entfernen den Befall fachgerecht und beschichten vorbeugend – schnell und sachlich.",
      intro:
        "Schimmel an Wand oder Decke ist unangenehm und sollte zügig behandelt werden. Entscheidend ist: Überstreichen allein hilft nicht – der Schimmel kommt zurück, solange die Ursache besteht. Wir suchen deshalb zuerst nach dem Auslöser, entfernen den Befall fachgerecht und schützen die Fläche anschließend vorbeugend. Bei kurzfristigem Bedarf erreichen Sie uns telefonisch unter " + company.phone + ".",
      forWhom:
        "Für Wohnungen und Häuser in Mannheim und Rhein-Neckar-Region, in denen sich Schimmel an Wänden, Decken oder in Raumecken zeigt – für Eigentümer, Mieter und Hausverwaltungen.",
      sections: [
        {
          heading: "Schimmel fachgerecht entfernen",
          text:
            "Wir entfernen befallene Bereiche fachgerecht statt sie nur zu überdecken und tragen anschließend eine antimikrobielle Beschichtung auf, die neuem Befall vorbeugt. Während der Arbeiten schützen wir angrenzende Flächen vor Sporenverbreitung."
        },
        {
          heading: "Ursachenanalyse",
          text:
            "Mit einer Feuchtigkeitsmessung grenzen wir ein, woher die Nässe kommt: ein Baumangel, eine Wärmebrücke oder das Lüftungsverhalten. Liegt eine bauliche Ursache vor, arbeiten wir mit den passenden Gewerken zusammen, damit das Problem an der Wurzel behoben wird."
        },
        {
          heading: "Vorbeugen statt wiederholen",
          text:
            "Diffusionsoffene Anstriche lassen die Wand atmen und erschweren erneuten Befall. Zusätzlich beraten wir Sie zum richtigen Lüften und Heizen – oft der einfachste Hebel, um dauerhaft schimmelfrei zu bleiben."
        }
      ],
      benefits: [
        "Ursache wird gesucht und behoben – nicht nur die Oberfläche behandelt",
        "Gesundheit sachlich im Blick: Schimmel kann die Atemwege belasten",
        "Schnelle Reaktion – wir wissen, dass Schimmel als dringend empfunden wird"
      ],
      steps: [
        { title: "Begutachtung & Ursachenanalyse", text: "Feuchtigkeitsmessung und Beurteilung, woher der Befall kommt." },
        { title: "Entfernung", text: "Fachgerechtes Entfernen des Schimmels und der betroffenen Schichten." },
        { title: "Vorbeugende Beschichtung", text: "Antimikrobielle, diffusionsoffene Beschichtung gegen erneuten Befall." },
        { title: "Beratung", text: "Konkrete Empfehlungen zu Lüften und Heizen für die Zukunft." }
      ],
      cta: { text: "Jetzt Schimmelsanierung anfragen", sub: "Oder kostenlose Schimmel-Begutachtung vereinbaren" }
    },

    {
      slug: "waermedaemmung-wdvs",
      file: "leistung-7.html",
      shortTitle: "Wärmedämmung (WDVS)",
      title: "Wärmedämmung (WDVS)",
      icon: "thermometer",
      image: "images/waermedaemmung/waermedämmverbundsystem_adobe1.jpg",
      gallery: [
        "images/waermedaemmung/innendämmsysteme_adobe1.jpg",
        "images/fassadenanstrich_fassadensanierung/waermedaemmverbundsystem_adobe2.jpg"
      ],
      teaser:
        "Eine gedämmte Fassade senkt den Wärmeverlust spürbar und macht das Wohnen behaglicher. Wir bringen das Wärmedämmverbundsystem an und unterstützen bei der Förderung.",
      intro:
        "Über eine ungedämmte Fassade geht viel Heizwärme verloren. Ein Wärmedämmverbundsystem (WDVS) reduziert diesen Verlust deutlich, senkt die Heizkosten und sorgt für angenehmere Wandtemperaturen im Innenraum. Wir bringen das System fachgerecht an und unterstützen Sie bei der Beantragung von Fördermitteln.",
      forWhom:
        "Für Eigentümer von Ein- und Mehrfamilienhäusern in Mannheim und Rhein-Neckar-Region, die ihre Fassade energetisch verbessern möchten – im Zuge einer Sanierung oder vor einem ohnehin geplanten Fassadenanstrich.",
      sections: [
        {
          heading: "Wärmedämmverbundsystem an der Fassade",
          text:
            "Beim WDVS werden Dämmplatten auf die Außenwand gesetzt, armiert, verputzt und beschichtet. Bei der Dämmstoffwahl beraten wir: Mineralwolle ist nicht brennbar und diffusionsoffen, Polystyrol (EPS) ist kostengünstiger. Der Aufbau folgt immer der Reihenfolge Dämmplatten → Armierung → Oberputz → Anstrich."
        },
        {
          heading: "Innendämmung bei Bestandsgebäuden",
          text:
            "Wenn eine Außendämmung nicht möglich ist – etwa bei denkmalgeschützten Fassaden – kann eine Innendämmung sinnvoll sein. Hier ist eine sorgfältige Fachplanung nötig, weil sonst Wärmebrücken und Feuchteprobleme entstehen können. Das klären wir vorab gemeinsam."
        }
      ],
      benefits: [
        "Spürbar weniger Wärmeverlust und angenehmere Wandtemperaturen",
        "Wir unterstützen bei der Förderung über BAFA und KfW",
        "Sinnvoll kombinierbar mit einem ohnehin anstehenden Fassadenanstrich"
      ],
      foerderung:
        "Für die Dämmung der Gebäudehülle gibt es Förderungen über BAFA und KfW (BEG-Einzelmaßnahmen). Wichtig: Der Antrag muss vor der Auftragsvergabe gestellt werden. Wir verweisen Sie an eine Energieberatung (Energie-Effizienz-Experte) und stellen die für den Antrag nötigen Angaben bereit.",
      steps: [
        { title: "Beratung", text: "Bestand aufnehmen, Dämmziel und Förderung besprechen." },
        { title: "Planung", text: "Dämmstoff und Aufbau festlegen, Förderantrag vor Auftragsvergabe anstoßen." },
        { title: "Dämmung & Putzarbeiten", text: "Dämmplatten anbringen, armieren und Oberputz auftragen." },
        { title: "Anstrich", text: "Abschließende, witterungsbeständige Fassadenbeschichtung." }
      ],
      cta: { text: "Jetzt Fassadendämmung anfragen", sub: "Oder Energieberatung für die Fassade vereinbaren" }
    },

    {
      slug: "gewerbe-grossprojekte",
      file: "leistung-8.html",
      shortTitle: "Gewerbe & Großprojekte",
      title: "Gewerbe- und Großprojekte",
      icon: "building",
      image: "images/gewerbe_grossprojekte/neubau_erstausstattung_adobe1.jpg",
      gallery: [
        "images/gewerbe_grossprojekte/buero_undpraxisrenovierung_adobe1.jpg",
        "images/gewerbe_grossprojekte/renovierung_fuer_hausverwaltung_adobe1.jpg"
      ],
      teaser:
        "Für Hausverwaltungen, Büros und Bauträger: termintreue, saubere Malerarbeiten – auch bei laufendem Betrieb, außerhalb der Geschäftszeiten und über mehrere Wohneinheiten hinweg.",
      intro:
        "Bei gewerblichen Projekten zählt vor allem eines: Verlässlichkeit beim Termin. Ob Treppenhaus im Mehrfamilienhaus, Büro während des laufenden Betriebs oder Erstausstattung mehrerer Wohnungen im Neubau – wir planen verbindlich, arbeiten sauber und dokumentieren die Abnahme nachvollziehbar.",
      forWhom:
        "Für Hausverwaltungen, Eigentümergemeinschaften, Büros und Praxen sowie Bauträger und Generalunternehmer in Mannheim und Rhein-Neckar-Region.",
      sections: [
        {
          heading: "Hausverwaltungen: Treppenhäuser & Mehrfamilienhäuser",
          text:
            "Wir koordinieren Termine mit mehreren Parteien und arbeiten zügig und sauber, auch während das Haus bewohnt bleibt. Zugänge und Treppen bleiben begehbar, Abdeckung und Reinigung gehören zum Standard."
        },
        {
          heading: "Büro- und Praxisrenovierung",
          text:
            "Damit Ihr Betrieb nicht stillsteht, arbeiten wir auf Wunsch außerhalb der Geschäftszeiten oder am Wochenende. Mit emissionsarmen Farben halten wir die Geruchsbelastung gering, sodass Räume schnell wieder nutzbar sind."
        },
        {
          heading: "Neubau-Erstausstattung",
          text:
            "Für Bauträger und Generalunternehmer übernehmen wir die Komplettmalerarbeiten mehrerer Wohneinheiten. Termintreue ist hier entscheidend, weil der gesamte Bauablauf darauf aufbaut – wir halten zugesagte Termine ein."
        }
      ],
      benefits: [
        "Termintreue als Kernversprechen – darauf bauen Ihre Abläufe auf",
        "Kapazität auch für größere Projekte mit mehreren Gewerken parallel",
        "Saubere Dokumentation und nachvollziehbare Abnahme als Standard"
      ],
      steps: [
        { title: "Aufnahme & Angebot", text: "Wir erfassen Umfang und Termine und erstellen ein belastbares Angebot." },
        { title: "Terminplanung", text: "Abstimmung mit Parteien, Mietern oder Bauablauf – verbindlich geplant." },
        { title: "Ausführung", text: "Saubere Arbeit, auch im laufenden Betrieb und außerhalb der Geschäftszeiten." },
        { title: "Abnahme & Dokumentation", text: "Gemeinsame Abnahme mit nachvollziehbarer Dokumentation." }
      ],
      cta: { text: "Jetzt Gewerbeprojekt anfragen", sub: "Oder Angebot für ein Großprojekt anfordern" }
    }
  ];

  /* ---------------------------------------------------------------------------
     4) Kundenstimmen – konkret und authentisch (kein generisches Lob).
     --------------------------------------------------------------------------- */
  const testimonials = [
    {
      text: "Die Wohnung war vor dem Einzug pünktlich frisch gestrichen, die Möbel sauber abgedeckt und am Ende war alles ordentlich geputzt. Genau so soll es laufen.",
      author: "Sabine Keller", role: "Privatkunde, Mannheim"
    },
    {
      text: "Unsere Fassade hatte Risse und Algen. Das Team hat erklärt, welche Farbe für unseren Altbau sinnvoll ist, und das Gerüst gleich mitorganisiert. Nach drei Jahren sieht alles noch top aus.",
      author: "Michael Brunner", role: "Eigenheimbesitzer, Rhein-Neckar-Region"
    },
    {
      text: "Als Hausverwaltung schätzen wir, dass Termine eingehalten werden. Die Treppenhäuser wurden ohne Beschwerden der Mieter renoviert – sauber und zügig.",
      author: "Andrea Walter", role: "Hausverwaltung, Mannheim"
    }
  ];

  /* ---------------------------------------------------------------------------
     5) FAQ – in Kundensprache, kurze und ehrliche Antworten.
     --------------------------------------------------------------------------- */
  const faq = [
    {
      q: "Wie lange dauert das Streichen einer 3-Zimmer-Wohnung?",
      a: "Eine leere 3-Zimmer-Wohnung streichen wir je nach Zustand der Wände meist in 2 bis 4 Arbeitstagen, inklusive Vorbereitung und Endreinigung. Bei umfangreicheren Spachtelarbeiten kann es länger dauern – wir nennen Ihnen den Zeitrahmen vorab im Angebot."
    },
    {
      q: "Was kostet ein Anstrich?",
      a: "Die Kosten hängen von Fläche, Untergrund und Aufwand der Vorbereitung ab. Deshalb besichtigen wir vorab kostenlos und erstellen ein verbindliches Festpreisangebot – ohne Überraschungen auf der Rechnung."
    },
    {
      q: "Muss ich die Möbel selbst ausräumen?",
      a: "Nicht zwingend. Kleinere Möbel rücken wir zusammen und decken sie sicher ab. Bei einer Komplettrenovierung ist ein möglichst leerer Raum von Vorteil – wir besprechen das beim Termin."
    },
    {
      q: "Riecht die Farbe stark und wie lange?",
      a: "Wir verwenden überwiegend emissions- und geruchsarme Farben. Der leichte Geruch verfliegt meist innerhalb eines Tages. Bei Büros und Praxen arbeiten wir auf Wunsch außerhalb der Öffnungszeiten."
    },
    {
      q: "Wie lange muss die Farbe trocknen, bis ich den Raum nutzen kann?",
      a: "Wandfarbe ist meist nach wenigen Stunden oberflächentrocken und am Folgetag voll nutzbar. Bei Bodenbeschichtungen gelten längere Zeiten: begehbar in der Regel nach etwa 24 Stunden, voll belastbar nach mehreren Tagen."
    },
    {
      q: "Bleibt am Ende alles sauber?",
      a: "Ja. Saubere Arbeit ist uns wichtig: Wir decken Möbel und Böden ab, schützen Türen mit Staubschutz und reinigen den Raum am Ende besenrein. Sie ziehen in einen sauberen Raum ein."
    },
    {
      q: "Welche Zahlungsarten bieten Sie an?",
      a: "Sie zahlen bequem per Überweisung nach Rechnungsstellung. Bei größeren Projekten vereinbaren wir gerne Teilzahlungen nach Baufortschritt. Details halten wir im Angebot fest."
    }
  ];

  /* ---------------------------------------------------------------------------
     6) Navigation – zentrale Menüstruktur für nav.js.
     --------------------------------------------------------------------------- */
  const nav = [
    { label: "Start", href: "index.html" },
    { label: "Leistungen", href: "leistungen.html" },
    { label: "Über uns", href: "index.html#ueber-uns" },
    { label: "Referenzen", href: "index.html#referenzen" },
    { label: "Karriere", href: "index.html#karriere" },
    { label: "Kontakt", href: "kontakt.html" }
  ];

  return {
    company: company,
    trust: trust,
    partners: partners,
    media: media,
    leistungen: leistungen,
    testimonials: testimonials,
    faq: faq,
    nav: nav
  };
});
