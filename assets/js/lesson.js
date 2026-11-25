(function(){var $=function(i){return document.getElementById(i)},U=new URLSearchParams(location.search),L=null,i,n,s,k,Q,qi,sc;
for(i=0;i<LESSONS.length;i++)if(LESSONS[i].id===U.get("id"))L=LESSONS[i];
if(!L){$("lt").textContent="Lesson not found";return}
document.title=L.t+" – Kids Corner";$("lt").textContent=L.e+" "+L.t;$("ld").textContent=L.d;var cd=L.cards,ix=0;
function R(n){return Math.floor(Math.random()*n)}function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=R(i+1),t=a[i];a[i]=a[j];a[j]=t}return a}
function show(){var c=cd[ix];$("fc").innerHTML='<div class="big">'+c[0]+'</div>'+(c[2]?'<div class="em">'+c[2]+'</div>':'')+'<div class="sm">'+c[1]+'</div>';$("cn").textContent=(ix+1)+" / "+cd.length;
var h="";cd.forEach(function(x,j){h+='<button class="chip" data-i="'+j+'" aria-pressed="'+(j===ix)+'">'+x[0]+'</button>'});$("chips").innerHTML=h}
function say(){if(!window.speechSynthesis)return;var c=cd[ix],u=new SpeechSynthesisUtterance(c[0]+". "+c[1]);u.lang=L.lg||"en-IN";u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}
$("pv").onclick=function(){ix=(ix+cd.length-1)%cd.length;show()};$("nx").onclick=function(){ix=(ix+1)%cd.length;show()};$("sp").onclick=say;
$("chips").onclick=function(e){var b=e.target.closest(".chip");if(b){ix=+b.dataset.i;show()}};
function nopts(a){var o=[a,a+1,a-1,a+2,a+10,a-10,a+5].filter(function(v,j,r){return v>=0&&r.indexOf(v)===j}).slice(0,4);return sh(o).map(String)}
function num(q,a){return{q:q,o:nopts(a),a:String(a)}}
function gen(){var t=L.gen,a,b;
if(t==="add"){a=1+R(10);b=1+R(10);return num(a+" + "+b+" = ?",a+b)}
if(t==="sub"){a=6+R(15);b=1+R(a-1);return num(a+" − "+b+" = ?",a-b)}
if(t==="tab"){a=L.tab[R(L.tab.length)];b=1+R(10);return num(a+" × "+b+" = ?",a*b)}
if(t==="add3"){a=100+R(700);b=100+R(200);return R(2)?num(a+" + "+b+" = ?",a+b):num((a+b)+" − "+b+" = ?",a)}
if(R(2)){a=11+R(19);b=2+R(8);return num(a+" × "+b+" = ?",a*b)}b=2+R(8);a=2+R(9);return num((a*b)+" ÷ "+b+" = ?",a)}
function build(){var r=[],j;if(L.gen){for(j=0;j<8;j++)r.push(gen());return r}
if(L.q)return sh(L.q).slice(0,8).map(function(x){return{q:x[0],o:x[1],a:x[1][x[2]]}});
return sh(cd).slice(0,8).map(function(c){var d=sh(cd.filter(function(z){return z[1]!==c[1]})).map(function(z){return z[1]}).filter(function(v,j,a){return a.indexOf(v)===j}).slice(0,3);return{q:(L.qt||"Pick the match for {b}").replace("{b}",c[0]),o:sh(d.concat(c[1])),a:c[1]}})}
function ask(){if(qi>=Q.length)return end();var x=Q[qi];$("qn").textContent="Question "+(qi+1)+" / "+Q.length;$("qs").textContent="⭐ "+sc;$("qq").textContent=x.q;
$("qo").innerHTML=x.o.map(function(o){return'<button class="opt">'+o+'</button>'}).join("");$("qr").hidden=true}
$("qo").onclick=function(e){var b=e.target.closest(".opt");if(!b||b.disabled)return;var x=Q[qi],ok=b.textContent===x.a;Array.prototype.forEach.call(document.querySelectorAll(".opt"),function(o){o.disabled=true;if(o.textContent===x.a)o.classList.add("ok")});
if(ok)sc++;else b.classList.add("no");$("qs").textContent="⭐ "+sc;setTimeout(function(){qi++;ask()},900)};
function end(){var t=0;try{t=(+localStorage.getItem("kcStars")||0)+sc;localStorage.setItem("kcStars",t)}catch(e){}
$("qq").textContent=sc>=Q.length-1?"Superstar! 🏆":sc>=Q.length/2?"Well done! 👏":"Good try! Keep practising 💪";$("qo").innerHTML="";$("qn").textContent="You scored "+sc+" out of "+Q.length;
$("qr").hidden=false;$("qr").innerHTML='<p>You won '+sc+' star'+(sc===1?"":"s")+(t?" · total ⭐ "+t:"")+'</p><button class="btn y" id="ag">Play again</button> <a class="btn" href="index.html#browse">More lessons</a>';$("ag").onclick=play}
function play(){Q=build();qi=0;sc=0;$("learn").hidden=true;$("quiz").hidden=false;$("tl").setAttribute("aria-selected","false");$("tq").setAttribute("aria-selected","true");ask()}
$("tq").onclick=play;$("tl").onclick=function(){$("quiz").hidden=true;$("learn").hidden=false;$("tl").setAttribute("aria-selected","true");$("tq").setAttribute("aria-selected","false")};
show();if(U.get("play"))play()})();