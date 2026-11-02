// Barre de navigation interactive : affiche le nom de la section en cours
(function () {
  var title = document.getElementById("section-title");
  var links = document.querySelectorAll("nav ul a");
  var sections = document.querySelectorAll("section[id]");
  var current = "";

  function show(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.parentElement.hidden = on; // le lien de la section en cours disparaît
      if (on) {
        title.classList.add("out");
        setTimeout(function () {
          title.textContent = a.textContent;
          title.classList.remove("out");
        }, 150);
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) show(e.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
  show("presentation");
})();

// Thème clair / sombre, mémorisé d'une visite à l'autre
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var icon = btn ? btn.querySelector(".theme-icon") : null;
  var theme = localStorage.getItem("theme") || "light";

  function apply(t) {
    if (t === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (btn) {
      btn.setAttribute("aria-pressed", String(t === "dark"));
      btn.setAttribute("aria-label", t === "dark" ? "Revenir au thème clair" : "Activer le thème sombre");
    }
    if (icon) icon.textContent = t === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", t);
  }

  apply(theme);

  if (btn) {
    btn.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      apply(theme);
    });
  }
})();

// Projets : révéler les captures d'écran au tap, sur les écrans tactiles
// (sur un écran avec souris, le survol en CSS s'en charge déjà)
(function () {
  var projects = document.querySelectorAll(".project");
  if (!projects.length) return;

  var hasHover = window.matchMedia("(hover: hover)").matches;
  if (hasHover) return;

  projects.forEach(function (p) {
    p.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; // laisse les liens fonctionner normalement
      var wasActive = p.classList.contains("active");
      projects.forEach(function (other) { other.classList.remove("active"); });
      if (!wasActive) p.classList.add("active");
    });
  });
})();

const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section.tone-a, section.tone-b');

function updateNavTone() {
  const y = nav.offsetHeight / 2;
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) {
      nav.classList.toggle('tone-a', s.classList.contains('tone-a'));
      nav.classList.toggle('tone-b', s.classList.contains('tone-b'));
      break;
    }
  }
}

addEventListener('scroll', updateNavTone, { passive: true });
addEventListener('resize', updateNavTone);
updateNavTone();

const root = document.documentElement;
const btn = document.getElementById('themeToggle');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const next = theme === 'dark' ? 'clair' : 'sombre';
  btn.dataset.tip = `Thème ${next}`;
  btn.setAttribute('aria-label', `Passer au thème ${next}`);
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
applyTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

btn.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

// Projets : cliquer sur une carte l'agrandit et réduit les autres sur le côté
(function () {
  var container = document.querySelector('.projects');
  var projects = document.querySelectorAll('.project');
  if (!container || !projects.length) return;

  function collapse() {
    projects.forEach(function (p) { p.classList.remove('active'); });
    container.classList.remove('has-active');
  }

  projects.forEach(function (p) {
    p.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // laisse les liens fonctionner normalement
      var wasActive = p.classList.contains('active');
      collapse();
      if (!wasActive) {
        p.classList.add('active');
        container.classList.add('has-active');
      }
    });
  });

  // Clic en dehors des cartes : revient à l'affichage normal
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.project')) collapse();
  });
})();

// Bouton "Afficher mon numéro" : 1er clic = affiche le numéro, 2e clic = lance l'appel (mobile)
(function () {
  var btn = document.getElementById('phoneBtn');
  if (!btn) return;
    var intl = ['+33', '6', '75', '33', '01', '90'];
    var shown = false;
    btn.addEventListener('click', function () {
      if (!shown) {
        btn.textContent = '+33 6 75 33 01 90';
        btn.setAttribute('aria-label', 'Appeler le ' + btn.textContent);
        shown = true;
      } else {
        window.location.href = 'tel:' + intl.join('');
      }
    });
  })();
