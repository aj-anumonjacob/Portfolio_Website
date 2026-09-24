/* =========================================================
   Anumon Jacob — Portfolio interactions
   Vanilla JS. The page is fully readable without it; the
   `js` class and saved theme are set by an inline script in <head>.
   ========================================================= */
(function(){
  var root=document.documentElement, WA="971504039037", MAIL="anumonjacob24@gmail.com";
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle (saved as "aj-theme") ---------- */
  document.getElementById("themeBtn").addEventListener("click",function(){
    var cur=root.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
    var n=cur==="dark"?"light":"dark"; root.setAttribute("data-theme",n);
    try{localStorage.setItem("aj-theme",n);}catch(e){}
  });

  /* ---------- Hero intro ---------- */
  requestAnimationFrame(function(){ setTimeout(function(){ document.getElementById("top").classList.add("loaded"); },60); });

  /* ---------- Rotating words ---------- */
  var rot=document.getElementById("rot");
  var words=[].slice.call(rot.querySelectorAll("span")), wi=0;

  // All words share one grid cell, so the rotator is as wide as the longest word.
  // If that doesn't fit the headline column, scale the word down to fit on one line.
  function fitRotator(){
    rot.style.fontSize="";
    var room=rot.closest(".line").clientWidth, need=rot.getBoundingClientRect().width;
    if(need>room) rot.style.fontSize=(Math.floor(room/need*1000)/1000)+"em";
  }
  fitRotator();
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fitRotator);
  addEventListener("resize",fitRotator);

  setInterval(function(){
    var cur=words[wi]; cur.classList.remove("on"); cur.classList.add("off");
    wi=(wi+1)%words.length; var nx=words[wi]; nx.classList.remove("off");
    void nx.offsetWidth; nx.classList.add("on");
    setTimeout(function(){cur.classList.remove("off");},600);
  },2600);

  /* ---------- Code typing ---------- */
  // The highlighted code lives in index.html (so it shows without JS).
  // Read it into tokens, clear the editor, then type it back one character at a time.
  var pre=document.getElementById("code");
  if(!reduce){
    var toks=[], caret=pre.querySelector(".caret");
    [].forEach.call(pre.childNodes,function(n){
      if(n===caret) return;
      toks.push([n.nodeType===1?n.className:"", n.textContent]);
    });
    pre.style.minHeight=pre.offsetHeight+"px"; // keep the card's final size while typing
    pre.textContent=""; pre.appendChild(caret);

    var ti=0,ci=0,node=null;
    function tick(){
      if(ti>=toks.length) return;
      var tok=toks[ti];
      if(!node){
        node=tok[0]?document.createElement("span"):document.createTextNode("");
        if(tok[0]) node.className=tok[0];
        pre.insertBefore(node,caret);
      }
      var ch=tok[1].charAt(ci++);
      if(tok[0]) node.textContent+=ch; else node.nodeValue+=ch;
      if(ci>=tok[1].length){ti++;ci=0;node=null;}
      setTimeout(tick,(ch==="\n"?120:0)+22+Math.random()*30); // 120ms pause per line
    }
    setTimeout(tick,1100);
  }

  /* ---------- Reveal on scroll (one-time) ---------- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.15,rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".rv").forEach(function(el){io.observe(el);});

  /* ---------- Counters (final values are in the HTML for no-JS) ---------- */
  var co=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return; co.unobserve(e.target);
    var el=e.target,end=+el.dataset.count,st=null,dur=reduce?0:1400;
    function step(ts){if(!st)st=ts;var p=dur?Math.min((ts-st)/dur,1):1;el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  });},{threshold:.6});
  document.querySelectorAll("[data-count]").forEach(function(el){if(!reduce)el.textContent="0";co.observe(el);});

  /* ---------- Spotlight on cards ---------- */
  document.querySelectorAll(".spot").forEach(function(c){
    c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px");});
  });

  /* ---------- Scroll: progress bar, nav shadow, timeline ---------- */
  var prog=document.getElementById("prog"),nav=document.getElementById("nav"),tl=document.getElementById("tl"),fill=document.getElementById("tlFill"),items=tl.querySelectorAll("li");
  function onScroll(){
    var h=document.documentElement.scrollHeight-innerHeight;
    prog.style.transform="scaleX("+(h>0?Math.min(scrollY/h,1):0)+")";
    nav.classList.toggle("scrolled",scrollY>30);
    var r=tl.getBoundingClientRect(),mid=innerHeight*.6;
    var p=Math.max(0,Math.min(1,(mid-r.top)/r.height)); fill.style.transform="scaleY("+p+")";
    items.forEach(function(li){li.classList.toggle("lit",li.getBoundingClientRect().top<mid);});
  }
  addEventListener("scroll",onScroll,{passive:true}); addEventListener("resize",onScroll); onScroll();

  /* ---------- Service links preselect the project type ---------- */
  var map={"a website or web app":0,"a mobile app":1,"a business system":2,"automation or improving an existing app":3};
  document.querySelectorAll("[data-wa]").forEach(function(a){
    a.addEventListener("click",function(){document.getElementById("fType").selectedIndex=map[a.dataset.wa]||0;setTimeout(function(){document.getElementById("fName").focus({preventScroll:true});},700);});
  });

  /* ---------- Project brief → WhatsApp or email ---------- */
  function compose(){
    var n=document.getElementById("fName").value.trim(),m=document.getElementById("fMsg").value.trim(),c=document.getElementById("fCo").value.trim(),err=document.getElementById("fErr");
    if(!n||!m){err.style.display="block";return null;} err.style.display="none";
    return "Hi Anumon, I'm "+n+(c?" from "+c:"")+".\n\nProject type: "+document.getElementById("fType").value+"\nBudget: "+document.getElementById("fBudget").value+"\n\n"+m;
  }
  document.getElementById("sendWa").addEventListener("click",function(){var t=compose();if(t)window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank","noopener");});
  // mailto via location (window.open would leave an empty tab behind in some browsers)
  document.getElementById("sendMail").addEventListener("click",function(){var t=compose();if(t)location.href="mailto:"+MAIL+"?subject="+encodeURIComponent("Project enquiry: "+document.getElementById("fType").value)+"&body="+encodeURIComponent(t);});
})();
