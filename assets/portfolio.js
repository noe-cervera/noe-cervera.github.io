/* ============================================
   PORTFOLIO — Shared JS
   - Mobile burger menu (auto-injected)
   - Scroll reveal
   ============================================ */
(function () {
  const NAV_ITEMS = [
    { href: 'index.html', label: 'Home' },
    { href: 'alternance.html', label: 'Alternance' },
    { href: 'projets.html', label: 'Projets' },
    { href: 'apropos.html', label: 'À propos' },
    { href: 'contact.html', label: 'Contact' }
  ];

  function currentPage() {
    const path = location.pathname.split('/').pop() || 'index.html';
    return path || 'index.html';
  }

  function buildMobileMenu() {
    const topbar = document.querySelector('.topbar .topbar-inner');
    if (!topbar) return;
    const nav = topbar.querySelector('.topbar-nav');
    if (!nav) return;

    // Burger button
    const burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'topbar-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.textContent = 'Menu';
    nav.parentNode.insertBefore(burger, nav.nextSibling);

    // Mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-hidden', 'true');
    const here = currentPage();
    overlay.innerHTML = `
      <div class="mobile-menu-top">
        <span>Menu</span>
        <button type="button" class="topbar-burger" aria-label="Fermer" data-close>Fermer</button>
      </div>
      <nav>
        ${NAV_ITEMS.map(i => `
          <a href="${i.href}"${i.href === here ? ' class="is-active"' : ''}>
            <span>${i.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="mobile-menu-foot">
        <a href="mailto:cervera.noe@gmail.com">cervera.noe@gmail.com</a>
        <a href="https://github.com/noe-cervera" target="_blank" rel="noopener">github.com/noe-cervera ↗</a>
        <a href="assets/cv.pdf" target="_blank" rel="noopener">cv.pdf ↗</a>
        <span style="color: var(--ok); display: inline-flex; align-items: center; gap: 7px;">
          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 3px rgba(45,138,71,.18);"></span>
          Disponible · Paris, FR
        </span>
      </div>
    `;
    document.body.appendChild(overlay);

    function open() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', open);
    overlay.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || e.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  }

  function scrollReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: .06, rootMargin: '0px 0px -40px' });
    document.querySelectorAll('.section, .hero, .cta, .marquee, .page-header').forEach(el => {
      el.classList.add('fade-up');
      io.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildMobileMenu();
    scrollReveal();
  });
})();
