var IT=[];LESSONS.forEach(function(l){IT.push({p:LPIC[l.id],k:"lesson",c:l.c,s:l.s,t:l.t,d:l.d,e:l.e,m:l.m,h:"lesson.html?id="+l.id});IT.push({p:LPIC[l.id],k:"game",c:l.c,s:l.s,t:l.t+" Quiz",d:"Play a quick quiz and win stars.",e:"🎮",m:"3 min",h:"lesson.html?id="+l.id+"&play=1"})});
GAMES.forEach(function(g){IT.push({k:"game",c:g.c,s:g.s,t:g.t,d:"38 picture games with sound for KG, UKG and Class 1.",e:g.e,m:"Many",h:"games.html"})});
var tab="all",cat="",sub="";
function $(i){return document.getElementById(i)}
function draw(){
 var L="",R="",col={},sc={};
 CL.forEach(function(x){col[x.id]=x;var h='<button class="cls" style="--c:'+x.c+'" data-c="'+x.id+'" aria-pressed="'+(cat===x.id)+'"><span class="bd">'+x.e+'</span><span>'+x.n+'<small>'+x.s+'</small></span><b>›</b></button>';if(x.p==="l")L+=h;else R+=h});
 SJ.forEach(function(x){sc[x.id]=x});
 $("cl").innerHTML=L;$("cr").innerHTML=R;
 $("sj").innerHTML=SJ.map(function(x){return '<button class="sj" style="--c:'+x.c+'" data-s="'+x.id+'" aria-pressed="'+(sub===x.id)+'"><i>'+x.e+'</i>'+x.n+'</button>'}).join("");
 var list=IT.filter(function(i){return (tab==="all"||i.k===tab)&&(!cat||i.c===cat)&&(!sub||i.s===sub)});
 $("grid").innerHTML=list.map(function(i){var c=col[i.c];return '<article class="card"><div class="art" style="--c:'+c.c+'" aria-hidden="true"><span class="tg">'+c.n+'</span>'+(i.p?'<img class=\"artimg\" src=\"assets/kids/'+i.p+'.png\" alt=\"\" width=\"84\" height=\"84\">':i.e)+'<span class="pl">'+(i.k==="game"?"🎮":"▶")+'</span></div><div class="body"><h3>'+i.t+'</h3><p>'+i.d+'</p><div class="meta"><span>'+(i.k==="game"?"Game":"Lesson")+' · '+sc[i.s].n+' · '+i.m+'</span><a class="play" href="'+i.h+'">'+(i.k==="game"?"Play":"Watch")+'</a></div></div></article>'}).join("")||'<p class="empty">Nothing here yet. Try another class or subject.</p>';
 $("ttl").textContent=cat?col[cat].n+" games & lessons":"All games & lessons";
 $("fl").textContent=(cat||sub)?"Filtered by "+[cat&&col[cat].n,sub&&sc[sub].n].filter(Boolean).join(" + ")+". Tap again to clear.":"Showing everything";
 document.querySelectorAll(".tab").forEach(function(b){b.setAttribute("aria-selected",b.dataset.t===tab)});
}
document.addEventListener("click",function(e){
 var c=e.target.closest(".cls");if(c){cat=cat===c.dataset.c?"":c.dataset.c;draw();$("browse").scrollIntoView();return}
 var s=e.target.closest(".sj");if(s){sub=sub===s.dataset.s?"":s.dataset.s;draw();$("browse").scrollIntoView();return}
 var t=e.target.closest(".tab");if(t){tab=t.dataset.t;draw();return}
 var g=e.target.closest("[data-go]");if(g){tab=g.dataset.go;draw()}
});
draw();
