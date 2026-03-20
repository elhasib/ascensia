/* ═══════════════════════════════════════
   ASCENSIA — MAIN JS
   Marquee build, shared utilities
═══════════════════════════════════════ */

(function() {

  /* ─── MARQUEE ─── */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = [
      'Harvard · MIT · Yale · Princeton',
      'Need-blind financial aid',
      'Global admissions preparation',
      '9 curriculum tracks',
      'Africa · South Asia · Latin America · Middle East',
      'Free to every student',
      'Cohort 2026 now open',
      'The world\'s most talented students',
    ];
    const doubled = [...items, ...items];
    doubled.forEach(text => {
      const el = document.createElement('span');
      el.className = 'marquee-item';
      el.innerHTML = `${text}<span class="marquee-dot"></span>`;
      marqueeTrack.appendChild(el);
    });
  }

  /* ─── FOOTER BUILD (shared across all pages) ─── */
  const footer = document.getElementById('main-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-top">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <div class="logo-mark static">
              <span style="background:var(--gold)"></span>
              <span style="background:var(--gold)"></span>
              <span style="background:var(--gold)"></span>
              <span style="background:var(--gold)"></span>
              <span style="background:var(--gold)"></span>
            </div>
            <span class="logo-wordmark">Ascensia</span>
          </div>
          <p class="footer-brand-tagline">Democratizing Global Admissions</p>
        </div>
        <div>
          <p class="footer-col-title">Program</p>
          <ul class="footer-links">
            <li><a href="program.html">How it works</a></li>
            <li><a href="program.html#curriculum">Curriculum</a></li>
            <li><a href="program.html#mentors">Mentorship</a></li>
            <li><a href="program.html#roadmap">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Organization</p>
          <ul class="footer-links">
            <li><a href="about.html">About Ascensia</a></li>
            <li><a href="about.html#team">The team</a></li>
            <li><a href="about.html">About Ascensia</a></li>
            <li><a href="about.html#story">Our story</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Connect</p>
          <ul class="footer-links">
            <li><a href="mailto:team@ascensia.foundation">team@ascensia.foundation</a></li>
            <li><a href="mailto:team@ascensia.foundation">Contact us</a></li>
            <li><a href="apply.html">Program status</a></li>
            <li><a href="https://ascensia.foundation">ascensia.foundation</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 Ascensia &middot; Nonprofit Global Admissions Preparation &middot; All rights reserved</p>
        <div class="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    `;
  }

  /* ─── NAV BUILD (shared) ─── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    // Mark current page
    const current = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && (href === current || (current === '' && href === 'index.html'))) {
        a.classList.add('active');
      }
    });
  }

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
