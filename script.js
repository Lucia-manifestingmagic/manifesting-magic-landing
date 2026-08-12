/* Manifesting Magic — three behaviours: pricing toggle, scroll reveal,
   sticky mobile CTA. The nav's scrolled state rides on the same hero
   observer the sticky CTA already needs, so it costs nothing extra. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;

  /* --- Pricing toggle --- */
  var toggle = document.querySelector('.toggle');
  var prices = document.querySelectorAll('.price');

  if (toggle) {
    toggle.addEventListener('click', function (event) {
      var button = event.target.closest('.toggle__btn');
      if (!button) return;

      var market = button.getAttribute('data-market');
      toggle.classList.toggle('is-both', market === 'both');

      toggle.querySelectorAll('.toggle__btn').forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });

      prices.forEach(function (price) {
        var next = price.getAttribute(market === 'both' ? 'data-both' : 'data-en');
        if (price.textContent === next) return;
        if (reduced) { price.textContent = next; return; }
        price.classList.add('is-swapping');
        window.setTimeout(function () {
          price.textContent = next;
          price.classList.remove('is-swapping');
        }, 150);
      });
    });
  }

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
