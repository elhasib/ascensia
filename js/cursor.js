/* ═══════════════════════════════════════
   ASCENSIA — CURSOR
═══════════════════════════════════════ */

(function() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  function setCursorState(state) {
    document.body.dataset.cursor = state || '';
  }

  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t.closest('a, button, .btn, .univ-tag, .track-card')) {
      setCursorState('hover');
    } else if (t.closest('.mcard, .tcard, .stat-row')) {
      setCursorState('card');
    } else {
      setCursorState('');
    }
  });

  document.addEventListener('mouseleave', () => setCursorState(''));

  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(0.65)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // ─── Spotlight on team/tcard ───
  document.querySelectorAll('.tcard, .team-featured').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      card.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(212,168,83,0.07) 0%, #120F0D 65%)`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });

  // ─── 3D tilt on mentor cards ───
  document.querySelectorAll('.mcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        `rotate(0deg) translateY(-12px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

})();
