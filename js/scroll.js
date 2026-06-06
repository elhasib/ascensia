/* ASCENSIA — SCROLL & NAV */
(function(){

  /* hero headline */
  document.querySelectorAll('.hero-line span').forEach(s=>s.classList.add('go'));

  /* reveal on scroll */
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.mk,.mk-r').forEach((m,i)=>{
        setTimeout(()=>m.classList.add('in'),180+i*160);
      });
      io.unobserve(e.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -28px 0px'});
  document.querySelectorAll('.r').forEach(el=>io.observe(el));

  /* hero markers fire after headline animation */
  setTimeout(()=>{
    document.querySelectorAll('.hero .mk,.hero .mk-r').forEach(m=>m.classList.add('in'));
  },1400);

  /* nav scroll class */
  const nav=document.querySelector('.nav');
  if(nav){
    window.addEventListener('scroll',()=>{
      nav.classList.toggle('scrolled',window.scrollY>40);
    },{passive:true});
  }

  /* mobile nav */
  const burger=document.querySelector('.nav-burger');
  const mob=document.querySelector('.nav-mobile');
  if(burger&&mob){
    burger.addEventListener('click',()=>{
      const open=burger.classList.toggle('open');
      mob.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    });
    mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      burger.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow='';
    }));
  }

  /* smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.getElementById(a.getAttribute('href').slice(1));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });

})();