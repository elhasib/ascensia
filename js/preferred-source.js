/* Google preferred-source badge.
   Shows once. Hidden for good after the visitor either adds Ascensia or
   dismisses it. The flag lives in that browser only — it never leaves the
   device and is not readable by us, so storage being unavailable (private
   windows, blocked site data) simply means the badge keeps showing. */
(function () {
  'use strict';

  var KEY  = 'ascensia:prefsrc-dismissed';
  var wrap = document.querySelector('.pref-source');
  if (!wrap) return;

  function isDone() {
    try { return localStorage.getItem(KEY) === '1'; }
    catch (e) { return false; }          // storage blocked -> just show it
  }

  function markDone() {
    try { localStorage.setItem(KEY, '1'); }
    catch (e) { /* nothing we can do, and nothing that needs doing */ }
  }

  // Already handled on a previous visit or page: remove before it is ever seen.
  // This script sits at the end of <body> and the badge lives in the footer,
  // so this runs long before the badge can scroll into view.
  if (isDone()) {
    wrap.parentNode && wrap.parentNode.removeChild(wrap);
    return;
  }

  var link  = wrap.querySelector('.pref-source-btn');
  var close = wrap.querySelector('.pref-source-close');

  // Clicking through to Google counts as handled, but don't yank the element
  // out from under the click — let it disappear on the next page view.
  if (link) {
    link.addEventListener('click', function () { markDone(); });
  }

  if (close) {
    close.addEventListener('click', function () {
      markDone();
      wrap.classList.add('pref-source--gone');
      var done = false;
      function drop() {
        if (done) return;
        done = true;
        wrap.parentNode && wrap.parentNode.removeChild(wrap);
      }
      wrap.addEventListener('transitionend', drop);
      setTimeout(drop, 500);   // fallback if transitions are off
    });
  }
})();
