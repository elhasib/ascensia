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
      '17 curriculum tracks',
      'Africa · South Asia · Latin America · Middle East',
      'Free to every student',
      'Cohort 2025 now open',
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
          <p class="footer-brand-tagline">"Talent is everywhere. Opportunity isn't. Yet."</p>
        </div>
        <div>
          <p class="footer-col-title">Program</p>
          <ul class="footer-links">
            <li><a href="program.html">How it works</a></li>
            <li><a href="program.html#curriculum">Curriculum</a></li>
            <li><a href="program.html#mentors">Mentor network</a></li>
            <li><a href="program.html#timeline">Timeline</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Organization</p>
          <ul class="footer-links">
            <li><a href="about.html">About Ascensia</a></li>
            <li><a href="about.html#team">Our team</a></li>
            <li><a href="partners.html">For partners</a></li>
            <li><a href="about.html#story">Our story</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Connect</p>
          <ul class="footer-links">
            <li><a href="apply.html">Apply — Cohort 2025</a></li>
            <li><a href="apply.html#mentors">Become a mentor</a></li>
            <li><a href="partners.html#contact">Partner with us</a></li>
            <li><a href="mailto:hello@ascensia.org">hello@ascensia.org</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2025 Ascensia · Global Admissions Preparation Program · All rights reserved</p>
        <div class="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Brand</a>
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
