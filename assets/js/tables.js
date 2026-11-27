(function(){
"use strict";
var $=function(i){return document.getElementById(i)};
/* "mt": 3 x 2 = 6 (3 groups of 2, the way you wrote it)   "tm": 2 x 3 = 6 (school style) */
var ORDER="mt";
var TH={
 2:{img:"apple",one:"apple",many:"apples",c:"#ef4444"},
 3:{img:"car",one:"car",many:"cars",c:"#f97316"},
 4:{img:"ball",one:"ball",many:"balls",c:"#0ea5e9"},
 5:{img:"mango",one:"mango",many:"mangoes",c:"#d99a00"},
 6:{img:"strawberry",one:"strawberry",many:"strawberries",c:"#e11d48"},
 7:{img:"bus",one:"bus",many:"buses",c:"#7c3aed"},
 8:{img:"balloon",one:"balloon",many:"balloons",c:"#14b8a6"},
 9:{img:"watermelon",one:"watermelon",many:"watermelons",c:"#16a34a"},
 10:{img:"star",one:"star",many:"stars",c:"#ec4899"}
};
var P=new URLSearchParams(location.search),cur=+P.get("t")||2;if(!TH[cur])cur=2;
var snd=true;try{snd=localStorage.getItem("kc_snd")!=="0"}catch(e){}
function rnd(n){return Math.floor(Math.random()*n)}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=rnd(i+1),t=a[i];a[i]=a[j];a[j]=t}return a}
function src(t){return "assets/kids/"+TH[t].img+".png"}
function say(txt,queue){if(!snd||!window.speechSynthesis)return;try{if(!queue)speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(txt);u.lang="en-IN";u.rate=.95;speechSynthesis.speak(u)}catch(e){}}
function eq(m,t){return ORDER==="mt"?[m,t]:[t,m]}
function words(m,t){var e=eq(m,t);return e[0]+" times "+e[1]+" is "+m*t}

/* ---------- falling fruits, cars and balls in the background ---------- */
(function(){var names=["apple","car","ball","mango","strawberry","bus","balloon","watermelon","star","orange"],h="";
 for(var i=0;i<16;i++)h+='<img alt="" src="assets/kids/'+names[i%names.length]+'.png" style="--x:'+(3+Math.round(i*6.1)%92)+'%;--w:'+(34+rnd(30))+'px;--d:'+(9+rnd(9))+'s;--dl:-'+rnd(16)+'s">';
 $("rain").innerHTML=h})();

/* ---------- sound toggle ---------- */
function sndBtn(){$("snd").textContent=snd?"🔊 Sound on":"🔇 Sound off"}
$("snd").onclick=function(){snd=!snd;try{localStorage.setItem("kc_snd",snd?"1":"0")}catch(e){}if(!snd&&window.speechSynthesis)speechSynthesis.cancel();sndBtn()};
sndBtn();

/* ---------- table picker ---------- */
function pickBar(){var h="";for(var t=2;t<=10;t++)h+='<button class="pk" style="--c:'+TH[t].c+'" data-t="'+t+'" aria-pressed="'+(t===cur)+'"><img src="'+src(t)+'" alt="" width="38" height="38"><span>'+t+'</span></button>';$("pick").innerHTML=h}

/* ---------- one table ---------- */
var run=0,timers=[];
function later(f,ms){var id=setTimeout(f,ms);timers.push(id);return id}
function stopAll(){run++;timers.forEach(clearTimeout);timers=[];if(window.speechSynthesis)try{speechSynthesis.cancel()}catch(e){}
 document.querySelectorAll(".xrow").forEach(function(r){r.classList.remove("playing");var a=r.querySelector(".a");a.textContent=a.dataset.a;a.classList.remove("pop")});
 var pa=$("pa");if(pa)pa.textContent="▶ Play whole table"}
function rowHTML(m,t){
 var e=eq(m,t),g="",j,i;
 for(i=1;i<=m;i++){var im="";for(j=0;j<t;j++)im+='<img alt="" src="'+src(t)+'" style="--i:'+j+'" loading="lazy">';
  g+='<div class="xg"><div class="xp" style="--cols:'+Math.min(t,5)+'">'+im+'</div><span class="xr">'+i*t+'</span></div>'}
 return '<div class="xrow" data-m="'+m+'"><div class="xeq"><span class="'+(ORDER==="mt"?"m":"t")+'">'+e[0]+'</span><span class="o">×</span><span class="'+(ORDER==="mt"?"t":"m")+'">'+e[1]+'</span><span class="o">=</span><span class="a" data-a="'+m*t+'">'+m*t+'</span></div><div class="xgs">'+g+'</div><button class="xrp" aria-label="Play '+words(m,t)+'">▶</button></div>'}
function table(){
 var t=cur,T=TH[t],h='<div class="tph" style="--c:'+T.c+'"><img class="big" src="'+src(t)+'" alt="" width="84" height="84"><div><h2>Table of '+t+'</h2><p>Every group has '+t+' '+T.many+'. Tap a line and watch them fall!</p></div><div class="acts"><button class="btn y" id="pa">▶ Play whole table</button><button class="btn" id="rd">🔊 Read it</button></div></div><div class="rows" style="--c:'+T.c+'">';
 for(var m=1;m<=10;m++)h+=rowHTML(m,t);
 $("tp").innerHTML=h+'</div>';
 history.replaceState(null,"","?t="+t+location.hash)}
function playRow(m){
 return new Promise(function(done){
  var my=++run,row=document.querySelector('.xrow[data-m="'+m+'"]'),t=cur,gs=row.querySelectorAll(".xg"),a=row.querySelector(".a"),i=0;
  timers.forEach(clearTimeout);timers=[];
  document.querySelectorAll(".xrow.playing").forEach(function(r){r.classList.remove("playing")});
  gs.forEach(function(g){g.classList.remove("show")});
  row.classList.add("playing");a.textContent="?";a.classList.remove("pop");
  if(window.speechSynthesis)try{speechSynthesis.cancel()}catch(e){}
  function step(){
   if(my!==run){done();return}
   if(i<gs.length){var g=gs[i];void g.offsetWidth;g.classList.add("show");say(String((i+1)*t),true);i++;later(step,820)}
   else{a.textContent=a.dataset.a;a.classList.add("pop");say(words(m,t),true);later(function(){row.classList.remove("playing");done()},1500)}
  }
  later(step,150)})}
function playAll(){
 var btn=$("pa");btn.textContent="■ Stop";
 (async function(){
  for(var m=1;m<=10;m++){
   var row=document.querySelector('.xrow[data-m="'+m+'"]');row.scrollIntoView({block:"center",behavior:"smooth"});
   await playRow(m);
   if(!$("pa")||$("pa").textContent!=="■ Stop")return}
  btn.textContent="▶ Play whole table"})()}
document.addEventListener("click",function(e){
 var pk=e.target.closest(".pk");if(pk){stopAll();cur=+pk.dataset.t;pickBar();table();return}
 if(e.target.id==="pa"){if(e.target.textContent==="■ Stop"){stopAll();return}playAll();return}
 if(e.target.id==="rd"){stopAll();var t=cur,s="Table of "+t+". ";for(var m=1;m<=10;m++)s+=words(m,t)+". ";say(s);return}
 var r=e.target.closest(".xrow");if(r){var wasAll=$("pa")&&$("pa").textContent==="■ Stop";if(wasAll)stopAll();playRow(+r.dataset.m)}
});
pickBar();table();

/* ---------- Catch the Answer (falling answers game) ---------- */
var G={n:0,sc:0,Q:[],wrong:false,over:false,tm:null,D:8},TOTAL=8;
function makeQ(){
 var seen={},Q=[],g=$("gt").value,t,m,k=0;
 while(Q.length<TOTAL&&k++<200){t=g==="mix"?2+rnd(9):cur;m=1+rnd(10);if(seen[t+"x"+m])continue;seen[t+"x"+m]=1;Q.push({t:t,m:m})}
 return Q}
function options(t,m){
 var a=t*m,c=shuf([t*(m+1),t*(m-1),t*(m+2),t*(m-2),a+1,a-1,a+10,a-10,a+t+1]).filter(function(v,i,r){return v>0&&v!==a&&r.indexOf(v)===i}).slice(0,3);
 return shuf([a].concat(c))}
function bar(){var q=G.Q[G.n];$("gq").textContent=q?eq(q.m,q.t)[0]+" × "+eq(q.m,q.t)[1]+" = ?":"";$("gs").textContent="Question "+Math.min(G.n+1,TOTAL)+" of "+TOTAL+" · ⭐ "+G.sc}
function startGame(){
 G.Q=makeQ();G.n=0;G.sc=0;G.over=false;G.D=+$("gsp").value;$("gover").hidden=true;$("gfb").textContent="";nextQ()}
function clearArena(){clearTimeout(G.tm);$("arena").querySelectorAll(".fb").forEach(function(b){b.remove()})}
function nextQ(){
 clearArena();
 if(G.n>=TOTAL)return finish();
 var q=G.Q[G.n],ar=$("arena"),opts=options(q.t,q.m),lanes=shuf([0,1,2,3]),dl=shuf([0,.7,1.4,2.1]),h="";
 G.wrong=false;bar();ar.style.setProperty("--h",(ar.clientHeight+10)+"px");
 opts.forEach(function(v,i){h+='<button class="fb" aria-label="Answer '+v+'" data-v="'+v+'" style="left:'+(lanes[i]*25+1.5)+'%;animation-duration:'+G.D+'s;animation-delay:'+dl[i]+'s"><img src="'+src(q.t)+'" alt=""><b>'+v+'</b></button>'});
 ar.insertAdjacentHTML("beforeend",h);
 say(eq(q.m,q.t)[0]+" times "+eq(q.m,q.t)[1]);
 G.tm=setTimeout(function(){if(G.over)return;$("gfb").textContent="⏰ Time's up! "+words(q.m,q.t);say(words(q.m,q.t));G.n++;setTimeout(nextQ,1600)},(G.D+2.4)*1000)}
$("arena").addEventListener("click",function(e){
 var b=e.target.closest(".fb");if(!b||b.classList.contains("no")||b.classList.contains("ok")||G.over)return;
 var q=G.Q[G.n];if(!q)return;
 if(+b.dataset.v===q.m*q.t){
  clearTimeout(G.tm);b.classList.add("ok");if(!G.wrong)G.sc++;
  $("gfb").textContent=G.wrong?"✅ Correct!":"🎉 Great job!";say(words(q.m,q.t));bar();
  document.querySelectorAll(".fb").forEach(function(x){if(x!==b)x.style.visibility="hidden"});
  G.n++;G.tm=setTimeout(nextQ,1500)}
 else{G.wrong=true;b.classList.add("no");$("gfb").textContent="Oops! Try another one.";say("Try again")}
});
function finish(){
 G.over=true;var s=G.sc>=TOTAL?3:G.sc>=TOTAL-2?2:G.sc>=TOTAL/2?1:0,st="";
 try{var o=JSON.parse(localStorage.getItem("kc_lessons")||"{}");if(s>(o["c2-tables"]||0)){o["c2-tables"]=s;localStorage.setItem("kc_lessons",JSON.stringify(o))}}catch(e){}
 for(var i=1;i<=3;i++)st+='<span style="color:'+(i<=s?"#f59e0b":"#d9d4ea")+'">★</span>';
 $("gfb").textContent="";$("gq").textContent="";$("gs").textContent="Game over";
 $("gover").hidden=false;
 $("gover").innerHTML='<div><div style="font-size:3rem">'+(s?"🏆":"💪")+'</div><h3>You scored '+G.sc+' out of '+TOTAL+'</h3><div style="font-size:2.6rem">'+st+'</div><p>'+(s===3?"Perfect! Amazing work!":s?"Well done! Try again for more stars.":"Keep practising. Play the table above and try again.")+'</p><button class="btn y" id="gagain">Play again</button></div>';
 say(s===3?"Perfect! Amazing work!":"Well done!")}
$("gover").addEventListener("click",function(e){if(e.target.id==="gstart"||e.target.id==="gagain")startGame()});
$("gt").addEventListener("change",function(){if(!G.over&&G.Q.length)startGame()});
$("gsp").addEventListener("change",function(){if(!G.over&&G.Q.length)startGame()});
})();
