═══════════════════════════════════════════════════════════
ASCENSIA WEBSITE REDESIGN — IMPLEMENTATION SUMMARY
═══════════════════════════════════════════════════════════

PROJECT COMPLETE. All five HTML pages rewritten with:
1. Human-centered copy (no AI marketing language)
2. SVG decoration system (command-based control)
3. Playful animations (float, wiggle, spin, drift, breathe)
4. Full functionality preserved

═══════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════

HTML PAGES (with copy rewrite + SVG decorations):
  index.html         — Homepage (hero, about, program preview, team)
  about.html         — About page (story, values, team)
  program.html       — Program page (overview, timeline, curriculum, eligibility)
  apply.html         — Applications page (launching soon + FAQ)
  advisors.html      — Advisor network (map, stats, university grid)

CSS:
  css/svg-decorations.css  — All animation classes, size presets, opacity control

DOCUMENTATION:
  SVG_CONTROL_REFERENCE.txt  — Complete quick reference guide

═══════════════════════════════════════════════════════════
HOW TO MODIFY SVG PLACEMENTS & SIZES
═══════════════════════════════════════════════════════════

Each SVG is a div with class="deco" containing an <img> tag.

BASIC STRUCTURE:
  <div class="deco [SIZE-CLASS] [ANIMATION-CLASS]" 
       style="[POSITION]; opacity: [VALUE]; --rot: [ANGLE];">
    <img src="assets/HandDrawn/[folder]/[file].svg" alt="">
  </div>

POSITIONING (inline style):
  Move it:      style="top: 50px; left: 100px;"
  Bottom-right: style="bottom: 20px; right: 30px;"
  Center (x):   style="left: 50%; transform: translateX(-50%);"
  Center (xy):  style="top: 50%; left: 50%; transform: translate(-50%, -50%);"

SIZING (use class):
  .sz-xs  = 30px   (tiny)
  .sz-sm  = 50px   (small)
  .sz-md  = 75px   (medium)
  .sz-lg  = 110px  (large)
  .sz-xl  = 150px  (extra large)
  .sz-xxl = 200px  (extra extra large)

CUSTOM SIZE:
  style="width: 85px;"

ANIMATIONS (use one main animation):
  .a-float       (gentle up-down motion)
  .a-float-slow  (slower version)
  .a-float-fast  (faster version)
  .a-wiggle      (side-to-side rotation)
  .a-breathe     (pulse + scale)
  .a-spin        (full rotation)
  .a-spin-r      (rotation in reverse)
  .a-drift       (horizontal movement)
  .a-none        (no animation)

OPACITY (use class):
  .op-vf = 0.08  (very faint, background)
  .op-f  = 0.12  (faint)
  .op-m  = 0.20  (medium)
  .op-h  = 0.30  (high)
  .op-vh = 0.40  (very high)

ROTATION:
  --rot: 0deg    (no rotation)
  --rot: 15deg   (15 degrees clockwise)
  --rot: -10deg  (10 degrees counter-clockwise)

DELAYS (for staggered animations):
  .delay-0 = 0s
  .delay-1 = 0.2s
  .delay-2 = 0.4s
  .delay-3 = 0.6s
  .delay-4 = 0.8s
  .delay-5 = 1s

═══════════════════════════════════════════════════════════
PRACTICAL EXAMPLES
═══════════════════════════════════════════════════════════

BEFORE (original):
  <div class="deco" style="top:10px;right:20px;width:80px;opacity:.18;--rot:-8deg;">
    <img src="assets/HandDrawn/10_Sprinkles/Sprinkle%201.svg" alt="">
  </div>

WANT TO: Make it larger, faster, more visible, different position
AFTER (modified):
  <div class="deco sz-lg a-float-fast delay-2" 
       style="top:40px;right:80px;opacity:0.32;--rot:15deg;">
    <img src="assets/HandDrawn/10_Sprinkles/Sprinkle%201.svg" alt="">
  </div>

WHAT CHANGED:
  - Added class: sz-lg (was width: 80px)
  - Added class: a-float-fast (was implied animation)
  - Added class: delay-2 (staggered start)
  - Changed top: 10px → 40px (moved down)
  - Changed right: 20px → 80px (moved further right)
  - Changed opacity: .18 → 0.32 (more visible)
  - Changed --rot: -8deg → 15deg (different angle)

═══════════════════════════════════════════════════════════
REAL-WORLD WORKFLOW
═══════════════════════════════════════════════════════════

SITUATION: You want to reposition a spiraling background blob

1. Open the HTML file and find the SVG element:
   <div class="deco" style="top:20px;right:-50px;width:240px;opacity:.06;">
     <img src="assets/HandDrawn/09_Spirals/Spiral%202.svg" alt="">
   </div>

2. You want to:
   - Make it bigger (more visible)
   - Spin slower (less frantic)
   - Move it lower (don't block headline)
   - Add more opacity

3. Modify:
   <div class="deco sz-xxl a-spin-slow" 
        style="top:80px;right:-50px;opacity:0.12;">
     <img src="assets/HandDrawn/09_Spirals/Spiral%202.svg" alt="">
   </div>

CHANGES EXPLAINED:
  - Removed inline width (now using .sz-xxl = 200px)
  - Changed .a-spin → .a-spin-slow (half the rotation speed)
  - Removed --rot (spinning, rotation doesn't matter)
  - top: 20px → 80px (moved down to avoid headline)
  - opacity: .06 → 0.12 (more visible)

═══════════════════════════════════════════════════════════
ASSET CATEGORIES & BEST USES
═══════════════════════════════════════════════════════════

Background/Very Faint:
  - 04_Blobs/         (organic, soft)
  - 05_Whirls/        (complex motion, hypnotic)
  - 09_Spirals/       (mathematical, elegant)
  Use with: .op-vf or .op-f, large sizes, very slow animations

Emphasis/Medium Visibility:
  - 01_Arrows/        (action, direction, pointing)
  - 02_Underlines/    (text emphasis, .a-draw animation)
  - 11_Punctuation/   (checkmarks, asterisks, symbols)
  Use with: .op-m or .op-h, medium sizes, .a-float or .a-wiggle

Playful Scatter:
  - 10_Sprinkles/     (small, joyful, varied)
  - 12_Doodles/       (sketch-like, casual)
  - 06_Scribbles/     (energetic, many variations)
  Use with: .op-m, small-to-medium sizes, .a-float or .a-breathe

Text Decorations:
  - 02_Underlines/    (below headlines, with .a-draw)
  - 03_Loops/         (circular enclosure, .a-wiggle)
  - 13_Corners/       (frame corners, .a-float-slow)
  Use with: positioned absolutely near text, medium opacity

Special Effects:
  - 08_Donuts/        (unique, spinning)
  - 07_Lines/         (minimalist, .a-draw animation)
  Use with: specific placements, custom animations

═══════════════════════════════════════════════════════════
COMMON MISTAKES TO AVOID
═══════════════════════════════════════════════════════════

DON'T:
  - Mix multiple animations: class="a-float a-wiggle"
    (Choose ONE: float, wiggle, breathe, spin, drift, or pulse)

  - Use conflicting rotations:
    <div class="a-spin r-15">  (spinning + fixed rotation = confusing)
    Use .a-spin alone, or use --rot with non-spinning animations

  - Forget inline styles when moving:
    <div class="deco">  (position: top: 20px INSIDE the style attribute)
    Should be: style="top: 20px; left: 30px;"

  - Make everything visible:
    class="op-vh" on every SVG (chaos, not delight)
    Mix: op-vf (faint background), op-m (medium), op-h (emphasis)

  - Place all SVGs in the same spot:
    Vary top/bottom, left/right to scatter naturally

DO:
  - Use size classes instead of inline widths
  - Choose ONE animation per decoration
  - Mix animation speeds (.a-float, .a-float-slow, .a-float-fast)
  - Stagger animations with .delay-0, .delay-1, .delay-2, etc.
  - Vary opacity to create hierarchy
  - Test on mobile (SVGs scale automatically)

═══════════════════════════════════════════════════════════
COPY REWRITE PRINCIPLES USED
═══════════════════════════════════════════════════════════

All copy was rewritten to avoid:
  - AI marketing language ("plays a vital role", "profound")
  - Overly promotional descriptors
  - Rule-of-three lists for style
  - Vague attributions and weasel wording
  - Excessive formatting (bold, em dashes, dividers)
  - Generic outlines and predictable structures

Instead emphasizing:
  - Specific, grounded language
  - Natural sentence rhythm (mix of simple and complex)
  - Direct storytelling
  - Clarity without jargon
  - Humanity and voice

═══════════════════════════════════════════════════════════
FILES TO LINK IN <head>
═══════════════════════════════════════════════════════════

Make sure each HTML page includes:
  <link rel="stylesheet" href="css/svg-decorations.css">

This is optional if you embed the animation styles directly in each page
(which I did for simplicity, but you can consolidate later).

═══════════════════════════════════════════════════════════
WHAT'S PRESERVED
═══════════════════════════════════════════════════════════

All original functionality:
  - Navigation (sticky, mobile menu)
  - Forms and interactions (email signup, region tabs, map pins)
  - Responsiveness (mobile breakpoints, fluid sizing)
  - Pixel trail background animation
  - Custom cursor behavior
  - Scroll animations (reveal on scroll, staggered delays)
  - Existing classes (nothing broken)

Nothing was removed except:
  - Old illustration placeholder boxes (illus-zone)
  - Generic copy phrases

═══════════════════════════════════════════════════════════
TO GET STARTED
═══════════════════════════════════════════════════════════

1. Copy all 5 HTML files to your site root
2. Copy css/svg-decorations.css to your css/ folder
3. Keep all asset paths pointing to: assets/HandDrawn/[category]/[file].svg
4. Test in browser
5. Use SVG_CONTROL_REFERENCE.txt as your command palette for changes

Every SVG placement is customizable on command:
  - Want to move it? Change top/left/bottom/right
  - Want to resize? Change the .sz-* class
  - Want different animation? Swap the .a-* class
  - Want different speed? Use -slow or -fast variants
  - Want to hide it? Change .op-* or set opacity: 0

═══════════════════════════════════════════════════════════