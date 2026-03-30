/* ============================================
   LION AND SUN FOUNDATION — Global Script
   Apple-grade mobile interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ─────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-menu-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Navbar scroll effect ─────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ──────────────────────────────
  const toggle   = document.querySelector('.navbar-toggle');
  const menu     = document.querySelector('.mobile-menu');
  const overlay  = document.querySelector('.mobile-menu-overlay');
  let   menuOpen = false;

  function openMenu() {
    menuOpen = true;
    toggle?.classList.add('open');
    menu?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggle?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuOpen = false;
    toggle?.classList.remove('open');
    menu?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    toggle?.setAttribute('aria-expanded', 'false');
  }

  toggle?.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  overlay?.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // ── Scroll reveal ────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ── Contact form ─────────────────────────────
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Thank you for your message. We will be in touch shortly.');
      form.reset();
    });
  }

  // ── Toast notification ───────────────────────
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  // ── Smooth anchor scroll (in-page links) ─────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
