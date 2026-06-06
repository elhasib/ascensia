/* ASCENSIA — CURSOR */
(function(){
  if(window.matchMedia('(hover:none),(pointer:coarse)').matches)return;
  const c=document.getElementById('cur'),r=document.getElementById('cur-r');
  if(!c||!r)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    c.style.left=mx+'px';c.style.top=my+'px';
  });
  (function loop(){
    rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
    r.style.left=rx+'px';r.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover',e=>{
    if(e.target.closest('a,button,.btn,.t-card,.stat-cell,.pi'))
      document.body.dataset.h='1';
    else delete document.body.dataset.h;
  });
})();