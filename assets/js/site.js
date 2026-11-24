(function(){
var S='https://csc-vle-tools-desk.github.io/SewaSphere/';
/* Fill these once. Empty = icon opens the SevaSphere contact page. */
var C={email:'',phone:'',whatsapp:'',facebook:'',instagram:'',youtube:'',telegram:''};
var P=document.body.getAttribute('data-page')||'';
function l(h,t,k,x){return'<a href="'+h+'"'+(k===P?' class="on" aria-current="page"':'')+(x?' rel="noopener"':'')+'>'+t+'</a>'}
var N=[['index.html','🏠 Home','home'],['games.html','🎮 Games','games'],[S+'kids-classes.html','📚 Class 2–5','',1],['about.html','ℹ️ About','about'],['contact.html','✉️ Contact','contact']];
var top='<header class="kc-top"><button class="kc-burger" id="kcB" aria-label="Open menu" aria-expanded="false">☰</button><a class="kc-logo" href="index.html"><span>🧸</span>Kids <b>Corner</b></a><nav class="kc-nav" aria-label="Main">'+N.map(function(n){return l(n[0],n[1],n[2],n[3])}).join('')+'</nav><a class="kc-sv" href="'+S+'" rel="noopener">SevaSphere ↗</a></header>';
var side='<aside class="kc-side" id="kcS" aria-label="Menu"><h4>Kids Corner</h4>'+l('index.html','🏠 Home','home')+l('games.html','🎮 Play All Games','games')+l('about.html','ℹ️ About Us','about')+l('contact.html','✉️ Contact Us','contact')+l('disclaimer.html','⚠️ Disclaimer','disclaimer')+'<h4>SevaSphere</h4>'+l(S,'🌐 SevaSphere Home','',1)+l(S+'kids-classes.html','📚 Class 2–5 Learning','',1)+l(S+'index.html#tools','🧰 All Tools','',1)+'</aside>';
var so=[['facebook','FB','Facebook'],['instagram','IG','Instagram'],['youtube','YT','YouTube'],['whatsapp','WA','WhatsApp'],['telegram','TG','Telegram']].map(function(x){return'<a href="'+(C[x[0]]||S+'contact.html')+'" aria-label="'+x[2]+'" title="'+x[2]+'" rel="noopener">'+x[1]+'</a>'}).join('');
var foot='<footer class="kc-foot"><div class="in"><div><h4>🧸 Kids Corner</h4><p>Learn &amp; Play, the fun way!<br>सीखो और खेलो, मज़े के साथ।</p><p>Free picture games for KG, UKG and Class 1 in English and Hindi.</p></div><div><h4>Explore</h4>'+l('index.html','Home')+l('games.html','Games')+l('about.html','About Us')+l('contact.html','Contact Us')+l('disclaimer.html','Disclaimer')+'</div><div><h4>SevaSphere</h4>'+l(S,'SevaSphere Home','',1)+l(S+'kids-classes.html','Class 2–5 Learning','',1)+l(S+'contact.html','Support','',1)+'</div><div><h4>Follow us</h4><div class="soc">'+so+'</div></div></div><div class="bot"><span>© '+new Date().getFullYear()+' Kids Corner · A <a style="display:inline" href="'+S+'">SevaSphere</a> project · Rohtak, Haryana, India</span><span>Made with ❤️ for little learners</span></div></footer>';
function $(i){return document.getElementById(i)}
$('kc-header').innerHTML=top;$('kc-side').outerHTML=side;$('kc-footer').innerHTML=foot;
$('kcB').onclick=function(){var s=$('kcS'),o=s.classList.toggle('open');this.setAttribute('aria-expanded',o)};
var e=document.querySelectorAll('[data-c]');for(var i=0;i<e.length;i++){var k=e[i].getAttribute('data-c');if(C[k]){e[i].href=k==='email'?'mailto:'+C[k]:k==='phone'?'tel:'+C[k].replace(/[^+\d]/g,''):k==='whatsapp'?'https://wa.me/'+C[k].replace(/\D/g,''):C[k]}else{e[i].href=S+'contact.html'}}
})();
