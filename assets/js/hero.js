/* Hero centre: lesson cards and game cards (data comes from data.js and picgames.js) */
(function(){
var $=function(i){return document.getElementById(i)},cl={},by={};
CL.forEach(function(x){cl[x.id]=x});LESSONS.forEach(function(l){by[l.id]=l});
var LI=["c2-tables","kg-abc","kg-numbers","c1-add","ukg-fruits","c3-mul","ukg-animals","c4-solar","c5-fractions","c1-hindi","kg-colours","c5-symbols"];
var GI=["balloon","train","match","count","add","words","numbers","abc","hindi","sub","clock","coins"];
var ALT={"c2-tables":{h:"tables.html",p:"apple",d:"Pictures fall into groups: 1 × 2 = 2, 2 × 2 = 4 … up to table 10.",nw:1}};
function card(href,col,tag,pic,t,d,go,nw){return'<a class="mc" href="'+href+'" style="--c:'+col+'"><span class="mart"><span class="mtg">'+tag+'</span>'+(nw?'<i class="nw">NEW</i>':'')+'<img src="assets/kids/'+pic+'.png" alt="" width="84" height="84" loading="lazy"></span><span class="mb"><strong>'+t+'</strong><small>'+d+'</small><em>'+go+'</em></span></a>'}
var h="";
LI.forEach(function(id){var l=by[id];if(!l)return;var a=ALT[id]||{},c=cl[l.c];
 h+=card(a.h||"lesson.html?id="+id,c.c,c.n,a.p||LPIC[id]||"star",l.t,a.d||l.d,"Watch ▶",a.nw)});
$("hl-l").innerHTML=h;
var gh=card("tables.html#play","#0ea5e9","Class 2","car","Catch the Answer","Answers fall down. Tap the right one before it lands!","Play ▶",1),m={},pc=["#ff6b6b","#ff9f43","#22a559","#14b8a6","#3b82f6","#8b5cf6","#ec4899","#e0a800"];
PG.forEach(function(x){m[x.id]=x});
GI.forEach(function(id,i){var x=m[id];if(!x)return;gh+=card("games.html#"+id,pc[i%pc.length],x.lv.join(" · "),x.p,x.t,x.d,"Play ▶")});
$("hl-g").innerHTML=gh;
document.addEventListener("click",function(e){var b=e.target.closest(".sa");if(!b)return;var s=$(b.dataset.for);s.scrollBy({left:+b.dataset.d*Math.max(220,s.clientWidth*.8),behavior:"smooth"})});
})();
