/* ═══════════════════════════════════════
   ASCENSIA — WORLD MAP
   Interactive student origin map
═══════════════════════════════════════ */

(function() {
  const container = document.getElementById('world-map');
  if (!container) return;

  // Pin data: [label, left%, top%, type, detail]
  // type: 'student' = where students come from | 'university' = destination schools
  const pins = [
    // Student origin regions
    { label: 'Nigeria',        left: 49.5,  top: 57,   type: 'student',    detail: 'West Africa' },
    { label: 'Ghana',          left: 47.8,  top: 57.5, type: 'student',    detail: 'West Africa' },
    { label: 'Kenya',          left: 54.5,  top: 59,   type: 'student',    detail: 'East Africa' },
    { label: 'South Africa',   left: 52,    top: 71,   type: 'student',    detail: 'Southern Africa' },
    { label: 'Egypt',          left: 52.5,  top: 48,   type: 'student',    detail: 'North Africa' },
    { label: 'Ethiopia',       left: 54.5,  top: 55,   type: 'student',    detail: 'East Africa' },
    { label: 'Pakistan',       left: 63.5,  top: 46,   type: 'student',    detail: 'South Asia' },
    { label: 'India',          left: 66,    top: 50,   type: 'student',    detail: 'South Asia' },
    { label: 'Bangladesh',     left: 68,    top: 50,   type: 'student',    detail: 'South Asia' },
    { label: 'Brazil',         left: 33,    top: 65,   type: 'student',    detail: 'Latin America' },
    { label: 'Colombia',       left: 27,    top: 58,   type: 'student',    detail: 'Latin America' },
    { label: 'Mexico',         left: 21,    top: 50,   type: 'student',    detail: 'Latin America' },
    { label: 'Jordan',         left: 54,    top: 46,   type: 'student',    detail: 'Middle East' },
    { label: 'Lebanon',        left: 54.2,  top: 44.5, type: 'student',    detail: 'Middle East' },
    // Need-blind universities
    { label: 'Harvard',        left: 19.5,  top: 37,   type: 'university', detail: 'Need-blind · Cambridge, MA' },
    { label: 'MIT',            left: 19.6,  top: 38,   type: 'university', detail: 'Need-blind · Cambridge, MA' },
    { label: 'Yale',           left: 20,    top: 38.5, type: 'university', detail: 'Need-blind · New Haven, CT' },
    { label: 'Princeton',      left: 20.2,  top: 39,   type: 'university', detail: 'Need-blind · Princeton, NJ' },
    { label: 'Amherst',        left: 19.8,  top: 37.5, type: 'university', detail: 'Need-blind · Amherst, MA' },
    { label: 'Dartmouth',      left: 19.7,  top: 36.5, type: 'university', detail: 'Need-blind · Hanover, NH' },
    { label: 'Bowdoin',        left: 19.4,  top: 36,   type: 'university', detail: 'Need-blind · Brunswick, ME' },
    { label: 'Brown',          left: 20.1,  top: 38.2, type: 'university', detail: 'Need-blind · Providence, RI' },
  ];

  // Build pins
  pins.forEach((p, i) => {
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.style.left = p.left + '%';
    pin.style.top  = p.top  + '%';
    pin.setAttribute('data-type', p.type);

    const isUniv = p.type === 'university';
    const color  = isUniv ? 'var(--gold)' : 'var(--rose)';
    const size   = isUniv ? '10px' : '7px';

    pin.innerHTML = `
      <div class="map-pin-dot" style="
        width:${size}; height:${size};
        background:${color};
        box-shadow: 0 0 0 2px rgba(${isUniv?'212,168,83':'196,164,145'},.15);
      "></div>
      <div class="map-pin-ring" style="
        width:${size}; height:${size};
        border-color:${color};
        animation-delay:${(i % 4) * 0.6}s;
      "></div>
      <div class="map-pin-ring delay1" style="
        width:${size}; height:${size};
        border-color:${color};
        animation-delay:${(i % 4) * 0.6 + 0.8}s;
      "></div>
      <div class="map-pin-label">${p.label}<br><span style="color:${isUniv?'var(--gold)':'var(--rose)'};font-size:9px">${p.detail}</span></div>
    `;
    container.appendChild(pin);
  });

  // Draw arc lines from student pins to university cluster
  // Uses SVG overlay
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = `
    position:absolute;inset:0;width:100%;height:100%;
    pointer-events:none;overflow:visible;
  `;
  container.appendChild(svg);

  // Harvard cluster center (approx %)
  const destX = 20, destY = 38;

  // Student pins only
  const studentPins = pins.filter(p => p.type === 'student');

  let arcVisible = false;

  // Draw on hover of any student pin
  function drawArcs(show) {
    svg.innerHTML = '';
    if (!show) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;

    studentPins.forEach((p, i) => {
      const x1 = (p.left  / 100) * w;
      const y1 = (p.top   / 100) * h;
      const x2 = (destX   / 100) * w;
      const y2 = (destY   / 100) * h;

      // Control point: arc upward
      const cpx = (x1 + x2) / 2;
      const cpy = Math.min(y1, y2) - 80 - Math.random() * 40;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(212,168,83,0.2)');
      path.setAttribute('stroke-width', '0.8');
      path.setAttribute('stroke-dasharray', '4 4');

      const len = path.getTotalLength ? path.getTotalLength() : 400;
      path.style.strokeDashoffset = len;
      path.style.strokeDasharray  = len;
      path.style.transition = `stroke-dashoffset 1.2s ${i * 0.06}s ease`;
      svg.appendChild(path);

      // Trigger animation next frame
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = 0;
      });
    });
  }

  // Toggle arcs on map hover
  container.addEventListener('mouseenter', () => {
    arcVisible = true;
    drawArcs(true);
  });
  container.addEventListener('mouseleave', () => {
    arcVisible = false;
    drawArcs(false);
  });

  // Legend
  const legend = document.createElement('div');
  legend.style.cssText = `
    position:absolute; bottom:16px; left:16px;
    display:flex; gap:20px; align-items:center;
    background:rgba(30,23,20,0.85);
    border:0.5px solid rgba(196,164,145,0.15);
    padding:10px 16px; border-radius:1px;
    font-family:var(--sans);
  `;
  legend.innerHTML = `
    <span style="display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,240,235,.5)">
      <span style="width:8px;height:8px;border-radius:50%;background:var(--rose);display:block;flex-shrink:0"></span>
      Student regions
    </span>
    <span style="display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,240,235,.5)">
      <span style="width:10px;height:10px;border-radius:50%;background:var(--gold);display:block;flex-shrink:0"></span>
      Need-blind universities
    </span>
    <span style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(196,164,145,.4)">
      Hover to see connections
    </span>
  `;
  container.appendChild(legend);

})();
