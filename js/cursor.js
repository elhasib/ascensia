/* ═══════════════════════════════════════
   ASCENSIA — CURSOR
   Reactive multi-state custom cursor
═══════════════════════════════════════ */

(function() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let raf;

  // Track real mouse
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Lag ring behind with lerp
  function animRing() {
    const speed = 0.11;
    rx += (mx - rx) * speed;
    ry += (my - ry) * speed;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animRing);
  }
  animRing();

  // ─── Reactive state by element type ───
  function setCursorState(state) {
    document.body.dataset.cursor = state || '';
  }

  // Links and buttons → hover state
  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t.closest('a, button, .btn, .univ-tag, .track-card')) {
      setCursorState('hover');
    } else if (t.closest('.mcard, .team-card, .stat-row')) {
      setCursorState('card');
    } else if (t.closest('p, h1, h2, h3, h4, blockquote')) {
      setCursorState('text');
    } else {
      setCursorState('');
    }
  });

  document.addEventListener('mouseleave', () => setCursorState(''));

  // Click pulse
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(0.6)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // ─── Magnetic effect on buttons ───
  document.querySelectorAll('.btn, .nav-cta, .btn-gold').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ─── Spotlight effect on team cards ───
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%, 
          rgba(212,168,83,0.06) 0%, 
          #120F0D 60%)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ─── 3D tilt on mentor cards ───
  document.querySelectorAll('.mcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        `rotate(0deg) translateY(-14px) rotateX(${-y*9}deg) rotateY(${x*9}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── Stat row text parallax on cursor hover ───
  document.querySelectorAll('.stat-row').forEach(row => {
    row.addEventListener('mousemove', e => {
      const r = row.getBoundingClientRect();
      const progress = (e.clientX - r.left) / r.width;
      const num = row.querySelector('.stat-number');
      if (num) {
        num.style.letterSpacing = (-0.04 + progress * 0.02) + 'em';
      }
    });
    row.addEventListener('mouseleave', () => {
      const num = row.querySelector('.stat-number');
      if (num) num.style.letterSpacing = '';
    });
  });

})();
