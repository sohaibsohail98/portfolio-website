$('#chips').onclick=e=>{const c=e.target.closest('.chip');c&&run(c.dataset.k)};
$('#ctxbtn').onclick=e=>{const o=$('#ctxbtn').getAttribute('aria-expanded')==='true';
  $('#ctxbtn').setAttribute('aria-expanded',String(!o));$('#ctxpanel').classList.toggle('open',!o)};

$$('[data-n]').forEach(el=>{const t=+el.dataset.n,u=el.querySelector('em')?el.querySelector('em').outerHTML:'';
 if(rd){el.innerHTML=t+u;return}
 let s=null;requestAnimationFrame(function f(ts){if(!s)s=ts;const p=Math.min(1,(ts-s)/850);
  el.innerHTML=Math.round(t*(1-Math.pow(1-p,3)))+u;if(p<1)requestAnimationFrame(f)})});

if('IntersectionObserver' in window && !rd){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),
   {rootMargin:'-30px 0px -60px'});
  $$('.reveal').forEach(el=>io.observe(el));
}else $$('.reveal').forEach(el=>el.classList.add('in'));

addEventListener('scroll',()=>$('#nav').classList.toggle('on',scrollY>16),{passive:true});
$('#tt').onclick=e=>{const p=document.documentElement.dataset.theme==='paper';
 document.documentElement.dataset.theme=p?'dark':'paper';e.target.textContent=p?'◑':'◐'};
run('who');
