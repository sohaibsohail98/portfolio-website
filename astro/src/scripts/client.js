const root = document.documentElement;
const tt = document.getElementById('tt');
tt?.addEventListener('click', () => {
  const dark = root.dataset.theme === 'dark';
  root.dataset.theme = dark ? 'light' : 'dark';
  tt.textContent = dark ? '\u25D1' : '\u25D0';
});
const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const closeSb = () => { sidebar?.classList.remove('open'); burger?.setAttribute('aria-expanded', 'false'); };
burger?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
sidebar?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSb));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSb(); });
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '-30px 0px -60px' });
  revealEls.forEach(el => io.observe(el));
  // Safety net: tools that load the page without scrolling (Lighthouse's
  // single-shot audit, some crawlers) would otherwise see later sections
  // stuck at opacity:0 forever. A normal scrolling visitor sees the reveal
  // animation well before this fires.
  window.addEventListener('load', () => {
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 2500);
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}
document.querySelectorAll('[data-acc]').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    btn.nextElementSibling?.classList.toggle('open', !open);
  });
});
