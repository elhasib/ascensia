/* ═══════════════════════════════════════
   ASCENSIA — SCROLL
   Reveal, count-up, timeline progress,
   parallax, drag-scroll
═══════════════════════════════════════ */

(function() {

  /* ─── REVEAL ON SCROLL ─── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });
    reveals.forEach(el => ro.observe(el));
  }

  /* ─── COUNT-UP NUMBERS ─── */
  function countUp(el) {
    const target  = +el.dataset.target;
    const dur     = 1800;
    const start   = performance.now();
    const suffix  = el.dataset.suffix || '';
    (function frame(now) {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);   // ease-out-quart
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    })(start);
  }

  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(countUp);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('.stat-row, .count-trigger').forEach(el => countObs.observe(el));

  /* ─── TIMELINE SCROLL PROGRESS ─── */
  const tlContainer = document.querySelector('.timeline-container');
  const tlProgress  = document.querySelector('.timeline-progress');
  const tlItems     = document.querySelectorAll('.timeline-item');

  if (tlContainer && tlProgress) {
    function updateTimeline() {
      const rect = tlContainer.getBoundingClientRect();
      const winH = window.innerHeight;
      const totalH = rect.height;

      // How far we've scrolled through the container
      const scrolled = Math.max(0, winH * 0.6 - rect.top);
      const progress = Math.min(scrolled / totalH, 1);

      tlProgress.style.height = (progress * totalH) + 'px';

      // Activate items
      tlItems.forEach(item => {
        const ir = item.getBoundingClientRect();
        item.classList.toggle('active', ir.top < winH * 0.65);
      });
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();
  }

  /* ─── DRAG SCROLL — track cards ─── */
  document.querySelectorAll('.tracks-scroll').forEach(el => {
    let isDown = false, startX, scrollLeft;

    el.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    });
    el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = ''; });
    el.addEventListener('mouseup',    () => { isDown = false; el.style.cursor = ''; });
    el.addEventListener('mousemove',  e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.3;
    });
  });

  /* ─── PARALLAX ─── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  if (parallaxEls.length) {
    function updateParallax() {
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect  = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
    }
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  /* ─── HERO SCULPTURE PARALLAX ─── */
  const sculpture = document.querySelector('.hero-sculpture');
  if (sculpture) {
    window.addEventListener('scroll', () => {
      sculpture.style.transform =
        `translateY(calc(-50% + ${scrollY * 0.12}px))`;
    }, { passive: true });
  }

  /* ─── NAV SCROLL ─── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', scrollY > 60);
    }, { passive: true });
  }

  /* ─── ACTIVE NAV LINKS ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href]');

  if (sections.length && navLinks.length) {
    const sectionObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href').includes(id));
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObs.observe(s));
  }

  /* ─── MOBILE NAV ─── */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

})();
