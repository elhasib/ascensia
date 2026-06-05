/* ═══════════════════════════════════════
   ASCENSIA — MAIN JS
═══════════════════════════════════════ */

(function() {

  /* ─── FOOTER BUILD ─── */
  const footer = document.getElementById('main-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-top">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <div class="logo-mark static">
              <span></span><span></span><span></span><span></span><span></span>
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
            <li><a href="program.html#timeline">Timeline</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Organization</p>
          <ul class="footer-links">
            <li><a href="about.html">About Ascensia</a></li>
            <li><a href="about.html#team">The team</a></li>
            <li><a href="about.html#story">Our story</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Connect</p>
          <ul class="footer-links">
            <li><a href="mailto:team@ascensia.foundation">team@ascensia.foundation</a></li>
            <li><a href="mailto:team@ascensia.foundation">Contact us</a></li>
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
