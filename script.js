// Thème clair/sombre (suit le thème du système à la première visite)
(function () {
  var root = document.documentElement, btn = document.getElementById('themeToggle');
  if (!btn) return;
  function apply(t) {
    root.dataset.theme = t;
    var next = t === 'dark' ? 'clair' : 'sombre';
    btn.dataset.tip = 'Thème ' + next;
    btn.setAttribute('aria-label', 'Passer au thème ' + next);
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  apply(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  btn.addEventListener('click', function () {
    var t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });
})();
 
// Barre de navigation : affiche la section en cours, masque son lien
(function () {
  var title = document.getElementById('section-title');
  var links = document.querySelectorAll('nav ul a');
  var current = '';
  if (!title || !('IntersectionObserver' in window)) return;
  function show(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.parentElement.hidden = on;
      if (on) {
        title.classList.add('out');
        setTimeout(function () { title.textContent = a.textContent; title.classList.remove('out'); }, 150);
      }
    });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) show(e.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { io.observe(s); });
  show('presentation');
})();
 
// Bouton « Afficher mon numéro » : 1er clic affiche, 2e clic appelle
(function () {
  var btn = document.getElementById('phoneBtn');
  if (!btn) return;
  var parts = ['+33', '6', '75', '33', '01', '90'], shown = false;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!shown) {
      btn.textContent = '+33 6 75 33 01 90';
      btn.setAttribute('aria-label', 'Appeler le ' + btn.textContent);
      shown = true;
    } else {
      location.href = 'tel:' + parts.join('');
    }
  });
})();
 
// Captures d'écran : clic = plein écran (clic, croix ou Échap pour fermer)
(function () {
  var imgs = document.querySelectorAll('.screenshots img');
  if (!imgs.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" aria-label="Fermer">&times;</button><img alt="">';
  document.body.appendChild(box);
  var big = box.querySelector('img');
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
  imgs.forEach(function (img) {
    img.addEventListener('click', function () {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
