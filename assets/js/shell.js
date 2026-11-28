/* Kids Corner v3.6: on every page. Colour theme button, Back button and Golu the helper. */
(function(){
var H=document.documentElement,TH=[["light","Light","☀️"],["dark","Dark","🌙"],["night","Night","🌌"],["ocean","Ocean","🌊"],["sunset","Sunset","🌅"],["forest","Forest","🌳"],["candy","Candy","🍭"]];
function getT(){try{return localStorage.getItem("kc_theme")||"light"}catch(e){return"light"}}
function setT(t){try{localStorage.setItem("kc_theme",t)}catch(e){}if(t==="light")H.removeAttribute("data-theme");else H.setAttribute("data-theme",t)}
setT(getT());
var css=document.createElement("style");css.textContent=
".kc-tw{position:relative;display:inline-block}.kc-tb,.kc-back{font:inherit;font-weight:800;border:0;border-radius:999px;padding:9px 16px;cursor:pointer;background:var(--card,#fff);color:var(--ink,#1d1340);box-shadow:0 4px 0 var(--line,#e6e0f5);text-decoration:none;white-space:nowrap}"+
".top .logo,.top nav a,.top .btn,.kc-tb,.kc-back{white-space:nowrap}.top{flex-wrap:wrap;row-gap:8px}.kc-tb,.kc-back{padding:8px 14px}.kc-tb:hover,.kc-back:hover{transform:translateY(-2px)}.kc-tm{position:absolute;right:0;top:calc(100% + 8px);z-index:90;background:var(--card,#fff);border-radius:20px;padding:8px;min-width:170px;box-shadow:0 8px 0 var(--line,#e6e0f5),0 18px 30px rgba(0,0,0,.22);display:none}.kc-tm.on{display:block}"+
".kc-tm button{display:flex;gap:10px;align-items:center;width:100%;font:inherit;font-weight:700;border:0;background:transparent;color:var(--ink,#1d1340);padding:8px 12px;border-radius:12px;cursor:pointer;text-align:left}.kc-tm button:hover,.kc-tm button[aria-pressed=true]{background:var(--bg,#f4f1fb)}"+
/* Golu */
".golu-fab{position:fixed;right:14px;bottom:14px;z-index:80;width:74px;height:74px;border-radius:50%;border:4px solid #ffc928;background:#fff;padding:0;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.18),0 12px 22px rgba(0,0,0,.25);overflow:hidden;animation:gbob 2.4s ease-in-out infinite}.golu-fab img{width:100%;height:100%;object-fit:cover;object-position:top}"+
"@keyframes gbob{50%{transform:translateY(-6px)}}body:has(.kdock) .golu-fab,body:has(.kdock) .golu-tip,body:has(.kdock) .golu-p{bottom:96px}"+
".golu-tip{position:fixed;right:96px;bottom:34px;z-index:80;background:#fff;color:#1d1340;border:3px solid #ffc928;border-radius:16px;padding:6px 12px;font-weight:800;font-family:'Baloo 2',system-ui,sans-serif;box-shadow:0 5px 0 rgba(0,0,0,.12);display:none}.golu-tip.on{display:block;animation:in .3s}"+
".golu-p{position:fixed;right:14px;bottom:98px;z-index:85;width:min(370px,calc(100vw - 24px));height:min(580px,calc(100vh - 120px));display:none;flex-direction:column;background:var(--card,#fff);color:var(--ink,#1d1340);border-radius:26px;box-shadow:0 8px 0 var(--line,#e6e0f5),0 22px 44px rgba(0,0,0,.32);overflow:hidden;font-family:'Baloo 2',system-ui,sans-serif}.golu-p.on{display:flex;animation:in .25s}"+
"@keyframes in{from{opacity:0;transform:translateY(12px) scale(.97)}}"+
".golu-h{display:flex;align-items:center;gap:10px;padding:10px 12px;background:linear-gradient(135deg,var(--v,#5b2fc9),var(--v2,#7b4ff0));color:#fff}.golu-h img{width:46px;height:46px;border-radius:50%;border:3px solid #ffc928;object-fit:cover;object-position:top;background:#fff}.golu-h div{flex:1;line-height:1.1}.golu-h b{font-size:1.2rem}.golu-h small{opacity:.9}.golu-h button{font:inherit;border:0;background:rgba(255,255,255,.2);color:#fff;border-radius:50%;width:34px;height:34px;cursor:pointer;font-weight:800}"+
".golu-m{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:var(--bg,#f4f1fb)}.gm,.um{max-width:86%;padding:8px 12px;border-radius:18px;font-weight:600;line-height:1.3;animation:in .25s;word-wrap:break-word}.gm{align-self:flex-start;background:var(--card,#fff);border:2px solid var(--line,#e6e0f5);border-bottom-left-radius:4px}.um{align-self:flex-end;background:var(--v,#5b2fc9);color:#fff;border-bottom-right-radius:4px}"+
".gc{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:100%}.gc a,.gc button{font:inherit;font-weight:800;font-size:.95rem;text-decoration:none;border:2px solid var(--c,#7c4dff);color:var(--ink,#1d1340);background:var(--card,#fff);border-radius:999px;padding:5px 12px;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.1)}.gc a.go{background:var(--c,#7c4dff);color:#fff}.gc a:hover,.gc button:hover{transform:translateY(-2px)}"+
".golu-f{display:flex;gap:6px;padding:8px;border-top:2px solid var(--line,#e6e0f5);background:var(--card,#fff)}.golu-f input{flex:1;min-width:0;font:inherit;font-weight:600;border:2px solid var(--line,#e6e0f5);border-radius:999px;padding:8px 14px;background:var(--bg,#f4f1fb);color:var(--ink,#1d1340)}.golu-f button{font:inherit;font-weight:800;border:0;border-radius:999px;padding:8px 16px;background:#22a559;color:#fff;cursor:pointer;box-shadow:0 3px 0 #15803d}"+
"@media(prefers-reduced-motion:reduce){*{animation:none!important}}";
document.head.appendChild(css);
function ready(f){if(document.readyState!=="loading")f();else document.addEventListener("DOMContentLoaded",f)}
ready(function(){
 var top=document.querySelector(".top"),isHome=/(^|\/)(index\.html)?$/.test(location.pathname);
 if(top&&getComputedStyle(H).getPropertyValue("--card")){
  if(!isHome&&!document.querySelector(".kc-back")&&!document.getElementById("bk")){var b=document.createElement("a");b.className="kc-back";b.href="index.html";b.textContent="← Back";b.onclick=function(e){if(history.length>1&&document.referrer&&document.referrer.indexOf(location.host)>-1){e.preventDefault();history.back()}};var lg=top.querySelector(".logo");lg?lg.insertAdjacentElement("afterend",b):top.insertAdjacentElement("afterbegin",b)}
  var w=document.createElement("span");w.className="kc-tw";w.innerHTML='<button class="kc-tb" aria-haspopup="true" aria-expanded="false">🎨 Theme</button><div class="kc-tm" role="menu"></div>';
  var last=top.lastElementChild;last&&last.classList.contains("btn")?top.insertBefore(w,last):top.appendChild(w);
  var m=w.querySelector(".kc-tm"),tb=w.querySelector(".kc-tb");
  function paint(){var cur=getT();m.innerHTML=TH.map(function(t){return '<button role="menuitem" data-t="'+t[0]+'" aria-pressed="'+(cur===t[0])+'">'+t[2]+' '+t[1]+'</button>'}).join("")}
  paint();tb.onclick=function(e){e.stopPropagation();var o=m.classList.toggle("on");tb.setAttribute("aria-expanded",o)};
  m.onclick=function(e){var x=e.target.closest("[data-t]");if(!x)return;setT(x.dataset.t);paint();m.classList.remove("on")};
  document.addEventListener("click",function(){m.classList.remove("on")});
 }
 golu();
});
/* ---------- Golu the helper ---------- */
function golu(){
 var fab=document.createElement("button");fab.className="golu-fab";fab.setAttribute("aria-label","Open Golu, the Kids Corner helper");fab.innerHTML='<img src="assets/kids/story-boy.webp" alt="Golu">';
 var tip=document.createElement("div");tip.className="golu-tip";tip.textContent="Namaste! Main Golu 👋";
 var p=document.createElement("div");p.className="golu-p";p.setAttribute("role","dialog");p.setAttribute("aria-label","Golu chat");
 p.innerHTML='<div class="golu-h"><img src="assets/kids/story-boy.webp" alt=""><div><b>Golu</b><br><small>Aapka padhai dost</small></div><button id="gS" title="Awaaz on/off" aria-pressed="true">🔊</button><button id="gX" aria-label="Close">✕</button></div><div class="golu-m" id="gM" aria-live="polite"></div><form class="golu-f" id="gF"><input id="gI" type="text" placeholder="Likho: class 2 maths, tables, game..." autocomplete="off" aria-label="Message for Golu"><button type="submit">Bhejo</button></form>';
 document.body.appendChild(fab);document.body.appendChild(tip);document.body.appendChild(p);
 var M=p.querySelector("#gM"),I=p.querySelector("#gI"),snd=true,started=false,V=[];
 try{V=speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=function(){V=speechSynthesis.getVoices()}}catch(e){}
 function speak(t){if(!snd||!("speechSynthesis" in window))return;try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t.replace(/[^\p{L}\p{N}\s.,?!'-]/gu,""));var a=V.filter(function(v){return /^(en-IN|hi)/i.test(v.lang)&&!/female|zira|heera|neerja|swara|kalpana/i.test(v.name)});if(a[0]){u.voice=a[0];u.lang=a[0].lang}else u.lang="en-IN";u.rate=.95;u.pitch=1.25;speechSynthesis.speak(u)}catch(e){}}
 function add(cls,html,isText){var d=document.createElement("div");d.className=cls;if(isText)d.textContent=html;else d.innerHTML=html;M.appendChild(d);M.scrollTop=M.scrollHeight;return d}
 function bot(t){add("gm",t,true);speak(t)}
 function chips(list){var d=add("gc","");list.forEach(function(x){var e=document.createElement(x.h?"a":"button");e.textContent=x.t;if(x.c)e.style.setProperty("--c",x.c);if(x.h){e.href=x.h;if(x.go)e.className="go"}else e.onclick=function(){x.f()};d.appendChild(e)})}
 function main(){var cl=CATS.filter(function(c){return c.type==="class"}).map(function(c){return {t:c.n,c:c.c,f:function(){ask(c.n)}}});
  var sp=[["🖼️ Picture Games","picture games"],["✖️ Tables","tables"],["💬 Story","story"],["🎮 Quiz","quiz"],["🏫 Classroom","classroom"],["📖 Lessons","lessons"]].map(function(x){return {t:x[0],f:function(){ask(x[1])}}});
  var sj=SJ.map(function(c){return {t:c.e+" "+c.n,c:c.c,f:function(){ask(c.n)}}});chips(cl);chips(sj);chips(sp)}
 function need(cb){if(typeof CATS!=="undefined"&&typeof SJ!=="undefined")return cb();var n=0,L=function(src,next){var s=document.createElement("script");s.src=src;s.onload=next;s.onerror=next;document.head.appendChild(s)};L("assets/js/data.js",function(){L("assets/js/items.js",cb)})}
 function open(){p.classList.add("on");tip.classList.remove("on");if(!started){started=true;need(function(){bot("Namaste! Main Golu hoon 😊 Aapko konsa lesson, game, ya class ki practice karni hai?");main()})}setTimeout(function(){I.focus()},100)}
 fab.onclick=function(){p.classList.contains("on")?(p.classList.remove("on"),speechSynthesis&&speechSynthesis.cancel()):open()};
 p.querySelector("#gX").onclick=function(){p.classList.remove("on");try{speechSynthesis.cancel()}catch(e){}};
 p.querySelector("#gS").onclick=function(){snd=!snd;this.textContent=snd?"🔊":"🔇";this.setAttribute("aria-pressed",snd);if(!snd)try{speechSynthesis.cancel()}catch(e){}};
 p.querySelector("#gF").onsubmit=function(e){e.preventDefault();var t=I.value.trim();if(!t)return;I.value="";ask(t)};
 setTimeout(function(){if(!p.classList.contains("on")){tip.classList.add("on");setTimeout(function(){tip.classList.remove("on")},6000)}},2500);
 /* understanding what the child types: English, Hinglish and Hindi words */
 var NUM={"pehli":1,"pahli":1,"doosri":2,"dusri":2,"teesri":3,"tisri":3,"chauthi":4,"paanchvi":5,"panchvi":5,"पहली":1,"दूसरी":2,"तीसरी":3,"चौथी":4,"पाँचवीं":5};
 var SUBJ={math:/math|ganit|गणित|jod|ghata|addition|subtract|number|ginti|गिनती|multipl|fraction|shape/,eng:/english|angrezi|अंग्रेज|phonics|abc|grammar|alphabet|opposite/,hindi:/hindi|हिंदी|हिन्दी|varnmala|swar|vyanjan|स्वर|व्यंजन/,evs:/evs|science|vigyan|विज्ञान|paryavaran|plant|animal|body|jaanwar|fruit|solar|health/,gk:/\bgk\b|general|gyan|ज्ञान|india|bharat|month|symbol|capital/,art:/\bart\b|drawing|colou?r|rang|रंग|painting/};
 var SPEC={classroom:/blackboard|board|classroom|kiki|miki|teacher|bol ?ke|read aloud|bolo/,tables:/table|pahada|pahade|पहाड़ा|पहाड़े/,stories:/story|kahani|कहानी|chat|paani|pani|water/,picgames:/picture|tasveer|photo|chitr|खेल|khel|game/,quiz:/quiz|test|sawal|practice|abhyas/,lessons:/lesson|video|padhai|पढ़ाई|padho|sikho/};
 function ask(t){add("um",t,true);var s=t.toLowerCase(),cls="",sub="",sp="",m;
  if(/\bukg\b/.test(s))cls="ukg";else if(/\bkg\b/.test(s))cls="kg";
  else if((m=s.match(/(?:class|kaksha|कक्षा|cls)\s*([1-5])|\b([1-5])\s*(?:class|vi\b|st\b|nd\b|rd\b|th\b)/)))cls="c"+(m[1]||m[2]);
  else for(var k in NUM)if(s.indexOf(k)>-1){cls="c"+NUM[k];break}
  for(var j in SUBJ)if(SUBJ[j].test(s)){sub=j;break}
  for(var q in SPEC)if(SPEC[q].test(s)){sp=q;break}
  var id=cls&&sub?cls:cls||sub||sp,sb=cls&&sub?sub:"";
  if(id){var c=catById(id),n=catItems(id,sb).length,name=c.n+(sb?" "+SC[sb].n:"");
   if(!n){bot(name+" me abhi kuch nahi mila 🙈 Doosra chuno:");main();return}
   bot(name+" ke liye "+n+" cards mil gaye! Chalo shuru karein 👇");
   var tops=catItems(id,sb).slice(0,3).map(function(i){return {t:(i.k==="game"?"🎮 ":"▶ ")+i.t,h:i.h,c:c.c}});
   chips([{t:name+" kholo ›",h:"category.html?c="+id+(sb?"&s="+sb:""),go:1,c:c.c}].concat(tops));return}
  var w=s.split(/\s+/).filter(function(x){return x.length>2}),res=IT.filter(function(i){var h=(i.t+" "+i.d).toLowerCase();return w.some(function(x){return h.indexOf(x)>-1})}).slice(0,4);
  if(res.length){bot("Ye mil gaye, inme se chuno 👇");chips(res.map(function(i){return {t:(i.k==="game"?"🎮 ":"▶ ")+i.t,h:i.h,c:COL[i.c].c}}));return}
  bot("Hmm, mujhe samajh nahi aaya 🙈 Aap class (jaise Class 2), subject (jaise Maths) ya game likho. Ya inme se chuno:");main()}
}
})();
