/* Kids Corner v3.6: one page for every category (?c=class, subject or special id, optional &s=subject) */
(function(){
var q=new URLSearchParams(location.search),id=q.get("c")||"c2",sub=q.get("s")||"",tab="all",c=catById(id)||catById("c2");id=c.id;
function $(i){return document.getElementById(i)}
function btn(x){var on=x.id===id;return '<button class="cls" style="--c:'+x.c+'" data-c="'+x.id+'" aria-pressed="'+on+'"><span class="bd'+(x.img?' kid':'')+'">'+(x.img?'<img src="assets/kids/'+x.img+'" alt="">':x.e)+'</span><span>'+x.n+'<small>'+x.d+'</small></span><b>›</b></button>'}
$("cl").innerHTML=CATS.filter(function(x){return x.type==="class"}).map(btn).join("");
$("cr").innerHTML=CATS.filter(function(x){return x.type!=="class"}).map(btn).join("");
document.title=c.n+" – Kids Corner";$("cm").style.setProperty("--c",c.c);
function draw(){
 var all=catItems(id,sub),list=all.filter(function(i){return tab==="all"||i.k===tab});
 $("ct").innerHTML='<span class="ci">'+(c.img?'<img src="assets/kids/'+c.img+'" alt="">':c.e)+'</span>'+c.n+(sub?' · '+SC[sub].n:'');
 $("cd").textContent=all.length+" cards · "+c.d;
 var f='<button data-t="all" aria-pressed="'+(tab==="all")+'">All</button><button data-t="game" aria-pressed="'+(tab==="game")+'">🎮 Games</button><button data-t="lesson" aria-pressed="'+(tab==="lesson")+'">▶ Lessons</button>';
 if(c.type==="class")f+='<span style="flex-basis:100%"></span><button data-s="" aria-pressed="'+(!sub)+'">All subjects</button>'+SJ.map(function(x){return '<button data-s="'+x.id+'" aria-pressed="'+(sub===x.id)+'">'+x.e+' '+x.n+'</button>'}).join("");
 $("fl").innerHTML=f;
 $("grid").innerHTML=list.map(cardHtml).join("")||'<p class="empty">Nothing here yet. Try another category from the sides.</p>';
}
document.addEventListener("click",function(e){
 var b=e.target.closest(".cls");if(b){location.href="category.html?c="+b.dataset.c;return}
 var t=e.target.closest("[data-t]");if(t&&t.closest("#fl")){tab=t.dataset.t;draw();return}
 var s=e.target.closest("[data-s]");if(s&&s.closest("#fl")){sub=s.dataset.s;history.replaceState(null,"","category.html?c="+id+(sub?"&s="+sub:""));draw()}
});
$("bk").onclick=function(){if(history.length>1&&document.referrer&&document.referrer.indexOf(location.host)>-1)history.back();else location.href="index.html"};
draw();
})();
