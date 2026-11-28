/* Kids Corner v3.8: Classroom mode. A blackboard, Kiki and Miki teach, the child reads the board aloud (or taps, or plays silently). Works for every lesson. */
(function(){
var KIKI='<svg viewBox="0 0 120 130" aria-label="Kiki the owl"><ellipse cx="60" cy="124" rx="30" ry="5" fill="rgba(0,0,0,.2)"/><path d="M20 60c0-30 18-48 40-48s40 18 40 48v34c0 16-18 28-40 28S20 110 20 94z" fill="#ff9f43"/><ellipse cx="60" cy="88" rx="26" ry="28" fill="#ffe2b8"/><path d="M14 74c-8 10-6 28 8 34 4-14 2-26-8-34zm92 0c8 10 6 28-8 34-4-14-2-26 8-34z" fill="#e8812a"/><circle cx="42" cy="56" r="16" fill="#fff"/><circle cx="78" cy="56" r="16" fill="#fff"/><circle cx="44" cy="58" r="8" fill="#1d1340"/><circle cx="76" cy="58" r="8" fill="#1d1340"/><circle cx="47" cy="55" r="3" fill="#fff"/><circle cx="79" cy="55" r="3" fill="#fff"/><path d="M52 70h16l-8 14z" fill="#ffc928"/><path d="M60 8 14 28l46 16 46-16z" fill="#2b1a6e"/><path d="M96 31v20" stroke="#ffc928" stroke-width="3"/><circle cx="96" cy="53" r="4" fill="#ffc928"/><path d="M42 118v6m36-6v6" stroke="#ffc928" stroke-width="5" stroke-linecap="round"/></svg>',MIKI='<svg viewBox="0 0 120 130" aria-label="Miki the mouse"><ellipse cx="60" cy="124" rx="28" ry="5" fill="rgba(0,0,0,.2)"/><path d="M92 100c20-4 26-24 12-34" fill="none" stroke="#f4a6b8" stroke-width="5" stroke-linecap="round"/><circle cx="26" cy="30" r="20" fill="#9aa5b8"/><circle cx="94" cy="30" r="20" fill="#9aa5b8"/><circle cx="26" cy="30" r="12" fill="#f9c5d1"/><circle cx="94" cy="30" r="12" fill="#f9c5d1"/><ellipse cx="60" cy="92" rx="34" ry="32" fill="#b9c2d3"/><ellipse cx="60" cy="100" rx="22" ry="22" fill="#eef1f7"/><circle cx="60" cy="58" r="32" fill="#b9c2d3"/><circle cx="48" cy="54" r="8" fill="#fff"/><circle cx="72" cy="54" r="8" fill="#fff"/><circle cx="49" cy="55" r="4.5" fill="#1d1340"/><circle cx="73" cy="55" r="4.5" fill="#1d1340"/><circle cx="51" cy="53" r="1.6" fill="#fff"/><circle cx="75" cy="53" r="1.6" fill="#fff"/><ellipse cx="60" cy="68" rx="5" ry="4" fill="#ec6f8f"/><path d="M52 75q8 7 16 0" fill="none" stroke="#1d1340" stroke-width="2.5" stroke-linecap="round"/><path d="M34 66h-14M34 72l-13 5M86 66h14M86 72l13 5" stroke="#6b7690" stroke-width="2" stroke-linecap="round"/><path d="M40 120v6m40-6v6" stroke="#f4a6b8" stroke-width="5" stroke-linecap="round"/></svg>';
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
var LN={a:"a ay eh hey",b:"b be bee bi",c:"c see sea si",d:"d dee",e:"e ee",f:"f ef eff",g:"g gee ji",h:"h aitch age ech",i:"i eye ai aye",j:"j jay jey",k:"k kay cay",l:"l el elle",m:"m em",n:"n en",o:"o oh owe",p:"p pee pea",q:"q queue cue kyu",r:"r are ar",s:"s ess",t:"t tee tea",u:"u you yu",v:"v vee",w:"w double",x:"x ex",y:"y why",z:"z zed zee"};
var ONES="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" "),TENS="  twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
function numWord(n){n=+n;if(n<20)return ONES[n];if(n<100)return TENS[Math.floor(n/10)]+(n%10?" "+ONES[n%10]:"");if(n===100)return "one hundred";return ""}
function norm(t){return String(t).toLowerCase().replace(/[.,!?;:'"()]/g," ").replace(/\s+/g," ").trim()}
function R(n){return Math.floor(Math.random()*n)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var GOOD_EN=["Good!","Well done!","Shabash!","Accha!","Very good!"],GOOD_HI=["शाबाश!","अच्छा!","बहुत अच्छे!","वाह!"],BAD_EN=["Try again!","Phir se koshish karen!"],BAD_HI=["फिर से कोशिश करें!","Try again!"];
function pick(a){return a[R(a.length)]}
var css=document.createElement("style");css.textContent=
".kc-room{--wood:#a9713a}.kr-top{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:10px}.kr-top .grp{display:flex;gap:6px;background:var(--bg,#f4f1fb);padding:5px;border-radius:999px;flex-wrap:wrap}.kr-top button{font:inherit;font-weight:800;border:0;border-radius:999px;padding:7px 14px;cursor:pointer;background:transparent;color:var(--ink,#1d1340)}.kr-top button[aria-pressed=true]{background:#7c4dff;color:#fff}"+
".kr-board{position:relative;background:radial-gradient(circle at 30% 20%,#2f6b52,#1f4d3a 70%);border:14px solid var(--wood);border-radius:18px;box-shadow:inset 0 0 40px rgba(0,0,0,.45),0 8px 0 #7a4e24;min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;color:#f5f7f2;text-align:center;overflow:hidden}"+
".kr-board .cap{font-family:'Chalkboard SE','Comic Sans MS','Baloo 2',cursive;font-size:clamp(1rem,2.6vw,1.4rem);opacity:.9;min-height:1.6em}.kr-board .big{font-family:'Chalkboard SE','Comic Sans MS','Baloo 2',cursive;font-weight:800;font-size:clamp(5rem,20vw,10rem);line-height:1.05;text-shadow:0 0 6px rgba(255,255,255,.35);animation:krw .55s}.kr-board .big.sm{font-size:clamp(2.6rem,10vw,5.5rem)}"+
"@keyframes krw{from{opacity:0;transform:scale(.6) rotate(-6deg);filter:blur(6px)}}.kr-board .hint{min-height:44px;font-family:'Chalkboard SE','Comic Sans MS',cursive;font-size:1.25rem;display:flex;gap:10px;align-items:center;justify-content:center}.kr-board .hint img{height:56px}.kr-board .hint .kfx-e{font-size:2.4rem}"+
".kr-tray{height:12px;background:var(--wood);border-radius:0 0 10px 10px;margin:0 20px;box-shadow:0 5px 0 #7a4e24}.kr-prog{display:flex;gap:4px;margin:10px 4px}.kr-prog i{flex:1;height:8px;border-radius:6px;background:var(--line,#e6e0f5)}.kr-prog i.ok{background:#22a559}.kr-prog i.no{background:#f59e0b}.kr-prog i.now{background:#7c4dff;animation:krp 1s infinite}@keyframes krp{50%{opacity:.4}}"+
".kr-stage{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;align-items:end;margin-top:10px}.kr-ch{position:relative;text-align:center;transition:transform .2s}.kr-ch .fg{height:120px;display:flex;align-items:flex-end;justify-content:center}.kr-ch svg,.kr-ch img{height:110px;width:auto;max-width:100%;object-fit:contain;filter:drop-shadow(0 5px 4px rgba(0,0,0,.25))}.kr-ch b{display:block;font-size:.9rem;color:var(--mute,#6b6290)}"+
".kr-ch.talk .fg{animation:krt .45s infinite alternate}.kr-ch.hop .fg{animation:krh .7s}.kr-ch.oops .fg{animation:kro .5s}@keyframes krt{to{transform:translateY(-8px) rotate(-2deg)}}@keyframes krh{40%{transform:translateY(-30px) scale(1.1)}}@keyframes kro{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}"+
".kr-say{position:relative;background:var(--card,#fff);border:3px solid #ffc928;border-radius:20px;padding:10px 16px;font-weight:800;font-size:clamp(1rem,2.4vw,1.25rem);margin:12px 0 0;text-align:center;min-height:3em;box-shadow:0 5px 0 rgba(0,0,0,.08)}.kr-say small{display:block;font-weight:700;color:var(--mute,#6b6290)}"+
".kr-ctl{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:12px}.kr-ctl button{font:inherit;font-weight:800;border:0;border-radius:999px;padding:10px 18px;cursor:pointer;background:var(--bg,#f4f1fb);color:var(--ink,#1d1340);box-shadow:0 4px 0 rgba(0,0,0,.12)}.kr-ctl .mic{background:#ef4444;color:#fff;font-size:1.15rem;padding:12px 24px;box-shadow:0 5px 0 #b91c1c}.kr-ctl .mic.on{animation:krm 1s infinite}@keyframes krm{50%{transform:scale(1.08);box-shadow:0 0 0 10px rgba(239,68,68,.25)}}"+
".kr-opts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:12px}.kr-opts button{font:inherit;font-weight:800;font-size:1.5rem;min-width:84px;border:3px solid var(--line,#e6e0f5);border-radius:18px;background:var(--card,#fff);color:var(--ink,#1d1340);padding:10px 18px;cursor:pointer;box-shadow:0 5px 0 var(--line,#e6e0f5)}.kr-opts button:hover:not(:disabled){transform:translateY(-3px);border-color:#ffc928}.kr-opts button.ok{border-color:#22a559;box-shadow:0 5px 0 #22a559}.kr-opts button.no{border-color:#ef4444;box-shadow:0 5px 0 #ef4444}"+
".kr-end{text-align:center}.kr-end .st{font-size:3rem}@media(max-width:640px){.kr-stage{grid-template-columns:repeat(4,1fr)}.kr-ch .fg{height:84px}.kr-ch svg,.kr-ch img{height:78px}.kr-board{border-width:9px}}";
document.head.appendChild(css);
function start(L,app){
 var cards=L.cards.slice(0,26),hi=L.lg==="hi-IN",lang=hi?"hi":"en",i=0,sc=0,tries=0,res=[],sound=KCFX.isOn(),mode=(SR?"say":"tap"),tok=0,rec=null,locked=true,streak=0;
 function $(x){return document.getElementById(x)}
 function T(en,h){return hi?h:en}
 app.innerHTML='<div class="kc-room"><h1>🏫 '+esc(L.t)+' – Class</h1>'+
 '<div class="kr-top"><div class="grp" role="group" aria-label="How to answer"><button id="mSay" aria-pressed="'+(mode==="say")+'">🎤 Say it</button><button id="mTap" aria-pressed="'+(mode==="tap")+'">👆 Tap it</button></div>'+
 '<div class="grp"><button id="mSnd" aria-pressed="'+sound+'">'+(sound?"🔊 Sound on":"🔇 Silent class")+'</button></div></div>'+
 '<div class="kr-board"><div class="cap" id="kCap"></div><div class="big" id="kBig">🏫</div><div class="hint" id="kHint"></div></div><div class="kr-tray"></div>'+
 '<div class="kr-prog" id="kProg"></div>'+
 '<div class="kr-stage"><div class="kr-ch" id="cKiki"><div class="fg">'+KIKI+'</div><b>Kiki (teacher)</b></div><div class="kr-ch" id="cMiki"><div class="fg">'+MIKI+'</div><b>Miki</b></div><div class="kr-ch" id="cBoy"><div class="fg"><img src="assets/kids/story-boy.webp" alt="Boy"></div><b>'+T("Boy","लड़का")+'</b></div><div class="kr-ch" id="cGirl"><div class="fg"><img src="assets/kids/story-girl.webp" alt="Girl"></div><b>'+T("Girl","लड़की")+'</b></div></div>'+
 '<div class="kr-say" id="kSay" aria-live="polite"></div><div class="kr-opts" id="kOpts"></div>'+
 '<div class="kr-ctl" id="kCtl"></div></div>';
 function prog(){var h="";for(var k=0;k<cards.length;k++)h+='<i class="'+(res[k]||(k===i?"now":""))+'"></i>';$("kProg").innerHTML=h}
 function who(id,cls,ms){var e=$(id);if(!e)return;e.classList.add(cls);if(ms)setTimeout(function(){e.classList.remove(cls)},ms)}
 function talk(nm,text,sub,cb,pitch){["cKiki","cMiki"].forEach(function(x){$(x).classList.remove("talk")});$(nm==="Kiki"?"cKiki":"cMiki").classList.add("talk");$("kSay").innerHTML=esc(nm+": "+text)+(sub?'<small>'+esc(sub)+'</small>':"");
  var my=tok;KCFX.speak(text,{lang:lang,pitch:pitch||(nm==="Kiki"?1.35:1.8),rate:nm==="Kiki"?.9:1.0,done:function(){if(my!==tok)return;$("cKiki").classList.remove("talk");$("cMiki").classList.remove("talk");cb&&cb()}})}
 function kind(c){var f=String(c[0]);if(/^[A-Za-z]$/.test(f))return"letter";if(hi&&f.length<=2)return"letter";if(/^[\d\s+\-−×÷x*/=?.]+$/.test(f)&&/^\d+$/.test(String(c[1])))return"math";return"word"}
 function accepted(c){var f=norm(c[0]),b=norm(c[1]),k=kind(c),a=[];
  if(k==="math"){a.push(b);if(/^\d+$/.test(b)){var w=numWord(b);if(w)a.push(w)}return a}
  a.push(f,b);if(/^[a-z]$/.test(f))(LN[f]||f).split(" ").forEach(function(x){a.push(x)});if(/^\d+$/.test(f)){var w2=numWord(f);if(w2)a.push(w2)}return a}
 function board(){var c=cards[i],k=kind(c),f=String(c[0]);$("kCap").textContent=T("Board "+(i+1)+" of "+cards.length,"कार्ड "+(i+1)+" / "+cards.length);
  $("kBig").className="big"+(f.length>2?" sm":"");$("kBig").textContent=k==="math"?f+" = ?":f;$("kHint").innerHTML="";prog()}
 function showHint(){var c=cards[i],p=KCFX.pic(c[1],L.cards);$("kHint").innerHTML=(p?p:"")+'<span>'+esc(c[1])+'</span>'}
 function ctl(h){$("kCtl").innerHTML=h}
 function ask(){tok++;var c=cards[i];tries=0;locked=true;board();$("kOpts").innerHTML="";ctl("");
  var k=kind(c),pr=k==="letter"?T("Please read the letter on the board.","कृपया बोर्ड पर लिखा अक्षर पढ़ो।"):k==="math"?T("Please solve it and say the answer.","कृपया हल करके उत्तर बोलो।"):T("Please read what is on the board.","कृपया बोर्ड पर लिखा पढ़ो।");
  talk("Miki",pr,"",function(){locked=false;listenOrTap()})}
 function choices(){var c=cards[i],k=kind(c),ans=String(k==="letter"?c[0]:k==="word"&&false?c[0]:(k==="math"?c[1]:c[0])),pool=[];
  var key=(k==="math")?1:0;ans=String(c[key]);cards.forEach(function(x){var v=String(x[key]);if(v!==ans&&pool.indexOf(v)<0)pool.push(v)});pool.sort(function(){return Math.random()-.5});var o=[ans].concat(pool.slice(0,2)).sort(function(){return Math.random()-.5});
  $("kOpts").innerHTML=o.map(function(v){return'<button data-v="'+esc(v)+'">'+esc(v)+'</button>'}).join("");
  Array.prototype.forEach.call($("kOpts").querySelectorAll("button"),function(b){b.onclick=function(){if(locked)return;if(b.dataset.v===ans)right(b);else wrong(b)}})}
 function listenOrTap(){ctl('<button id="bHint">💡 '+T("Hint","संकेत")+'</button><button id="bSkip">⏭ '+T("Skip","छोड़ो")+'</button>'+(mode==="say"&&sound&&SR?'<button class="mic" id="bMic">🎤 '+T("Speak","बोलो")+'</button>':""));
  $("bHint").onclick=showHint;$("bSkip").onclick=function(){res[i]="no";next()};
  if(mode==="say"&&sound&&SR){$("bMic").onclick=listen;choices0();listen()}else choices()}
 function choices0(){$("kOpts").innerHTML=""}
 function listen(){if(!SR||locked===true)return;try{if(rec)rec.abort()}catch(e){}
  rec=new SR();rec.lang=hi?"hi-IN":"en-IN";rec.maxAlternatives=6;rec.interimResults=false;var my=tok,got=false,mic=$("bMic");if(mic){mic.classList.add("on");mic.textContent="👂 "+T("Listening...","सुन रहा हूँ...")}
  rec.onresult=function(e){got=true;if(my!==tok)return;var alts=[];for(var k=0;k<e.results[0].length;k++)alts.push(norm(e.results[0][k].transcript));judge(alts)};
  rec.onerror=function(e){if(my!==tok)return;got=true;if(mic){mic.classList.remove("on");mic.textContent="🎤 "+T("Speak","बोलो")}if(e.error==="not-allowed"||e.error==="service-not-allowed"){mode="tap";$("mTap").click()}else if(e.error!=="aborted")$("kSay").innerHTML=esc(T("I could not hear you. Press the red mic and try again, or use Tap it.","सुनाई नहीं दिया। लाल माइक दबाकर फिर बोलो या Tap it चुनो।"))};
  rec.onend=function(){if(mic){mic.classList.remove("on");mic.textContent="🎤 "+T("Speak","बोलो")}};
  try{rec.start()}catch(e){}}
 function judge(alts){var ac=accepted(cards[i]);var ok=alts.some(function(t){return ac.indexOf(t)>-1||t.split(" ").some(function(w){return ac.indexOf(w)>-1})});if(ok)right();else wrong()}
 function right(b){if(locked)return;locked=true;tok++;try{if(rec)rec.abort()}catch(e){}if(b)b.classList.add("ok");if(!tries){sc++;streak++;res[i]="ok"}else res[i]="no";prog();
  var t=pick(hi?GOOD_HI:GOOD_EN);KCFX.tone([660,880,1100],.09);KCFX.confetti();["cBoy","cGirl","cKiki","cMiki"].forEach(function(x){who(x,"hop",800)});showHint();
  var my=tok;$("kSay").innerHTML="🎉 "+esc(t)+(streak>1?'<small>🔥 '+streak+' '+T("in a row!","लगातार!")+'</small>':"");
  KCFX.speak(t,{lang:lang,pitch:1.5,rate:1,done:function(){if(my!==tok)return;setTimeout(next,700)}})}
 function wrong(b){if(locked&&b===undefined&&false)return;tries++;streak=0;if(b){b.classList.add("no");b.disabled=true}who("cBoy","oops",600);who("cGirl","oops",600);KCFX.tone([260,200],.13,"triangle");
  if(tries>=3){locked=true;tok++;res[i]="no";var c=cards[i];showHint();var my=tok;var t=T("This is "+c[0]+(c[1]&&norm(c[1])!==norm(c[0])?". "+c[0]+" for "+c[1]+".":"."),c[0]+" – "+c[1]);talk("Kiki",t,"",function(){if(my===tok)setTimeout(next,500)});return}
  if(tries>=2){showHint();if(mode==="say"&&!$("kOpts").firstChild)choices()}var t2=pick(hi?BAD_HI:BAD_EN);$("kSay").innerHTML=esc(t2);var hl=/[^\x00-\x7f]/.test(t2);
  KCFX.speak(t2,{lang:hl?"hi":"en",pitch:1.5,rate:1,done:function(){if(!locked&&mode==="say"&&sound&&SR)listen()}})}
 function next(){i++;if(i>=cards.length)return finish();ask()}
 function finish(){tok++;var s=sc>=cards.length?3:sc>=cards.length*.7?2:sc>=cards.length*.4?1:0;try{var k=JSON.parse(localStorage.getItem("kc_lessons")||"{}");if(s>(k[L.id]||0)){k[L.id]=s;localStorage.setItem("kc_lessons",JSON.stringify(k))}}catch(e){}
  var st="";for(var q=1;q<=3;q++)st+='<span style="color:'+(q<=s?"#f59e0b":"#d9d4ea")+'">★</span>';$("kBig").className="big sm";$("kBig").textContent="🎓";$("kCap").textContent=T("Class is over!","छुट्टी की घंटी!");$("kHint").innerHTML="";$("kOpts").innerHTML="";
  $("kCtl").innerHTML='<div class="kr-end"><div class="st">'+st+'</div><p><b>'+T("You got "+sc+" of "+cards.length+" right at the first try.","आपने "+sc+" / "+cards.length+" पहली बार में सही किए।")+'</b></p><button id="eAg" class="mic" style="background:#22a559;box-shadow:0 5px 0 #15803d">▶ '+T("Class again","फिर से क्लास")+'</button> <button id="eBk">'+T("Back to lesson","पाठ पर वापस")+'</button> <a class="btn" href="index.html#cats" style="padding:10px 18px">'+T("All categories","सभी श्रेणियाँ")+'</a></div>';
  $("eAg").onclick=function(){start(L,app)};$("eBk").onclick=function(){location.href="lesson.html?id="+L.id};KCFX.tone([523,659,784,1047],.13);KCFX.confetti();talk("Kiki",T("Class is over. Shabash, children! See you tomorrow.","छुट्टी हो गई। शाबाश बच्चों! कल मिलते हैं।"),"",null)}
 $("mSay").onclick=function(){if(!SR){$("kSay").textContent=T("Your browser cannot listen. Please use Tap it, or open this page in Google Chrome.","आपका ब्राउज़र सुन नहीं सकता। Tap it चुनें या Google Chrome में खोलें।");return}mode="say";$("mSay").setAttribute("aria-pressed",true);$("mTap").setAttribute("aria-pressed",false);if(!locked)listenOrTap()};
 $("mTap").onclick=function(){mode="tap";$("mTap").setAttribute("aria-pressed",true);$("mSay").setAttribute("aria-pressed",false);try{if(rec)rec.abort()}catch(e){}if(!locked)listenOrTap()};
 $("mSnd").onclick=function(){sound=!sound;KCFX.mute(!sound);this.setAttribute("aria-pressed",sound);this.textContent=sound?"🔊 Sound on":"🔇 Silent class";if(!sound){mode="tap";$("mTap").setAttribute("aria-pressed",true);$("mSay").setAttribute("aria-pressed",false);try{if(rec)rec.abort()}catch(e){}}if(!locked)listenOrTap()};
 /* welcome, then the first letter */
 board();$("kBig").textContent="🏫";$("kCap").textContent=T("Welcome to class!","कक्षा में स्वागत है!");$("kProg").innerHTML="";
 ctl('<button class="mic" id="bGo" style="background:#22a559;box-shadow:0 5px 0 #15803d">▶ '+T("Start class","क्लास शुरू करो")+'</button>');
 $("bGo").onclick=function(){ctl("");tok++;
  talk("Kiki",T("Welcome to class, children! I am Kiki. Today we learn "+L.t+".","कक्षा में आपका स्वागत है! मैं किकी हूँ। आज हम सीखेंगे: "+L.t+"।"),"",function(){
   talk("Miki",T("And I am Miki! Let us learn together.","और मैं मिकी हूँ! चलो साथ में सीखें।"),"",function(){ask()})})};
}
window.KCClass={start:start};
})();
