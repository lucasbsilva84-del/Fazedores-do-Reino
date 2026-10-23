const scene=document.querySelector('#scene');const degrees=document.querySelector('#degrees');let angle=0,lastX=null;
function render(){scene.style.setProperty('--pan',`${Math.sin(angle*Math.PI/180)*500}px`);degrees.textContent=String(Math.round((angle%360+360)%360)).padStart(3,'0')+'°';}
function move(delta){angle+=delta;render();}
scene.addEventListener('pointerdown',e=>{lastX=e.clientX;scene.setPointerCapture(e.pointerId);});
scene.addEventListener('pointermove',e=>{if(lastX!==null){move((e.clientX-lastX)*.3);lastX=e.clientX;}});
for(const event of ['pointerup','pointercancel','lostpointercapture'])scene.addEventListener(event,()=>lastX=null);
document.querySelector('#left').addEventListener('click',()=>move(-15));document.querySelector('#right').addEventListener('click',()=>move(15));document.querySelector('#reset').addEventListener('click',()=>{angle=0;render();});
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-10:10);}});
const full=document.querySelector('#fullscreen');if(!document.fullscreenEnabled)full.hidden=true;
full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.querySelector('#status').textContent='Tela cheia indisponível neste navegador.';}});
document.addEventListener('fullscreenchange',()=>full.textContent=document.fullscreenElement?'Sair da tela cheia':'Tela cheia');
