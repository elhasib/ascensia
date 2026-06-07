<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="The Ascensia advisor network — students currently enrolled at universities across the world.">
<title>Advisors | Ascensia</title>
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/nav.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/main.css">
<style>
.map-section { padding: 0; position: relative; }
.map-wrap {
  position: relative; width: 100%;
  background: var(--sheet-bg-alt);
  overflow: hidden; border-bottom: var(--rule); user-select: none;
}
.map-svg-bg {
  width: 100%; height: auto; display: block; opacity: .28;
  -webkit-mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,.7) 12%, rgba(0,0,0,.7) 88%, transparent);
  mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,.7) 12%, rgba(0,0,0,.7) 88%, transparent);
}
.map-pins { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.pin { cursor: none; }
.pin circle.pulse { animation: pinPulse 2.6s ease-out infinite; transform-origin: center; }
@keyframes pinPulse {
  0%   { r: 3.5; opacity: .5; }
  60%  { r: 9;   opacity: 0;  }
  100% { r: 9;   opacity: 0;  }
}
.pin circle.dot { transition: r .2s, fill .2s; }
.pin.active circle.dot { fill: var(--rose); r: 5; }
.pin.active circle.pulse { animation: none; opacity: 0; }

.map-tooltip {
  position: absolute; z-index: 20; pointer-events: none;
  opacity: 0; transform: translateY(4px) scale(.97);
  transition: opacity .18s, transform .18s; will-change: transform, opacity;
}
.map-tooltip.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
.tooltip-card {
  background: var(--sheet-bg); border: var(--rule); border-radius: 10px;
  box-shadow: 0 4px 24px rgba(28,20,9,.12), 0 1px 4px rgba(28,20,9,.06);
  padding: 14px 18px 16px; min-width: 190px; max-width: 240px; position: relative;
}
.tooltip-card::after {
  content: ''; position: absolute; bottom: -6px; left: 50%;
  transform: translateX(-50%); width: 10px; height: 6px;
  background: var(--sheet-bg); clip-path: polygon(0 0, 100% 0, 50% 100%);
}
.tt-location { font-family: var(--sans); font-size: 9px; font-weight: 400; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); margin-bottom: 5px; }
.tt-name { font-family: var(--serif); font-size: 15px; font-weight: 400; line-height: 1.25; color: var(--ink); margin-bottom: 8px; }
.tt-advisors { font-family: var(--sans); font-size: 12px; font-weight: 300; color: var(--ink-2); display: flex; align-items: center; gap: 6px; }
.tt-count { font-family: var(--serif); font-size: 20px; font-weight: 400; line-height: 1; color: var(--rose); }
.tt-label { color: var(--ink-3); font-size: 11px; }

.region-tabs {
  display: flex; gap: 2px; padding: var(--sheet-pad);
  padding-top: 36px; padding-bottom: 0; flex-wrap: wrap;
}
.rtab {
  font-family: var(--sans); font-size: 10px; font-weight: 400;
  letter-spacing: .18em; text-transform: uppercase; color: var(--ink-3);
  padding: 7px 16px; border-radius: 2px; border: var(--rule);
  background: transparent; cursor: none; transition: all .2s;
}
.rtab:hover { color: var(--ink); background: var(--ink-faint); }
.rtab.active { color: var(--sheet-bg); background: var(--ink); border-color: var(--ink); }

/* University list with logos */
.uni-list {
  padding: 48px var(--sheet-pad);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--ink-faint);
}
.uni-row {
  background: var(--sheet-bg);
  padding: 16px 20px;
  display: flex; align-items: center; gap: 14px;
  transition: background .2s; cursor: none;
}
.uni-row:hover { background: var(--sheet-bg-alt); }
.uni-row.highlight { background: rgba(201,164,74,.07); }

/* Logo container — fixed size, graceful fallback */
.uni-logo-wrap {
  width: 36px; height: 36px; flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background: var(--sheet-bg-alt);
  border: 0.5px solid rgba(28,20,9,.07);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.uni-logo-wrap img {
  width: 100%; height: 100%;
  object-fit: contain;
  padding: 3px;
  display: block;
  transition: opacity .3s;
}
/* Fallback initials shown when logo fails */
.uni-logo-wrap .uni-initial {
  font-family: var(--serif); font-size: 14px; font-weight: 400;
  color: var(--gold-dim); position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; /* hidden by default, shown by JS when img fails */
  pointer-events: none;
}
.uni-logo-wrap.failed img { opacity: 0; }
.uni-logo-wrap.failed .uni-initial { opacity: 1; }

.uni-row-name {
  font-family: var(--sans); font-size: 13px; font-weight: 300;
  color: var(--ink-2); line-height: 1.3; flex: 1;
}
.uni-row-count {
  font-family: var(--serif); font-size: 16px; font-weight: 400;
  color: rgba(28,20,9,.2); flex-shrink: 0;
}
.uni-row:hover .uni-row-count { color: var(--rose); }

.advisors-stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: .5px; background: var(--ink-faint); margin: 0;
}
.astat {
  background: var(--sheet-bg); padding: 36px var(--sheet-pad);
  display: flex; align-items: baseline; gap: 10px;
}
.astat-n {
  font-family: var(--serif); font-size: clamp(38px, 5vw, 58px);
  font-weight: 400; line-height: 1; letter-spacing: -.03em; color: var(--ink);
}
.astat-l {
  font-family: var(--sans); font-size: 12px; font-weight: 300;
  color: var(--ink-3); max-width: 140px; line-height: 1.5;
}

@media (max-width: 860px) {
  .uni-list { grid-template-columns: 1fr 1fr; }
  .advisors-stats { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .uni-list { grid-template-columns: 1fr; }
  .advisors-stats { grid-template-columns: 1fr; }
  .region-tabs { padding: 24px clamp(24px,6vw,40px) 0; }
}
</style>
</head>
<body>
<div id="cur"></div>
<div id="cur-r"></div>

<div class="page-wrap">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>

  <div class="sheet">
    <nav class="nav">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-mark"><span></span><span></span><span></span><span></span></div>
        Ascensia
      </a>
      <ul class="nav-links">
        <li><a href="program.html">Program</a></li>
        <li><a href="advisors.html" class="active">Advisors</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="mailto:team@ascensia.foundation" class="nav-cta">Get in touch</a></li>
      </ul>
      <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </nav>

    <div class="page-hero">
      <p class="page-hero-label">The network</p>
      <h1>
        <span class="hero-line"><span>People already inside</span></span>
        <span class="hero-line"><span>the doors you're aiming for.</span></span>
      </h1>
      <p class="page-hero-sub">
        Every Ascensia advisor is a current student or recent graduate at one of these universities. They went through the same process, from similar starting points, not long ago.
      </p>
    </div>

    <div class="advisors-stats r">
      <div class="astat">
        <div class="astat-n">176</div>
        <div class="astat-l">active and recruiting advisors</div>
      </div>
      <div class="astat">
        <div class="astat-n">93</div>
        <div class="astat-l">universities across 6 continents</div>
      </div>
      <div class="astat">
        <div class="astat-n">25</div>
        <div class="astat-l">countries represented in the network</div>
      </div>
    </div>

    <div class="region-tabs r r-d1" id="region-tabs">
      <button class="rtab active" data-region="all">All</button>
      <button class="rtab" data-region="usa">Americas</button>
      <button class="rtab" data-region="uk">United Kingdom</button>
      <button class="rtab" data-region="middle-east">Middle East</button>
      <button class="rtab" data-region="africa">Africa</button>
      <button class="rtab" data-region="asia">Asia</button>
      <button class="rtab" data-region="europe">Europe</button>
    </div>

    <div class="pad-sm map-section">
      <div class="map-wrap" id="map-wrap">
        <svg class="map-svg-bg" id="map-bg" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"></svg>
        <svg class="map-pins" id="map-pins" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="map-tooltip" id="map-tooltip">
          <div class="tooltip-card">
            <div class="tt-location" id="tt-loc"></div>
            <div class="tt-name" id="tt-name"></div>
            <div class="tt-advisors">
              <span class="tt-count" id="tt-count"></span>
              <span class="tt-label" id="tt-label"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rule-warm"></div>

    <section class="pad">
      <p class="eyebrow r">How it works</p>
      <h2 class="section-h r r-d1">Not a directory.<br>An actual relationship.</h2>
      <p class="r r-d2" style="font-size:17px;line-height:1.88;color:var(--ink-2);max-width:560px;margin-bottom:18px;">
        Each Ascensia student is matched with an advisor who attended or currently attends one of their target universities. The match is based on school, academic field, and region of origin — so the person you're talking to has actually navigated something close to what you're navigating.
      </p>
      <p class="r r-d3" style="font-size:17px;line-height:1.88;color:var(--ink-2);max-width:560px;">
        Advisors hold biweekly sessions with their matched students and are available asynchronously throughout the application cycle. They review essays, share their own materials where relevant, and answer the questions you'd feel awkward asking anyone else.
      </p>
      <div class="illus-zone" style="padding:0;margin:40px 0 0;">
        <div class="illus-box wide r" data-label="Illustration — advisor / student connection across distance"></div>
      </div>
    </section>

    <div class="rule"></div>

    <section style="padding:48px 0 0;">
      <div style="padding:0 var(--sheet-pad) 32px;">
        <p class="eyebrow r">Where our advisors are</p>
        <h2 class="section-h r r-d1" style="font-size:clamp(24px,3.2vw,36px);">93 universities. Click the map or browse below.</h2>
      </div>
      <div class="uni-list" id="uni-list"></div>
    </section>

    <section class="closing" style="margin-top:2px;">
      <p class="closing-label">Become an advisor</p>
      <a href="mailto:team@ascensia.foundation" class="closing-email r">team@ascensia.foundation</a>
      <p class="closing-note r r-d1">If you're a current student at any of these universities and want to be part of the network, reach out.</p>
      <nav class="closing-nav r r-d2">
        <a href="index.html">Home</a>
        <a href="program.html">Program</a>
        <a href="about.html">About</a>
      </nav>
      <p class="closing-copy">&copy; 2026 Ascensia. Nonprofit. All rights reserved.</p>
    </section>

  </div>
</div>

<div class="nav-mobile">
  <a href="program.html">Program</a>
  <a href="advisors.html">Advisors</a>
  <a href="about.html">About</a>
  <a href="mailto:team@ascensia.foundation">Contact</a>
</div>

<script>
const UNIS = [
  { name: "American University of Beirut",             lat: 33.9003,  lng: 35.4784,   advisors: 10, location: "Beirut, Lebanon",         region: "middle-east", domain: "aub.edu.lb" },
  { name: "Ritsumeikan Asia Pacific University",        lat: 33.2927,  lng: 131.5044,  advisors: 8,  location: "Beppu, Japan",             region: "asia",        domain: "apu.ac.jp" },
  { name: "Yale University",                           lat: 41.3163,  lng: -72.9223,  advisors: 6,  location: "New Haven, USA",           region: "usa",         domain: "yale.edu" },
  { name: "Skidmore College",                          lat: 43.0934,  lng: -73.7834,  advisors: 5,  location: "Saratoga Springs, USA",    region: "usa",         domain: "skidmore.edu" },
  { name: "Vanderbilt University",                     lat: 36.1447,  lng: -86.8027,  advisors: 5,  location: "Nashville, USA",           region: "usa",         domain: "vanderbilt.edu" },
  { name: "University of Notre Dame",                  lat: 41.7056,  lng: -86.2353,  advisors: 5,  location: "Notre Dame, USA",          region: "usa",         domain: "nd.edu" },
  { name: "Bowdoin College",                           lat: 43.9073,  lng: -69.9642,  advisors: 4,  location: "Brunswick, USA",           region: "usa",         domain: "bowdoin.edu" },
  { name: "Macalester College",                        lat: 44.9389,  lng: -93.1687,  advisors: 4,  location: "St. Paul, USA",            region: "usa",         domain: "macalester.edu" },
  { name: "University of Pennsylvania",                lat: 39.9522,  lng: -75.1932,  advisors: 4,  location: "Philadelphia, USA",        region: "usa",         domain: "upenn.edu" },
  { name: "Constructor University Bremen",             lat: 53.1678,  lng: 8.6503,    advisors: 4,  location: "Bremen, Germany",          region: "europe",      domain: "constructor.university" },
  { name: "Georgetown University in Qatar",            lat: 25.3548,  lng: 51.1839,   advisors: 4,  location: "Doha, Qatar",              region: "middle-east", domain: "georgetown.edu" },
  { name: "University of North Carolina",              lat: 35.9049,  lng: -79.0469,  advisors: 3,  location: "Chapel Hill, USA",         region: "usa",         domain: "unc.edu" },
  { name: "University of Chicago",                     lat: 41.7886,  lng: -87.5987,  advisors: 3,  location: "Chicago, USA",             region: "usa",         domain: "uchicago.edu" },
  { name: "Tufts University",                          lat: 42.4075,  lng: -71.119,   advisors: 3,  location: "Medford, USA",             region: "usa",         domain: "tufts.edu" },
  { name: "Northwestern University",                   lat: 42.0565,  lng: -87.6753,  advisors: 3,  location: "Evanston, USA",            region: "usa",         domain: "northwestern.edu" },
  { name: "Dartmouth College",                         lat: 43.7044,  lng: -72.2887,  advisors: 3,  location: "Hanover, USA",             region: "usa",         domain: "dartmouth.edu" },
  { name: "University of British Columbia",            lat: 49.2606,  lng: -123.246,  advisors: 3,  location: "Vancouver, Canada",        region: "usa",         domain: "ubc.ca" },
  { name: "Grambling State University",                lat: 32.527,   lng: -92.7199,  advisors: 3,  location: "Grambling, USA",           region: "usa",         domain: "gram.edu" },
  { name: "The African Leadership University",         lat: -1.9441,  lng: 30.0619,   advisors: 3,  location: "Kigali, Rwanda",           region: "africa",      domain: "alueducation.com" },
  { name: "Princeton University",                      lat: 40.343,   lng: -74.6514,  advisors: 3,  location: "Princeton, USA",           region: "usa",         domain: "princeton.edu" },
  { name: "Oberlin College",                           lat: 41.2934,  lng: -82.2218,  advisors: 3,  location: "Oberlin, USA",             region: "usa",         domain: "oberlin.edu" },
  { name: "Pomona College",                            lat: 34.0967,  lng: -117.7131, advisors: 2,  location: "Claremont, USA",           region: "usa",         domain: "pomona.edu" },
  { name: "Hult International Business School",        lat: 51.5074,  lng: -0.1278,   advisors: 2,  location: "London, UK",               region: "uk",          domain: "hult.edu" },
  { name: "Duke University",                           lat: 36.0014,  lng: -78.9382,  advisors: 2,  location: "Durham, USA",              region: "usa",         domain: "duke.edu" },
  { name: "Bates College",                             lat: 44.1053,  lng: -70.2046,  advisors: 2,  location: "Lewiston, USA",            region: "usa",         domain: "bates.edu" },
  { name: "Fordham University",                        lat: 40.8611,  lng: -73.8854,  advisors: 2,  location: "New York, USA",            region: "usa",         domain: "fordham.edu" },
  { name: "Williams College",                          lat: 42.7127,  lng: -73.2032,  advisors: 2,  location: "Williamstown, USA",        region: "usa",         domain: "williams.edu" },
  { name: "University of Rochester",                   lat: 43.1284,  lng: -77.6276,  advisors: 2,  location: "Rochester, USA",           region: "usa",         domain: "rochester.edu" },
  { name: "Harvard University",                        lat: 42.377,   lng: -71.1167,  advisors: 2,  location: "Cambridge, USA",           region: "usa",         domain: "harvard.edu" },
  { name: "Smith College",                             lat: 42.3181,  lng: -72.6381,  advisors: 2,  location: "Northampton, USA",         region: "usa",         domain: "smith.edu" },
  { name: "Northwestern University in Qatar",          lat: 25.3737,  lng: 51.488,    advisors: 2,  location: "Doha, Qatar",              region: "middle-east", domain: "northwestern.edu" },
  { name: "Washington and Lee University",             lat: 37.7887,  lng: -79.4423,  advisors: 2,  location: "Lexington, USA",           region: "usa",         domain: "wlu.edu" },
  { name: "University of Calgary",                     lat: 51.0767,  lng: -114.1327, advisors: 2,  location: "Calgary, Canada",          region: "usa",         domain: "ucalgary.ca" },
  { name: "Cornell University",                        lat: 42.4534,  lng: -76.4735,  advisors: 2,  location: "Ithaca, USA",              region: "usa",         domain: "cornell.edu" },
  { name: "University of St Andrews",                  lat: 56.3398,  lng: -2.7967,   advisors: 1,  location: "St Andrews, UK",           region: "uk",          domain: "st-andrews.ac.uk" },
  { name: "Syracuse University",                       lat: 43.0389,  lng: -76.1356,  advisors: 1,  location: "Syracuse, USA",            region: "usa",         domain: "syr.edu" },
  { name: "Northeastern University",                   lat: 42.3398,  lng: -71.0892,  advisors: 1,  location: "Boston, USA",              region: "usa",         domain: "northeastern.edu" },
  { name: "New York University Abu Dhabi",             lat: 24.5247,  lng: 54.4348,   advisors: 1,  location: "Abu Dhabi, UAE",           region: "middle-east", domain: "nyu.edu" },
  { name: "Lehigh University",                         lat: 40.6065,  lng: -75.3783,  advisors: 1,  location: "Bethlehem, USA",           region: "usa",         domain: "lehigh.edu" },
  { name: "Case Western Reserve University",           lat: 41.5042,  lng: -81.6093,  advisors: 1,  location: "Cleveland, USA",           region: "usa",         domain: "case.edu" },
  { name: "The University of Hong Kong",               lat: 22.2839,  lng: 114.1364,  advisors: 1,  location: "Hong Kong",                region: "asia",        domain: "hku.hk" },
  { name: "Brandeis University",                       lat: 42.3663,  lng: -71.2601,  advisors: 1,  location: "Waltham, USA",             region: "usa",         domain: "brandeis.edu" },
  { name: "UC Berkeley",                               lat: 37.8719,  lng: -122.2585, advisors: 1,  location: "Berkeley, USA",            region: "usa",         domain: "berkeley.edu" },
  { name: "Durham University",                         lat: 54.7661,  lng: -1.5755,   advisors: 1,  location: "Durham, UK",               region: "uk",          domain: "dur.ac.uk" },
  { name: "University of Aberdeen",                    lat: 57.1645,  lng: -2.0999,   advisors: 1,  location: "Aberdeen, UK",             region: "uk",          domain: "abdn.ac.uk" },
  { name: "Emory University",                          lat: 33.7945,  lng: -84.3245,  advisors: 1,  location: "Atlanta, USA",             region: "usa",         domain: "emory.edu" },
  { name: "The American University in Cairo",          lat: 30.0219,  lng: 31.4998,   advisors: 1,  location: "Cairo, Egypt",             region: "middle-east", domain: "aucegypt.edu" },
  { name: "Minerva University",                        lat: 37.7749,  lng: -122.4194, advisors: 1,  location: "San Francisco, USA",       region: "usa",         domain: "minerva.edu" },
  { name: "University of Florida",                     lat: 29.6465,  lng: -82.3533,  advisors: 1,  location: "Gainesville, USA",         region: "usa",         domain: "ufl.edu" },
  { name: "University of Leeds",                       lat: 53.8067,  lng: -1.555,    advisors: 1,  location: "Leeds, UK",                region: "uk",          domain: "leeds.ac.uk" },
  { name: "Lancaster University",                      lat: 54.0104,  lng: -2.7878,   advisors: 1,  location: "Lancaster, UK",            region: "uk",          domain: "lancaster.ac.uk" },
  { name: "University of Exeter",                      lat: 50.7352,  lng: -3.5335,   advisors: 1,  location: "Exeter, UK",               region: "uk",          domain: "exeter.ac.uk" },
  { name: "Villanova University",                      lat: 40.036,   lng: -75.3441,  advisors: 1,  location: "Villanova, USA",           region: "usa",         domain: "villanova.edu" },
  { name: "Reed College",                              lat: 45.481,   lng: -122.6282, advisors: 1,  location: "Portland, USA",            region: "usa",         domain: "reed.edu" },
  { name: "Washington University in St Louis",         lat: 38.6488,  lng: -90.3108,  advisors: 1,  location: "St Louis, USA",            region: "usa",         domain: "wustl.edu" },
  { name: "Westlake University",                       lat: 30.2741,  lng: 120.1551,  advisors: 1,  location: "Hangzhou, China",          region: "asia",        domain: "westlake.edu.cn" },
  { name: "The University of Manchester",              lat: 53.4668,  lng: -2.2339,   advisors: 1,  location: "Manchester, UK",           region: "uk",          domain: "manchester.ac.uk" },
  { name: "Wesleyan University",                       lat: 41.5555,  lng: -72.6586,  advisors: 1,  location: "Middletown, USA",          region: "usa",         domain: "wesleyan.edu" },
  { name: "Concordia University",                      lat: 45.4944,  lng: -73.5775,  advisors: 1,  location: "Montreal, Canada",         region: "usa",         domain: "concordia.ca" },
  { name: "University of East London",                 lat: 51.5074,  lng: 0.0553,    advisors: 1,  location: "London, UK",               region: "uk",          domain: "uel.ac.uk" },
  { name: "Kwame Nkrumah Univ of Science & Technology",lat: 6.6745,  lng: -1.5716,   advisors: 1,  location: "Kumasi, Ghana",            region: "africa",      domain: "knust.edu.gh" },
  { name: "Bocconi University",                        lat: 45.4548,  lng: 9.19,      advisors: 1,  location: "Milan, Italy",             region: "europe",      domain: "unibocconi.eu" },
  { name: "University of Cape Town",                   lat: -33.9575, lng: 18.4612,   advisors: 1,  location: "Cape Town, South Africa",  region: "africa",      domain: "uct.ac.za" },
  { name: "Leiden University",                         lat: 52.1601,  lng: 4.497,     advisors: 1,  location: "Leiden, Netherlands",      region: "europe",      domain: "leidenuniv.nl" },
  { name: "Brown University",                          lat: 41.8268,  lng: -71.4025,  advisors: 1,  location: "Providence, USA",          region: "usa",         domain: "brown.edu" },
  { name: "Pan-Atlantic University",                   lat: 6.5244,   lng: 3.3792,    advisors: 1,  location: "Lagos, Nigeria",           region: "africa",      domain: "pau.edu.ng" },
  { name: "Ashoka University",                         lat: 28.9842,  lng: 77.1025,   advisors: 1,  location: "Sonipat, India",           region: "asia",        domain: "ashoka.edu.in" },
  { name: "The University of Sheffield",               lat: 53.3811,  lng: -1.4701,   advisors: 1,  location: "Sheffield, UK",            region: "uk",          domain: "sheffield.ac.uk" },
  { name: "Georgian Technical University",             lat: 41.7151,  lng: 44.8271,   advisors: 1,  location: "Tbilisi, Georgia",         region: "europe",      domain: "gtu.ge" },
  { name: "Wellesley College",                         lat: 42.2956,  lng: -71.3056,  advisors: 1,  location: "Wellesley, USA",           region: "usa",         domain: "wellesley.edu" },
  { name: "University of Essex",                       lat: 51.8783,  lng: 0.9408,    advisors: 1,  location: "Colchester, UK",           region: "uk",          domain: "essex.ac.uk" },
  { name: "American University",                       lat: 38.9374,  lng: -77.0862,  advisors: 1,  location: "Washington DC, USA",       region: "usa",         domain: "american.edu" },
  { name: "California Institute of Technology",        lat: 34.1377,  lng: -118.1253, advisors: 1,  location: "Pasadena, USA",            region: "usa",         domain: "caltech.edu" },
  { name: "Columbia University",                       lat: 40.8075,  lng: -73.9626,  advisors: 1,  location: "New York, USA",            region: "usa",         domain: "columbia.edu" },
  { name: "Monash University Malaysia",                lat: 2.929,    lng: 101.784,   advisors: 1,  location: "Subang Jaya, Malaysia",    region: "asia",        domain: "monash.edu" },
  { name: "Ashesi University",                         lat: 5.7587,   lng: -0.22,     advisors: 1,  location: "Berekuso, Ghana",          region: "africa",      domain: "ashesi.edu.gh" },
  { name: "University of Lusaka",                      lat: -15.4166, lng: 28.2833,   advisors: 1,  location: "Lusaka, Zambia",           region: "africa",      domain: "unilus.ac.zm" },
  { name: "German University in Cairo",                lat: 30.0059,  lng: 31.7222,   advisors: 1,  location: "Cairo, Egypt",             region: "middle-east", domain: "guc.edu.eg" },
  { name: "Claremont McKenna College",                 lat: 34.1015,  lng: -117.71,   advisors: 1,  location: "Claremont, USA",           region: "usa",         domain: "cmc.edu" },
  { name: "Bard College",                              lat: 42.0264,  lng: -73.9102,  advisors: 1,  location: "Annandale, USA",           region: "usa",         domain: "bard.edu" },
  { name: "American University in Paris",              lat: 48.8566,  lng: 2.3104,    advisors: 1,  location: "Paris, France",            region: "europe",      domain: "aup.edu" },
  { name: "MIT",                                       lat: 42.3601,  lng: -71.0942,  advisors: 1,  location: "Cambridge, USA",           region: "usa",         domain: "mit.edu" },
  { name: "Imperial College London",                   lat: 51.4988,  lng: -0.1749,   advisors: 1,  location: "London, UK",               region: "uk",          domain: "imperial.ac.uk" },
  { name: "University of Warwick",                     lat: 52.3794,  lng: -1.561,    advisors: 1,  location: "Coventry, UK",             region: "uk",          domain: "warwick.ac.uk" },
  { name: "University of Cambridge",                   lat: 52.2054,  lng: 0.1132,    advisors: 1,  location: "Cambridge, UK",            region: "uk",          domain: "cam.ac.uk" },
  { name: "University of Bristol",                     lat: 51.4584,  lng: -2.6032,   advisors: 1,  location: "Bristol, UK",              region: "uk",          domain: "bristol.ac.uk" },
  { name: "National University of Singapore",          lat: 1.2966,   lng: 103.7764,  advisors: 1,  location: "Singapore",                region: "asia",        domain: "nus.edu.sg" },
  { name: "University of Edinburgh",                   lat: 55.9445,  lng: -3.1892,   advisors: 1,  location: "Edinburgh, UK",            region: "uk",          domain: "ed.ac.uk" },
  { name: "Haverford College",                         lat: 40.0093,  lng: -75.3057,  advisors: 1,  location: "Haverford, USA",           region: "usa",         domain: "haverford.edu" },
  { name: "University of Texas at Austin",             lat: 30.2849,  lng: -97.7341,  advisors: 1,  location: "Austin, USA",              region: "usa",         domain: "utexas.edu" },
  { name: "Universidad EARTH",                         lat: 10.2147,  lng: -83.773,   advisors: 1,  location: "Guácimo, Costa Rica",      region: "usa",         domain: "earth.ac.cr" },
  { name: "University of Debrecen",                    lat: 47.5597,  lng: 21.5831,   advisors: 2,  location: "Debrecen, Hungary",        region: "europe",      domain: "unideb.hu" },
  { name: "Texas Christian University",                lat: 32.7096,  lng: -97.3625,  advisors: 2,  location: "Fort Worth, USA",          region: "usa",         domain: "tcu.edu" },
];

/* ── EQUIRECTANGULAR PROJECTION ── */
const VW = 1000, VH = 500;
function project(lat, lng) {
  return {
    x: Math.round((lng + 180) / 360 * VW * 10) / 10,
    y: Math.round(Math.max(0, Math.min(VH, (90 - lat) / 180 * VH)) * 10) / 10
  };
}

/* ── WORLD MAP BACKGROUND (equirectangular outlines) ── */
function buildWorldMap() {
  const svg = document.getElementById('map-bg');
  const fill = 'rgba(28,20,9,0.22)';
  const lands = [
    "M 138,60 L 148,55 L 158,52 L 170,50 L 182,52 L 190,58 L 195,65 L 200,72 L 205,80 L 210,88 L 215,95 L 218,105 L 220,112 L 225,118 L 228,125 L 230,132 L 232,140 L 230,148 L 225,155 L 220,160 L 215,165 L 210,172 L 205,178 L 200,183 L 195,187 L 190,192 L 185,196 L 182,200 L 178,205 L 172,210 L 165,215 L 158,218 L 150,220 L 142,218 L 135,215 L 130,210 L 125,205 L 120,200 L 115,195 L 112,188 L 110,180 L 108,172 L 107,165 L 108,158 L 110,150 L 112,142 L 115,135 L 118,128 L 120,120 L 118,112 L 115,105 L 112,98 L 110,90 L 112,82 L 115,75 L 120,68 L 128,63 Z",
    "M 188,28 L 198,25 L 208,28 L 215,35 L 218,42 L 215,50 L 208,55 L 198,57 L 188,55 L 182,48 L 180,40 L 183,33 Z",
    "M 190,220 L 200,218 L 210,222 L 218,228 L 225,235 L 230,245 L 232,255 L 230,265 L 228,275 L 225,285 L 220,295 L 215,308 L 210,320 L 205,332 L 200,342 L 195,350 L 190,355 L 185,350 L 180,342 L 178,330 L 177,318 L 178,305 L 180,292 L 182,280 L 183,268 L 182,256 L 180,245 L 178,235 L 178,228 L 182,222 Z",
    "M 460,55 L 472,52 L 485,50 L 498,52 L 510,55 L 520,60 L 528,68 L 532,76 L 530,85 L 525,92 L 518,98 L 510,103 L 500,107 L 490,110 L 480,112 L 470,110 L 462,106 L 456,100 L 452,92 L 450,84 L 452,75 L 456,67 Z",
    "M 488,38 L 500,35 L 512,38 L 520,45 L 522,54 L 518,60 L 510,63 L 500,62 L 492,58 L 487,50 Z",
    "M 455,72 L 462,68 L 470,70 L 475,76 L 473,84 L 465,88 L 456,86 L 450,80 L 451,74 Z",
    "M 460,145 L 475,140 L 492,138 L 508,140 L 522,145 L 535,153 L 545,163 L 552,174 L 556,186 L 558,198 L 558,210 L 555,222 L 550,233 L 543,243 L 534,252 L 522,258 L 510,262 L 498,264 L 485,262 L 473,258 L 462,252 L 452,244 L 445,234 L 440,222 L 438,210 L 438,198 L 440,185 L 444,173 L 450,162 L 455,153 Z",
    "M 565,245 L 570,240 L 576,243 L 580,250 L 578,258 L 572,262 L 565,258 L 562,252 Z",
    "M 520,42 L 550,35 L 590,30 L 640,28 L 690,30 L 730,35 L 760,40 L 790,42 L 820,40 L 850,38 L 870,42 L 875,50 L 870,58 L 860,65 L 840,70 L 820,72 L 800,70 L 780,68 L 760,70 L 740,75 L 720,80 L 700,82 L 680,80 L 660,78 L 640,75 L 620,72 L 600,70 L 580,68 L 560,65 L 542,62 L 530,58 L 522,52 Z",
    "M 560,130 L 572,125 L 585,122 L 600,124 L 612,130 L 620,138 L 625,148 L 623,158 L 617,166 L 608,172 L 596,175 L 583,174 L 572,168 L 563,160 L 558,150 L 557,140 Z",
    "M 650,130 L 665,125 L 680,128 L 692,135 L 698,145 L 698,158 L 694,170 L 685,180 L 674,185 L 663,183 L 652,177 L 645,167 L 642,155 L 643,143 Z",
    "M 740,140 L 755,135 L 768,138 L 778,145 L 782,155 L 778,165 L 770,172 L 758,175 L 746,172 L 737,164 L 734,152 Z",
    "M 720,80 L 750,78 L 780,80 L 808,85 L 830,92 L 845,102 L 852,114 L 848,127 L 838,138 L 822,146 L 803,150 L 783,148 L 763,143 L 745,135 L 730,125 L 720,115 L 715,103 L 716,92 Z",
    "M 862,100 L 870,95 L 878,98 L 882,106 L 878,114 L 868,118 L 860,115 L 856,107 Z",
    "M 780,285 L 800,278 L 825,275 L 850,278 L 872,285 L 888,296 L 898,310 L 900,325 L 896,340 L 885,352 L 870,360 L 852,364 L 832,362 L 814,355 L 798,344 L 786,330 L 778,315 L 776,300 Z",
    "M 780,195 L 795,190 L 810,193 L 820,200 L 818,210 L 806,215 L 790,213 L 778,205 Z",
    "M 830,175 L 842,170 L 852,174 L 855,183 L 848,191 L 834,193 L 824,187 L 823,178 Z",
    "M 175,195 L 182,190 L 190,192 L 196,198 L 195,206 L 186,210 L 176,208 L 170,202 Z",
  ];
  lands.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', fill);
    path.setAttribute('stroke', 'none');
    svg.appendChild(path);
  });
}

const pinEls = [];
function buildPins() {
  const svg = document.getElementById('map-pins');
  svg.innerHTML = '';
  UNIS.forEach((u, i) => {
    const { x, y } = project(u.lat, u.lng);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'pin');
    const r = Math.min(2.5 + u.advisors * 0.5, 6);
    const gold = 'rgba(201,164,74,1)';
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('class', 'pulse');
    pulse.setAttribute('cx', x); pulse.setAttribute('cy', y);
    pulse.setAttribute('r', r); pulse.setAttribute('fill', gold); pulse.setAttribute('opacity', '0.4');
    pulse.style.animationDelay = `${(i * 0.18) % 2.6}s`;
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', 'dot');
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    dot.setAttribute('r', r); dot.setAttribute('fill', gold);
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('cx', x); hit.setAttribute('cy', y);
    hit.setAttribute('r', Math.max(r + 6, 10)); hit.setAttribute('fill', 'transparent');
    g.appendChild(pulse); g.appendChild(dot); g.appendChild(hit);
    svg.appendChild(g);
    pinEls.push({ el: g, uni: u, x, y });
    g.addEventListener('mouseenter', () => showTooltip(i));
    g.addEventListener('mouseleave', hideTooltip);
    g.addEventListener('click', () => highlightUni(i));
  });
}

const tooltip = document.getElementById('map-tooltip');
function showTooltip(idx) {
  const { uni, x, y } = pinEls[idx];
  const svgEl = document.getElementById('map-pins');
  const svgRect = svgEl.getBoundingClientRect();
  const px = x * (svgRect.width / VW);
  const py = y * (svgRect.height / VH);
  document.getElementById('tt-loc').textContent = uni.location;
  document.getElementById('tt-name').textContent = uni.name;
  document.getElementById('tt-count').textContent = uni.advisors;
  document.getElementById('tt-label').textContent = uni.advisors === 1 ? 'advisor' : 'advisors';
  tooltip.style.left = (px - 100) + 'px';
  tooltip.style.top  = (py - 96) + 'px';
  tooltip.classList.add('show');
}
function hideTooltip() { tooltip.classList.remove('show'); }
function highlightUni(idx) {
  document.querySelectorAll('.uni-row').forEach(r => r.classList.remove('highlight'));
  const row = document.getElementById(`urow-${idx}`);
  if (row) { row.classList.add('highlight'); row.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  pinEls.forEach(p => p.el.classList.remove('active'));
  pinEls[idx].el.classList.add('active');
  setTimeout(() => pinEls[idx].el.classList.remove('active'), 1800);
}
function filterRegion(region) {
  pinEls.forEach(({ el, uni }) => {
    const show = region === 'all' || uni.region === region;
    el.style.opacity = show ? '1' : '0.1';
    el.style.pointerEvents = show ? 'auto' : 'none';
  });
  document.querySelectorAll('.uni-row').forEach(row => {
    row.style.display = (region === 'all' || row.dataset.region === region) ? 'flex' : 'none';
  });
}

/* ── BUILD UNI LIST WITH LOGOS ── */
function getInitials(name) {
  return name.split(' ')
    .filter(w => w.length > 2 && !['of','the','and','in','at'].includes(w.toLowerCase()))
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

function buildUniList() {
  const list = document.getElementById('uni-list');
  const sorted = [...UNIS].sort((a, b) => b.advisors - a.advisors || a.name.localeCompare(b.name));
  sorted.forEach(u => {
    const origIdx = UNIS.indexOf(u);
    const row = document.createElement('div');
    row.className = 'uni-row';
    row.id = `urow-${origIdx}`;
    row.dataset.region = u.region;

    /* Logo with Clearbit primary, fallback to initials */
    const logoWrap = document.createElement('div');
    logoWrap.className = 'uni-logo-wrap';

    const img = document.createElement('img');
    img.src = `https://logo.clearbit.com/${u.domain}`;
    img.alt = u.name;
    img.loading = 'lazy';
    img.onerror = function() {
      logoWrap.classList.add('failed');
    };

    const initial = document.createElement('span');
    initial.className = 'uni-initial';
    initial.textContent = getInitials(u.name);

    logoWrap.appendChild(img);
    logoWrap.appendChild(initial);

    const nameDiv = document.createElement('div');
    nameDiv.className = 'uni-row-name';
    nameDiv.innerHTML = `${u.name}<br><span style="font-size:11px;color:var(--ink-3);letter-spacing:.04em;">${u.location}</span>`;

    const countDiv = document.createElement('div');
    countDiv.className = 'uni-row-count';
    countDiv.textContent = u.advisors;

    row.appendChild(logoWrap);
    row.appendChild(nameDiv);
    row.appendChild(countDiv);
    row.addEventListener('click', () => highlightUni(origIdx));
    list.appendChild(row);
  });
}

document.querySelectorAll('.rtab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterRegion(btn.dataset.region);
  });
});

buildWorldMap();
buildPins();
buildUniList();
</script>

<script src="js/pixel-trail.js"></script>
<script src="js/cursor.js"></script>
<script src="js/scroll.js"></script>
</body>
</html>