var tab="all",cat="",sub="";
function $(i){return document.getElementById(i)}
function draw(){
 var L="",R="",col={},sc={};
 CL.forEach(function(x){col[x.id]=x;var h='<button class="cls" style="--c:'+x.c+'" data-c="'+x.id+'" aria-pressed="'+(cat===x.id)+'"><span class="bd'+(x.img?' kid':'')+'">'+(x.img?'<img src="assets/kids/'+x.img+'" alt="">':x.e)+'</span><span>'+x.n+'<small>'+x.s+'</small></span><b>›</b></button>';if(x.p==="l")L+=h;else R+=h});
 SJ.forEach(function(x){sc[x.id]=x});
 $("cl").innerHTML=L;$("cr").innerHTML=R;
 $("sj").innerHTML=SJ.map(function(x){return '<button class="sj" style="--c:'+x.c+'" data-s="'+x.id+'" aria-pressed="'+(sub===x.id)+'"><i>'+x.e+'</i>'+x.n+'</button>'}).join("");
 var list=IT.filter(function(i){return (tab==="all"||i.k===tab)&&(!cat||i.c===cat)&&(!sub||i.s===sub)});
 $("grid").innerHTML=list.map(cardHtml).join("")||'<p class="empty">Nothing here yet. Try another class or subject.</p>';
 $("ttl").textContent=cat?col[cat].n+" games & lessons":"All games & lessons";
 $("fl").textContent=(cat||sub)?"Filtered by "+[cat&&col[cat].n,sub&&sc[sub].n].filter(Boolean).join(" + ")+". Tap again to clear.":"Showing everything";
 document.querySelectorAll(".tab").forEach(function(b){b.setAttribute("aria-selected",b.dataset.t===tab)});
}
document.addEventListener("click",function(e){
 var c=e.target.closest(".cls");if(c){location.href="category.html?c="+c.dataset.c;return}
 var s=e.target.closest(".sj");if(s){location.href="category.html?c="+s.dataset.s;return}
 var t=e.target.closest(".tab");if(t){tab=t.dataset.t;draw();return}
 var g=e.target.closest("[data-go]");if(g){tab=g.dataset.go;draw()}
});
function hub(){var g=function(t){return CATS.filter(function(c){return c.type===t}).map(function(c){return '<a class="catt" style="--c:'+c.c+'" href="category.html?c='+c.id+'"><span class="ci">'+(c.img?'<img src="assets/kids/'+c.img+'" alt="">':c.e)+'</span><b>'+c.n+'</b><small>'+catItems(c.id).length+(catItems(c.id).length===1?' card':' cards')+'</small></a>'}).join("")};
 $("cat1").innerHTML=g("class");$("cat2").innerHTML=g("subject");$("cat3").innerHTML=g("special")}
hub();draw();
