/* Manifesting Magic — three behaviours: the application form, scroll reveal,
   and the sticky mobile CTA. The nav's scrolled state rides on the same hero
   observer the sticky CTA already needs, so it costs nothing extra.
   (The pricing toggle was removed with the published prices; recover it from
   the v-with-pricing tag if prices ever go back on the page.) */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;

  /* --- Application form ---
     Field validation is native, so it still works with JS off. This only
     handles the submit: post it, then swap the form for the confirmation
     without losing the page. */
  var form = document.getElementById('apply');
  var done = document.getElementById('form-done');
  var formError = document.getElementById('form-error');
  var PLACEHOLDER = '#form-endpoint';

  function fail(message) {
    formError.textContent = message;
    formError.hidden = false;
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) return;      // let the browser report it
      event.preventDefault();
      formError.hidden = true;

      var action = form.getAttribute('action');
      if (!action || action.indexOf(PLACEHOLDER) !== -1) {
        fail('This form is not connected yet. Set the form action in index.html to your form handler.');
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error(response.status);
        form.hidden = true;
        done.hidden = false;
        done.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      }).catch(function () {
        button.disabled = false;
        fail('That did not send. Please try again, or email us directly.');
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
