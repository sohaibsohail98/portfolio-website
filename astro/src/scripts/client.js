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
  // Sections can be much taller than the viewport (a big card grid, a long
  // role list). The old rootMargin only started revealing a section once it
  // had already scrolled into view, so on a fast flick-scroll you could land
  // mid-section before the fade-in fired, seeing a blank viewport where
  // content should be. Expanding the bottom margin means a section flips to
  // .in while it is still below the fold, so it is already visible by the
  // time it's scrolled to.
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px 600px 0px', threshold: 0 });
  revealEls.forEach(el => io.observe(el));
  // Safety net: tools that load the page without scrolling (Lighthouse's
  // single-shot audit, some crawlers) would otherwise see later sections
  // stuck at opacity:0 forever. A normal scrolling visitor sees the reveal
  // animation well before this fires.
  window.addEventListener('load', () => {
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 1200);
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

// Card rails: prev/next buttons and the progress hairline are progressive
// enhancement over the native CSS scroll-snap, matched to a rail by id.
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
document.querySelectorAll('[data-rail]').forEach(rail => {
  const id = rail.dataset.rail;
  const step = () => rail.clientWidth * 0.86;
  const scrollTo = dir => rail.scrollBy({ left: dir * step(), behavior: reducedMotion ? 'auto' : 'smooth' });
  document.querySelector(`[data-rail-prev="${id}"]`)?.addEventListener('click', () => scrollTo(-1));
  document.querySelector(`[data-rail-next="${id}"]`)?.addEventListener('click', () => scrollTo(1));
  const fill = document.querySelector(`[data-rail-progress="${id}"]`);
  const count = document.querySelector(`[data-rail-count="${id}"]`);
  if (!fill && !count) return;
  const items = rail.children;
  const updateProgress = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    if (fill) fill.style.width = max > 0 ? `${(rail.scrollLeft / max) * 100}%` : '100%';
    if (count && items.length) {
      // Position of the snapped card: distance scrolled over one card pitch
      // (card width + gap), clamped so the last card reads as n/n.
      const first = items[0];
      const pitch = first.offsetWidth + (items[1] ? items[1].offsetLeft - first.offsetLeft - first.offsetWidth : 0);
      const idx = Math.min(items.length, Math.round(rail.scrollLeft / Math.max(pitch, 1)) + 1);
      count.textContent = `${idx} / ${items.length}`;
    }
  };
  window.addEventListener('resize', updateProgress, { passive: true });
  rail.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

// Case study cards open a native <dialog> with the full write-up. Backdrop
// click and the close button both dismiss it; Esc and focus-trapping are
// handled by the browser for free.
document.querySelectorAll('[data-open-dialog]').forEach(btn => {
  btn.addEventListener('click', () => document.getElementById(btn.dataset.openDialog)?.showModal());
});
document.querySelectorAll('dialog.case-dialog').forEach(dlg => {
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('[data-close-dialog]')?.addEventListener('click', () => dlg.close());
});
