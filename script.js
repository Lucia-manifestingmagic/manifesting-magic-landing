/* Manifesting Magic — two behaviours: scroll reveal and the sticky mobile
   CTA. The nav's scrolled state rides on the same hero observer the sticky
   CTA already needs, so it costs nothing extra.
   (The pricing toggle was removed with the published prices; recover it from
   the v-with-pricing tag if prices ever go back on the page.) */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;

  /* --- Scroll reveal --- */
  var items = document.querySelectorAll('.reveal');

  if (reduced || !supported) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      var shown = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        window.setTimeout(function () { el.classList.add('is-in'); }, shown * 60);
        shown += 1;
        revealer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    items.forEach(function (el) { revealer.observe(el); });
  }

  /* --- Sticky mobile CTA + nav state --- */
  var sticky = document.getElementById('stickyCta');
  var nav = document.getElementById('nav');
  var hero = document.getElementById('top');
  var close = document.getElementById('book');

  function setSticky(visible) {
    if (!sticky) return;
    sticky.classList.toggle('is-visible', visible);
    sticky.setAttribute('aria-hidden', String(!visible));
    var link = sticky.querySelector('a');
    if (link) link.tabIndex = visible ? 0 : -1;
  }

  if (supported && hero && close) {
    var pastHero = false;
    var atClose = false;

    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      if (nav) nav.classList.toggle('is-stuck', pastHero);
      setSticky(pastHero && !atClose);
    }, { threshold: 0 }).observe(hero);

    new IntersectionObserver(function (entries) {
      atClose = entries[0].isIntersecting;
      setSticky(pastHero && !atClose);
    }, { threshold: 0 }).observe(close);
  }
})();
