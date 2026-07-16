/* ASCENSIA — CURSOR (pyramid, calm) */
(function(){
  if(window.matchMedia('(hover:none),(pointer:coarse)').matches)return;
  const c=document.getElementById('cur'),old=document.getElementById('cur-r');
  if(!c)return;
  if(old)old.remove();
  c.innerHTML='';

  let mx=0,my=0,rx=0,ry=0,rot=-90,trot=-90,lastX=0,lastY=0;
  document.addEventListener('mousemove',e=>{
    const dx=e.clientX-lastX,dy=e.clientY-lastY;
    lastX=e.clientX;lastY=e.clientY;
    mx=e.clientX;my=e.clientY;
    if(Math.hypot(dx,dy)>3) trot=Math.atan2(dy,dx)*180/Math.PI+90;
  });

  (function loop(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    let d=trot-rot;
    while(d>180)d-=360; while(d<-180)d+=360;
    rot+=d*.05;
    c.style.left=rx+'px';c.style.top=ry+'px';
    c.style.transform=`translate(-50%,-42%) rotate(${rot.toFixed(1)}deg)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover',e=>{
    if(e.target.closest('a,button,.btn,.t-card,.stat-cell,.pi,.adv-card'))
      document.body.dataset.h='1';
    else delete document.body.dataset.h;
  });
})();