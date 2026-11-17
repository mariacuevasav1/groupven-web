(()=>{
const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
if(preference.matches||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
const animations=new Set();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{
if(!entry.isIntersecting)return;
const el=entry.target;
observer.unobserve(el);
const animation=el.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:720,delay:Number(el.dataset.motionDelay||0),easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});
animations.add(animation);animation.onfinish=()=>animations.delete(animation);
});},{threshold:.08});
document.querySelectorAll('.project,.support-grid article,.stories-intro,.story,.portfolio-ai-copy,.portfolio-contact-copy,.portrait-main,.portrait-work,.portrait-contact,.testimonials-hero>p,.portfolio-hero-copy>h1,.portfolio-intro,.hero h1,.hero-bottom,.faq>h2,.faq>details,.contact h2,.contact-bottom,.testimonials-contact>h2,.testimonials-contact>p').forEach(el=>{
if(el.closest('.reveal'))return;
if(el.parentElement.matches('.support-grid'))el.dataset.motionDelay=String(Array.from(el.parentElement.children).indexOf(el)*90);
observer.observe(el);
});
preference.addEventListener('change',event=>{if(event.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();}});
})();
