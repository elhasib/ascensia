/* ASCENSIA — PIXEL TRAIL BACKGROUND
   Vanilla JS. No dependencies.
   Cream/warm pixel squares that appear under the cursor
   on the page background (behind the sheet), then fade.
   Playful, not distracting — opacity kept low.
*/
(function () {
  const PIXEL   = 44;        // px per square — increase this number for larger pixels
  const FADE_MS = 900;       // fade duration
  const OPACITY = 0.55;      // peak opacity of each square
  // warm cream palette — rotate through these
  const COLORS  = [
    'rgba(201,164,74,X)',   // gold
    'rgba(237,220,190,X)',  // light cream
    'rgba(210,185,150,X)',  // warm tan
    'rgba(160,98,74,X)',    // rose
    'rgba(220,200,170,X)',  // parchment
  ];

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '1',
    opacity: '1',
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // active pixels: { gx, gy, color, born }
  const pixels = new Map(); // key = "gx,gy"
  let colorIdx = 0;

  document.addEventListener('mousemove', e => {
    const gx = Math.floor(e.clientX / PIXEL);
    const gy = Math.floor(e.clientY / PIXEL);
    const key = `${gx},${gy}`;
    if (!pixels.has(key)) {
      colorIdx = (colorIdx + 1) % COLORS.length;
      pixels.set(key, {
        gx, gy,
        color: COLORS[colorIdx],
        born: performance.now(),
      });
    }
  }, { passive: true });

  function frame(now) {
    ctx.clearRect(0, 0, W, H);
    for (const [key, p] of pixels) {
      const age = now - p.born;
      if (age >= FADE_MS) { pixels.delete(key); continue; }
      const t = age / FADE_MS;
      // ease: quick appear, slow fade
      const a = OPACITY * (t < 0.12 ? t / 0.12 : 1 - Math.pow((t - 0.12) / 0.88, 0.6));
      ctx.fillStyle = p.color.replace('X', a.toFixed(3));
      ctx.fillRect(p.gx * PIXEL, p.gy * PIXEL, PIXEL - 2, PIXEL - 2);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // touch support — gentle
  document.addEventListener('touchmove', e => {
    const t = e.touches[0];
    const gx = Math.floor(t.clientX / PIXEL);
    const gy = Math.floor(t.clientY / PIXEL);
    const key = `${gx},${gy}`;
    if (!pixels.has(key)) {
      pixels.set(key, { gx, gy, color: COLORS[0], born: performance.now() });
    }
  }, { passive: true });
})();