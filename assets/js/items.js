/* Kids Corner v3.6: one shared list of every lesson, quiz and game, grouped into categories. */
var IT=[];
LESSONS.forEach(function(l){
 IT.push({p:LPIC[l.id],k:"lesson",c:l.c,s:l.s,t:l.t,d:l.d,e:l.e,m:l.m,h:"lesson.html?id="+l.id});
 IT.push({p:LPIC[l.id],k:"game",c:l.c,s:l.s,t:l.t+" Quiz",d:"Play a quick quiz and win stars.",e:"🎮",m:"3 min",h:l.id==="c2-tables"?"tables-quiz.html":"lesson.html?id="+l.id+"&play=1"});
});
[["kg","KG"],["ukg","UKG"],["c1","Class 1"]].forEach(function(x){
 IT.push({k:"game",c:x[0],s:"gk",t:"Picture Games – "+x[1],d:"38 picture games with sound, English and Hindi. Pick any game.",e:"🖼️",m:"Many",h:"games.html"});
});
IT.push({k:"game",c:"c2",s:"gk",t:"Where is the Water? – Story Game",d:"A boy and a girl chat with voice and pictures. Follow the water from the pot to the whole world.",e:"💬",m:"3 min",h:"story-chat.html"});
var COL={},SC={},CATS=[];
CL.forEach(function(x){COL[x.id]=x;CATS.push({id:x.id,type:"class",n:x.n,e:x.e,img:x.img,c:x.c,d:x.s,f:function(i){return i.c===x.id}})});
SJ.forEach(function(x){SC[x.id]=x;CATS.push({id:x.id,type:"subject",n:x.n,e:x.e,c:x.c,d:"All "+x.n+" lessons and games",f:function(i){return i.s===x.id}})});
[["picgames","Picture Games","🖼️","#ff6b6b","Pictures, sound and stars",function(i){return i.h==="games.html"}],
 ["quiz","Quiz Games","🎮","#22a559","Quick quizzes with a voice",function(i){return i.k==="game"&&i.h!=="games.html"&&i.h!=="story-chat.html"}],
 ["lessons","Lessons","📖","#3b82f6","Short lessons with pictures",function(i){return i.k==="lesson"}],
 ["tables","Tables","✖️","#8b5cf6","Tables 2 to 10",function(i){return /tables/.test(i.h)}],
 ["stories","Stories","💬","#ec4899","Story games with two voices",function(i){return i.h==="story-chat.html"}]
].forEach(function(x){CATS.push({id:x[0],type:"special",n:x[1],e:x[2],c:x[3],d:x[4],f:x[5]})});
function catById(id){for(var i=0;i<CATS.length;i++)if(CATS[i].id===id)return CATS[i];return null}
function catItems(id,sub){var c=catById(id);return c?IT.filter(function(i){return c.f(i)&&(!sub||i.s===sub)}):[]}
function cardHtml(i){var c=COL[i.c];return '<article class="card"><div class="art" style="--c:'+c.c+'" aria-hidden="true"><span class="tg">'+c.n+'</span>'+(c.img?'<img class="artimg kidimg" src="assets/kids/'+c.img+'" alt="" height="96">':(i.p?'<img class="artimg" src="assets/kids/'+i.p+'.png" alt="" width="84" height="84">':i.e))+'<span class="pl">'+(i.k==="game"?"🎮":"▶")+'</span></div><div class="body"><h3>'+i.t+'</h3><p>'+i.d+'</p><div class="meta"><span>'+(i.k==="game"?"Game":"Lesson")+' · '+SC[i.s].n+' · '+i.m+'</span><a class="play" href="'+i.h+'">'+(i.k==="game"?"Play":"Watch")+'</a></div></div></article>'}
