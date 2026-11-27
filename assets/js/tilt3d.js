/* Kids Corner v3.2: mouse tilt for any .side panel (desktop mouse only). */
(function(){
if(!window.matchMedia||!matchMedia("(hover:hover) and (pointer:fine)").matches||matchMedia("(prefers-reduced-motion:reduce)").matches)return;
function arm(el){el.setAttribute("data-tilt","");
el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
el.style.transform="perspective(900px) rotateY("+(x*12).toFixed(2)+"deg) rotateX("+(-y*9).toFixed(2)+"deg)"});
el.addEventListener("mouseleave",function(){el.style.transform=""})}
Array.prototype.forEach.call(document.querySelectorAll(".side"),arm);
})();
