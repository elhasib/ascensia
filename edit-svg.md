/* ═══════════════════════════════════════
   SVG DECORATION SYSTEM — QUICK REFERENCE
   Command-based positioning, sizing, and animation
═══════════════════════════════════════ */

STRUCTURE:
Each SVG decoration is a div with class="deco" containing an <img> tag.

BASIC SYNTAX:
<div class="deco [SIZE] [ANIMATION] [OPACITY] [ROTATION] [DELAY]" 
     style="[POSITION]">
  <img src="assets/HandDrawn/[category]/[filename]" alt="" aria-hidden="true">
</div>

═══════════════════════════════════════
POSITIONING (inline style)
═══════════════════════════════════════

ABSOLUTE POSITIONING:
  style="top: [pixels/percent]; left: [pixels/percent];"
  style="bottom: [pixels/percent]; right: [pixels/percent];"

EXAMPLES:
  Top-left corner: style="top: 10px; left: 10px;"
  Bottom-right corner: style="bottom: 20px; right: 20px;"
  Centered top: style="top: 20px; left: 50%; transform: translateX(-50%);"
  Centered full: style="top: 50%; left: 50%; transform: translate(-50%, -50%);"

ANCHOR CLASSES (alternative to inline):
  .anchor-tl = top-left
  .anchor-tm = top-middle
  .anchor-tr = top-right
  .anchor-ml = middle-left
  .anchor-mm = middle-middle (fully centered)
  .anchor-mr = middle-right
  .anchor-bl = bottom-left
  .anchor-bm = bottom-middle
  .anchor-br = bottom-right

EXAMPLE:
  <div class="deco .anchor-tr sz-lg a-float">...</div>
  Places it top-right, large, floating.

═══════════════════════════════════════
SIZING
═══════════════════════════════════════

SIZE CLASSES:
  .sz-xs  = 30px
  .sz-sm  = 50px
  .sz-md  = 75px
  .sz-lg  = 110px
  .sz-xl  = 150px
  .sz-xxl = 200px

CUSTOM SIZE (inline):
  style="width: 85px;"

EXAMPLE:
  <div class="deco sz-md" style="top: 20px; left: 30px;">...</div>

═══════════════════════════════════════
ANIMATIONS
═══════════════════════════════════════

FLOATING:
  .a-float       (5s, normal)
  .a-float-slow  (7.5s)
  .a-float-fast  (3.5s)

WIGGLING (side-to-side rotation):
  .a-wiggle      (3.5s)
  .a-wiggle-slow (5s)
  .a-wiggle-fast (2.5s)

BREATHING (pulse + scale):
  .a-breathe     (4.5s)
  .a-breathe-slow (6s)
  .a-breathe-fast (3s)

SPINNING (full rotation):
  .a-spin        (16s forward)
  .a-spin-slow   (24s forward)
  .a-spin-fast   (10s forward)
  .a-spin-r      (16s reverse)
  .a-spin-r-slow (24s reverse)
  .a-spin-r-fast (10s reverse)

DRIFTING (horizontal movement):
  .a-drift       (6s)
  .a-drift-slow  (8s)
  .a-drift-fast  (4s)

PULSING (scale without vertical movement):
  .a-pulse       (4s)
  .a-pulse-slow  (6s)
  .a-pulse-fast  (2.5s)

DRAWING IN (reveal animation):
  .a-draw        (1.1s)
  .a-draw-slow   (2s)
  .a-draw-fast   (0.6s)

POPPING IN:
  .a-pop         (0.8s)
  .a-pop-slow    (1.2s)
  .a-pop-fast    (0.5s)

SLIDING IN:
  .a-slide       (0.9s)
  .a-slide-slow  (1.3s)
  .a-slide-fast  (0.6s)

NO ANIMATION:
  .a-none

EXAMPLE:
  <div class="deco sz-md a-float a-breathe" style="...">...</div>
  ERROR: Don't mix floating AND breathing. Choose ONE main animation.

═══════════════════════════════════════
OPACITY / VISIBILITY
═══════════════════════════════════════

PRESET OPACITY CLASSES:
  .op-vf = 0.08 (very faint, background-only)
  .op-f  = 0.12 (faint)
  .op-m  = 0.20 (medium)
  .op-h  = 0.30 (high)
  .op-vh = 0.40 (very high)

CUSTOM OPACITY (inline):
  style="opacity: 0.25;"

EXAMPLE:
  <div class="deco sz-lg a-float op-f" style="...">...</div>
  Large, floating, faint opacity.

═══════════════════════════════════════
ROTATION
═══════════════════════════════════════

PRESET ROTATION CLASSES:
  .r-0, .r-5, .r-10, .r-15, .r-20, .r-25
  .r-n5, .r-n10, .r-n15, .r-n20

CUSTOM ROTATION (inline):
  style="--rot: 12deg;"

EXAMPLE:
  <div class="deco sz-md a-wiggle r-15" style="...">...</div>
  Rotated 15deg, wiggling.

═══════════════════════════════════════
ANIMATION DELAYS
═══════════════════════════════════════

PRESET DELAY CLASSES:
  .delay-0 = 0s
  .delay-1 = 0.2s
  .delay-2 = 0.4s
  .delay-3 = 0.6s
  .delay-4 = 0.8s
  .delay-5 = 1s

CUSTOM DELAY (inline):
  style="animation-delay: 0.5s;"

USE CASE: Stagger animations across multiple SVGs
  <div class="deco a-float delay-0">...</div>
  <div class="deco a-float delay-2">...</div>
  <div class="deco a-float delay-4">...</div>

═══════════════════════════════════════
COMMON PATTERNS
═══════════════════════════════════════

CORNER ACCENT (faint, background-like):
  <div class="deco sz-lg a-float-slow op-vf r-8" 
       style="top: -8px; left: -8px;">
    <img src="assets/HandDrawn/13_Corners/..." alt="">
  </div>

FLOATING EMPHASIS (medium visibility, playful):
  <div class="deco sz-md a-wiggle op-h r-12" 
       style="top: 20px; right: 30px;">
    <img src="assets/HandDrawn/11_Punctuation/..." alt="">
  </div>

REVEAL ANIMATION (lines, underlines, arrows):
  <div class="deco sz-xl a-draw op-m" 
       style="top: 14px; left: 80px; animation-delay: 0.3s;">
    <img src="assets/HandDrawn/02_Underlines/..." alt="">
  </div>

SPINNING BACKGROUND (very faint):
  <div class="deco sz-xxl a-spin-r op-vf" 
       style="top: 50%; right: -40px; transform: translateY(-50%);">
    <img src="assets/HandDrawn/09_Spirals/..." alt="">
  </div>

STAGGERED SCATTER (multiple decorations with delays):
  <div class="deco sz-sm a-float delay-0 op-f" style="top: 10px; left: 10px;"></div>
  <div class="deco sz-md a-float delay-2 op-f" style="top: 80px; right: 20px;"></div>
  <div class="deco sz-lg a-float delay-4 op-f" style="bottom: 30px; left: 30px;"></div>

═══════════════════════════════════════
RESPONSIVE BEHAVIOR
═══════════════════════════════════════

All .deco elements automatically scale down on mobile:
  Screens < 700px: scale(0.8)
  Screens < 480px: scale(0.65)

Sizes also shrink proportionally. If you want to override:
  @media (max-width: 700px) {
    .my-special-deco { width: 50px !important; }
  }

═══════════════════════════════════════
QUICK MODIFIERS
═══════════════════════════════════════

Want to quickly move a decoration?
  Change the inline style: style="top: 40px; left: 50px;"

Want to make it faster?
  Change the animation class: a-float → a-float-fast

Want to make it more visible?
  Change opacity: op-vf → op-h

Want to stop all animations on one element?
  Add: .a-none

Want to stagger animations?
  Add: delay-0, delay-1, delay-2, etc.

═══════════════════════════════════════
ASSET REFERENCE
═══════════════════════════════════════

Asset categories available:
  01_Arrows/        (17 items) - directional, action-oriented
  02_Underlines/    (10 items) - below text, emphasis
  03_Loops/         (8 items)  - circular, enclosed
  04_Blobs/         (12 items) - organic shapes, background
  05_Whirls/        (8 items)  - swirling motion, complex spirals
  06_Scribbles/     (60 items) - diverse marks, energetic
  07_Lines/         (11 items) - simple, understated
  08_Donuts/        (2 items)  - circular with hole
  09_Spirals/       (8 items)  - centered spirals, mathematical feel
  10_Sprinkles/     (8 items)  - scattered small marks, playful
  11_Punctuation/   (9 items)  - asterisks, checkmarks, symbols
  12_Doodles/       (14 items) - sketch-like, varied shapes
  13_Corners/       (4 items)  - corner brackets, brackets

BEST USES:
  Background/filler:     Blobs, Spirals, Whirls (very faint, large)
  Emphasis:              Arrows, Punctuation, Underlines (medium opacity)
  Playful scatter:       Sprinkles, Doodles, Scribbles (varied sizes)
  Text underlining:      Underlines, Lines, Loops
  Motion/action:         Arrows, Whirls
  Corners/frames:        Corners, Loops

═══════════════════════════════════════
COMMAND-LINE WORKFLOW
═══════════════════════════════════════

To modify an SVG decoration:
1. Find its HTML element in the file
2. Adjust classes: add/remove animation, size, opacity classes
3. Adjust inline style: move with top/left/bottom/right
4. Test responsiveness

BEFORE:
  <div class="deco sz-lg a-float op-vf r-8" style="top: -8px; left: -8px;">

AFTER (move it, make it bigger, add delay):
  <div class="deco sz-xl a-float delay-3 op-h r-8" style="top: 20px; left: 30px;">

═══════════════════════════════════════
NO NEED TO REGENERATE CSS
═══════════════════════════════════════

All animation, size, and opacity classes are pre-defined in svg-decorations.css.
You only change the HTML classes and inline styles.
Add new animations by editing svg-decorations.css only.

Example: Add new animation duration
  .a-float-xslow { animation: svgFloat 10s ease-in-out infinite; }
Then use it immediately in HTML: <div class="deco a-float-xslow">