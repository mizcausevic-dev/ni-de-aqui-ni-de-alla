"use strict";(()=>{var rt={duration:30,cocktail:{name:"Ni de Aqu\xED Ni de All\xE1",with:"with Grok",translation:"Neither from here nor from there",creators:"Danny Gonz\xE1lez & Pedro Tobar",bar:"Bar Providencia",city:"Washington, D.C.",glass:"Rocks glass"},liquids:{bourbon:{oz:1,rgb:[198,122,46]},mezcal:{oz:1,rgb:[168,114,68]},syrup:{oz:.5,rgb:[118,68,30],label:"Plantain syrup"},angostura:{dashes:2,rgb:[112,26,20]},bananaBitters:{dashes:2,rgb:[204,158,52]}},beats:[{id:"title",start:0,end:3,kicker:"Bar Providencia",title:"Ni de Aqu\xED Ni de All\xE1",measure:"with Grok",detail:"Neither from here nor from there."},{id:"leaf-liner",start:3,end:5.3,kicker:"Prep the glass",title:"Banana leaf",measure:"Trimmed liner",detail:"Line the inside of a rocks glass."},{id:"ice-cube",start:5.3,end:7.1,kicker:"Prep the glass",title:"Large ice cube",measure:"1 cube",detail:"Place one large ice cube inside."},{id:"mix-ice",start:7.1,end:8.7,kicker:"Mix",title:"Mixing glass",measure:"Filled with ice",detail:"Combine the drink in a mixing glass of ice."},{id:"bourbon",start:8.7,end:11.1,kicker:"Build",title:"Bourbon",measure:"1 oz",detail:"Pour into the mixing glass."},{id:"mezcal",start:11.1,end:13.5,kicker:"Build",title:"Mezcal",measure:"1 oz",detail:"Smoke meets the bourbon."},{id:"syrup",start:13.5,end:15.9,kicker:"Build",title:"Plantain syrup",measure:"\xBD oz",detail:"Or spiced plantain pur\xE9e."},{id:"angostura",start:15.9,end:17.5,kicker:"Build",title:"Angostura bitters",measure:"2 dashes",detail:"Two dashes into the mixing glass."},{id:"banana-bitters",start:17.5,end:19.1,kicker:"Build",title:"Banana bitters",measure:"2 dashes",detail:"Two dashes to finish the build."},{id:"stir",start:19.1,end:22.1,kicker:"Stir",title:"Stir",measure:"Until chilled",detail:"Stir until thoroughly chilled."},{id:"strain",start:22.1,end:25,kicker:"Strain",title:"Strain",measure:"Into the rocks glass",detail:"Strain directly over the leaf and the cube."},{id:"garnish",start:25,end:27.6,kicker:"Garnish",title:"Fresh banana leaf",measure:"1 leaf",detail:"Garnish the finished cocktail."},{id:"hero",start:27.6,end:30,kicker:"Serve",title:"Ni de Aqu\xED Ni de All\xE1",measure:"with Grok",detail:"Neither from here nor from there."}]};function x(e,r){let t=e.beats.find(i=>i.id===r);return t||{id:r,start:e.duration,end:e.duration,kicker:"",title:"",measure:"",detail:""}}var T=(e,r=0,t=1)=>Math.min(t,Math.max(r,e));function y(e,r,t){return t<=r?e>=t?1:0:T((e-r)/(t-r))}function k(e){let r=T(e);return r*r*(3-2*r)}function B(e,r,t){return e+(r-e)*t}function E(e,r){return e<=r.start?0:e>=r.end?1:k(y(e,r.start,r.end))}function K(e,r){let t=r.end-r.start;return k(y(e,r.start+t*.08,r.end-t*.08))}function Mt(e){let r=T(e),t=7.5625,i=2.75;if(r<1/i)return t*r*r;if(r<2/i){let s=r-1.5/i;return t*s*s+.75}if(r<2.5/i){let s=r-2.25/i;return t*s*s+.9375}let n=r-2.625/i;return t*n*n+.984375}function Et(e){let r=0,t=0,i=0,n=0;for(let s of e)s.w<=0||(r+=s.rgb[0]*s.w,t+=s.rgb[1]*s.w,i+=s.rgb[2]*s.w,n+=s.w);return n<=0?[92,62,40]:[r/n,t/n,i/n]}function At(e,r){let t=e.beats;for(let n=0;n<t.length;n++){let s=t[n],d=n===t.length-1;if(r>=s.start&&(r<s.end||d))return{beat:s,index:n}}let i=Math.max(0,t.length-1);return{beat:t[i],index:i}}function nt(e,r){let t=T(r,0,e.duration),{beat:i,index:n}=At(e,t),s=x(e,"title"),d=x(e,"leaf-liner"),b=x(e,"ice-cube"),l=x(e,"mix-ice"),a=x(e,"bourbon"),m=x(e,"mezcal"),u=x(e,"syrup"),p=x(e,"angostura"),g=x(e,"banana-bitters"),h=x(e,"stir"),o=x(e,"strain"),f=x(e,"garnish"),I=x(e,"hero"),F=E(t,d),L=y(t,b.start,b.start+Math.max(.001,(b.end-b.start)*.85)),X=t<b.start?0:Mt(L),R=1+y(L,.68,.8)*(1-y(L,.8,.95))*.09,v=E(t,l),D=k(y(t,l.start,l.end)),H=k(y(t,o.start,o.start+(o.end-o.start)*.28)),M=1;t>=l.start&&t<o.start?M=1-D:t>=o.start&&(M=Math.max(H,t>=o.end?1:H));let w=0;t>=l.start&&t<l.end?w=k(y(t,l.start,l.end)):t>=l.end&&t<o.start?w=1:t>=o.start&&t<o.end&&(w=1-k(y(t,o.start+(o.end-o.start)*.62,o.end)));let S=t<=o.start?0:t>=o.end?1:k(y(t,o.start+.15,o.end-.12)),C=E(t,f),G=E(t,I),V=k(y(t,s.start,Math.min(s.end,s.start+1.35))),$=e.liquids.bourbon.oz*K(t,a),z=e.liquids.mezcal.oz*K(t,m),U=e.liquids.syrup.oz*K(t,u),N=$+z+U,bt=N*(1-S),mt=N*S,Y=e.liquids.angostura.dashes*E(t,p),j=e.liquids.bananaBitters.dashes*E(t,g),pt=Et([{w:$,rgb:e.liquids.bourbon.rgb},{w:z,rgb:e.liquids.mezcal.rgb},{w:U,rgb:e.liquids.syrup.rgb},{w:Y/e.liquids.angostura.dashes*.2,rgb:e.liquids.angostura.rgb},{w:j/e.liquids.bananaBitters.dashes*.12,rgb:e.liquids.bananaBitters.rgb}]),J=null,tt=0,ht=[{id:a,kind:"bourbon"},{id:m,kind:"mezcal"},{id:u,kind:"syrup"}];for(let q of ht)if(t>=q.id.start&&t<=q.id.end){let Z=y(t,q.id.start,q.id.end);Z>.06&&Z<.94&&(J=q.kind,tt=Z)}let et=E(t,h),ft=et*4.25,gt=t>=h.start&&t<h.end?1:0,xt=et,yt=E(t,m)*(t>=I.start?.55:1),O=y(t,o.start,o.end),kt=t<o.start?0:B(0,-168,k(O)),wt=t<o.start?0:B(0,-26,k(O)),_=0;t>=o.start&&t<o.end?_=B(150,28,k(O)):t>=o.end&&(_=B(28,0,k(y(t,f.start,f.start+.8))));let St=B(.92,1,V)+C*.02+G*.07;return{t,beat:i,index:n,count:e.beats.length,leaf:F,cube:X,cubeSquash:R,mixIce:v,rocksIn:M,mixIn:w,mixX:kt,rocksX:_,mixRot:wt,rocksScale:St,mixOz:bt,rocksOz:mt,totalOz:N,color:pt,pour:J,pourLevel:tt,angostura:Y,bananaBitters:j,stirTurns:ft,stirLive:gt,frost:xt,strain:S,garnish:C,hero:G,smoke:yt,intro:V}}function Q(e){let r=Math.max(0,e),t=Math.floor(r/60),i=r-t*60,n=Math.floor(i),s=Math.floor((i-n)*10);return`${t}:${String(n).padStart(2,"0")}.${s}`}var vt=`
<svg class="glass rocks" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" aria-hidden="true">
  <defs>
    <clipPath id="rocksCavity"><path d="M98 102 L128 412 Q200 454 272 412 L302 102 Q200 74 98 102 Z"/></clipPath>
    <linearGradient id="rocksLiquid" x1="0" y1="1" x2="0" y2="0">
      <stop class="liq-deep" offset="0" stop-color="#6a3818"/>
      <stop class="liq-mid" offset="0.62" stop-color="#d4893a"/>
      <stop class="liq-top" offset="1" stop-color="#f0c27a"/>
    </linearGradient>
    <linearGradient id="linerGrad" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#1c4d2c"/>
      <stop offset="0.45" stop-color="#6eae62"/>
      <stop offset="1" stop-color="#234e30"/>
    </linearGradient>
    <linearGradient id="garnishGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8fbf72"/>
      <stop offset="0.4" stop-color="#3f7a42"/>
      <stop offset="1" stop-color="#1d4a2a"/>
    </linearGradient>
    <linearGradient id="iceFace" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.82"/>
      <stop offset="0.45" stop-color="#d5e7ec" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.5"/>
    </linearGradient>
    <clipPath id="rocksWet"><rect class="wet-rect" x="80" y="300" width="240" height="180"/></clipPath>
  </defs>
  <ellipse class="shadow" cx="200" cy="492" rx="96" ry="13" fill="rgba(0,0,0,0.5)"/>
  <ellipse class="hero-glow" cx="200" cy="300" rx="120" ry="150" fill="rgba(228,176,106,0.0)"/>
  <path d="M80 96 L118 436 Q200 484 282 436 L320 96 Q200 58 80 96 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,248,240,0.42)" stroke-width="2.4"/>
  <g clip-path="url(#rocksCavity)">
    <rect x="70" y="70" width="260" height="400" fill="#16100c"/>
    <g class="liner">
      <path d="M124 404 C102 320 96 230 118 150 C132 124 150 118 162 140 C174 220 168 320 154 404 Z" fill="url(#linerGrad)"/>
      <path d="M136 392 C122 300 120 210 142 148" fill="none" stroke="#173c24" stroke-width="1.6"/>
      <path d="M128 360 C140 330 146 300 140 270" fill="none" stroke="#8fbf72" stroke-width="0.8" opacity="0.7"/>
      <path d="M146 370 C154 320 152 250 148 200" fill="none" stroke="#1d4a2c" stroke-width="0.7" opacity="0.8"/>
    </g>
    <rect class="liquid" x="78" y="420" width="244" height="0" fill="url(#rocksLiquid)"/>
    <ellipse class="meniscus" cx="200" cy="420" rx="78" ry="8" fill="#f2c98a" opacity="0"/>
    <g class="specks"></g>
  </g>
  <g class="cube">
    <rect x="146" y="286" width="112" height="112" rx="10" fill="url(#iceFace)" stroke="rgba(255,255,255,0.78)" stroke-width="1.6"/>
    <path d="M164 300 L188 360 L170 386" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
    <path d="M230 308 L214 348 L236 378" fill="none" stroke="rgba(210,230,236,0.45)" stroke-width="1"/>
    <path d="M158 312 L242 330" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="6" stroke-linecap="round"/>
  </g>
  <g class="cube-wet" clip-path="url(#rocksWet)">
    <rect x="146" y="286" width="112" height="112" rx="10" fill="rgba(196,122,48,0.28)"/>
  </g>
  <path d="M108 118 C100 230 112 340 136 418" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M294 128 C306 240 290 346 268 412" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="200" cy="96" rx="120" ry="20" fill="none" stroke="rgba(255,248,240,0.72)" stroke-width="2.6"/>
  <ellipse cx="200" cy="96" rx="100" ry="13" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="1.4"/>
  <g class="condense" fill="rgba(255,255,255,0.55)">
    <circle cx="112" cy="180" r="2.1"/><circle cx="118" cy="230" r="1.5"/><circle cx="108" cy="280" r="1.8"/>
    <circle cx="292" cy="200" r="1.7"/><circle cx="300" cy="260" r="2"/><circle cx="286" cy="320" r="1.4"/>
    <circle cx="126" cy="340" r="1.3"/><circle cx="278" cy="160" r="1.2"/>
  </g>
  <g class="garnish">
    <path d="M188 118 C168 150 176 188 196 196 C188 160 186 136 196 112 C210 78 268 18 372 -18 C452 -6 508 36 492 64 C452 86 372 108 286 122 C230 132 196 128 188 118 Z" fill="url(#garnishGrad)"/>
    <path d="M198 124 C270 78 360 28 478 34" fill="none" stroke="#143222" stroke-width="2.1" stroke-linecap="round"/>
    <path d="M206 112 C280 70 370 32 460 30" fill="none" stroke="#e4f6d4" stroke-width="1" opacity="0.75"/>
    <path d="M200 132 C290 100 390 74 470 66" fill="none" stroke="#1d4a2c" stroke-width="1"/>
    <path d="M214 104 C300 62 390 30 470 26" fill="none" stroke="#245c34" stroke-width="0.8"/>
    <path d="M192 150 C186 178 190 200 204 214" fill="none" stroke="#2a6840" stroke-width="3.4" stroke-linecap="round"/>
  </g>
</svg>`,Gt=`
<svg class="glass mix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" aria-hidden="true">
  <defs>
    <clipPath id="mixCavity"><path d="M124 58 L140 424 Q200 460 260 424 L276 58 Q200 36 124 58 Z"/></clipPath>
    <linearGradient id="mixLiquid" x1="0" y1="1" x2="0" y2="0">
      <stop class="liq-deep" offset="0" stop-color="#6a3818"/>
      <stop class="liq-mid" offset="0.6" stop-color="#d4893a"/>
      <stop class="liq-top" offset="1" stop-color="#f0c27a"/>
    </linearGradient>
    <linearGradient id="bottleGlass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff4e4" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#fff4e4" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <ellipse class="shadow" cx="200" cy="492" rx="78" ry="12" fill="rgba(0,0,0,0.45)"/>
  <path d="M112 48 L132 446 Q200 486 268 446 L288 48 Q200 24 112 48 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(255,248,240,0.4)" stroke-width="2.3"/>
  <g clip-path="url(#mixCavity)">
    <rect x="100" y="40" width="200" height="430" fill="#14100d"/>
    <g class="cubes"></g>
    <rect class="liquid" x="110" y="430" width="180" height="0" fill="url(#mixLiquid)"/>
    <ellipse class="meniscus" cx="200" cy="430" rx="62" ry="7" fill="#f2c98a" opacity="0"/>
    <rect class="frost" x="112" y="52" width="176" height="70" fill="url(#mixLiquid)" opacity="0"/>
    <g class="specks"></g>
  </g>
  <path class="stream" d="M200 20 C200 80 200 120 200 160" fill="none" stroke="#d4893a" stroke-width="7" stroke-linecap="round" opacity="0"/>
  <g class="bottle bourbon">
    <rect x="176" y="-6" width="48" height="18" rx="3" fill="#c47a32"/>
    <rect x="186" y="8" width="28" height="16" fill="#e7c49a"/>
    <rect x="168" y="22" width="64" height="46" rx="6" fill="#b8742e" stroke="rgba(255,255,255,0.3)"/>
    <rect x="176" y="36" width="48" height="14" fill="#f3e2c4" opacity="0.85"/>
  </g>
  <g class="bottle mezcal">
    <rect x="182" y="-18" width="36" height="22" rx="3" fill="#6d6258"/>
    <rect x="190" y="2" width="20" height="18" fill="#d9cfc3"/>
    <rect x="170" y="18" width="60" height="52" rx="8" fill="#8a7564" stroke="rgba(255,255,255,0.25)"/>
    <rect x="180" y="34" width="40" height="16" fill="#1c1916"/>
  </g>
  <g class="bottle syrup">
    <path d="M188 -4 H212 L206 28 H194 Z" fill="#f0d7a4"/>
    <path d="M176 28 H224 L210 70 H190 Z" fill="#8a4e22" stroke="rgba(255,236,210,0.35)"/>
  </g>
  <g class="bottle bitters">
    <rect x="192" y="-8" width="16" height="26" rx="2" fill="#2a211c"/>
    <circle cx="200" cy="28" r="16" fill="#6e221c" stroke="rgba(255,255,255,0.25)"/>
    <rect x="196" y="-16" width="8" height="12" rx="1" fill="#cbbba6"/>
  </g>
  <g class="dashes">
    <circle class="drop a" r="4.4" cx="200" cy="40" fill="#e8c27a" opacity="0"/>
    <circle class="drop b" r="4.4" cx="200" cy="40" fill="#e8c27a" opacity="0"/>
  </g>
  <path d="M136 78 C128 190 134 320 150 410" fill="none" stroke="rgba(255,255,255,0.38)" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="200" cy="48" rx="88" ry="16" fill="none" stroke="rgba(255,248,240,0.7)" stroke-width="2.4"/>
  <g class="spoon">
    <line x1="200" y1="8" x2="200" y2="400" stroke="#d5dde2" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="200" cy="412" rx="18" ry="8" fill="#e7eef2" stroke="#b7c3ca"/>
    <circle cx="200" cy="12" r="5" fill="#e7eef2"/>
  </g>
  <g class="strainer" opacity="0">
    <path d="M132 70 H268" stroke="#d5dde2" stroke-width="3"/>
    <path d="M150 70 q6 16 0 28 M170 70 q6 18 0 32 M190 70 q6 20 0 36 M210 70 q6 20 0 36 M230 70 q6 18 0 32 M250 70 q6 16 0 28" fill="none" stroke="#c5cfd6" stroke-width="1.3"/>
  </g>
</svg>`,ct=[{x:156,y:300,w:52,h:44,r:-8},{x:206,y:318,w:48,h:42,r:11},{x:174,y:246,w:46,h:40,r:4},{x:222,y:258,w:42,h:38,r:-12},{x:188,y:206,w:40,h:34,r:7}];function it(e){let r=new DOMParser().parseFromString(e,"image/svg+xml");if(r.querySelector("parsererror"))throw new Error("SVG failed to parse");return document.importNode(r.documentElement,!0)}function c(e,r){let t=e.querySelector(r);if(!t)throw new Error(`Missing ${r}`);return t}function A(e,r=1){let[t,i,n]=e.map(s=>Math.round(s));return r<1?`rgba(${t},${i},${n},${r})`:`rgb(${t},${i},${n})`}function W(e,r){return[e[0]+(255-e[0])*r,e[1]+(255-e[1])*r,e[2]+(255-e[2])*r]}function Lt(e,r){return[e[0]*(1-r),e[1]*(1-r),e[2]*(1-r)]}function st(e,r){let t=e.querySelector(".liq-deep"),i=e.querySelector(".liq-mid"),n=e.querySelector(".liq-top");t?.setAttribute("stop-color",A(Lt(r,.38))),i?.setAttribute("stop-color",A(r)),n?.setAttribute("stop-color",A(W(r,.35)))}function ot(e,r,t,i,n,s,d){let b=Math.max(0,Math.min(1,r/t)),l=(n-i)*b,a=n-l,m=c(e,".liquid"),u=c(e,".meniscus");m.setAttribute("y",a.toFixed(2)),m.setAttribute("height",Math.max(0,l+8).toFixed(2)),m.setAttribute("opacity",b<.012?"0":"1");let p=s+(d-s)*b;return u.setAttribute("cy",a.toFixed(2)),u.setAttribute("rx",p.toFixed(2)),u.setAttribute("opacity",b<.02?"0":"0.9"),u.setAttribute("fill",(m.getAttribute("fill"),"#f6d7a4")),a}function at(e,r,t){e.replaceChildren();for(let i=0;i<r;i++){let n=document.createElementNS("http://www.w3.org/2000/svg","circle");n.setAttribute("class","speck"),n.setAttribute("cx",String(150+i*47%90)),n.setAttribute("cy",String(250+i*31%140)),n.setAttribute("r",String(1.4+i%3*.6)),n.setAttribute("data-i",String(i)),n.setAttribute("fill",t),e.appendChild(n)}}function Ct(e){e.replaceChildren(),ct.forEach((r,t)=>{let i=document.createElementNS("http://www.w3.org/2000/svg","g");i.setAttribute("class","mini"),i.dataset.i=String(t);let n=document.createElementNS("http://www.w3.org/2000/svg","rect");n.setAttribute("x",String(r.x)),n.setAttribute("y",String(r.y)),n.setAttribute("width",String(r.w)),n.setAttribute("height",String(r.h)),n.setAttribute("rx","5"),n.setAttribute("fill","url(#iceFace)"),n.setAttribute("stroke","rgba(255,255,255,0.75)"),i.appendChild(n),e.appendChild(i)})}function qt(e,r){e.replaceChildren();let t=document.createElement("div");t.className="stage",t.dataset.ready="0",t.dataset.t="0";let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("class","fx"),i.setAttribute("aria-hidden","true"),i.setAttribute("preserveAspectRatio","none");let n=[];for(let o=0;o<6;o++){let f=document.createElementNS("http://www.w3.org/2000/svg","ellipse");f.setAttribute("fill","rgba(186,176,166,0.2)"),i.append(f),n.push(f)}let s=document.createElement("header");s.className="mast";let d=document.createElement("div");d.innerHTML=`<b>${r.cocktail.bar}</b> \xB7 ${r.cocktail.city}`;let b=document.createElement("div");b.textContent=r.cocktail.creators,s.append(d,b);let l=document.createElement("div");l.className="layout";let a=document.createElement("aside");a.className="card",a.innerHTML=`
    <p class="kicker"></p>
    <h1 class="beat-title"></h1>
    <p class="measure"></p>
    <p class="detail"></p>
    <p class="count"></p>
  `;let m=document.createElement("p");m.className="sr-only",m.setAttribute("aria-live","polite"),a.append(m);let u=document.createElement("div");u.className="vessels",u.append(it(vt),it(Gt)),l.append(a,u);let p=document.createElement("footer");p.className="dock",p.innerHTML=`
    <button type="button" class="play" aria-label="Pause"></button>
    <button type="button" class="restart" aria-label="Restart">${Rt()}</button>
    <div class="scrub">
      <input type="range" min="0" max="${r.duration}" step="0.01" value="0" aria-label="Timeline" />
    </div>
    <div class="clock"></div>
    <button type="button" class="capture">Capture</button>
  `,t.append(i,s,l,p),e.append(t);let g=c(t,".glass.rocks"),h=c(t,".glass.mix");return at(c(g,".specks"),7,"#6e1c16"),at(c(h,".specks"),7,"#6e1c16"),Ct(c(h,".cubes")),{stage:t,wisps:n,kicker:c(a,".kicker"),title:c(a,".beat-title"),measure:c(a,".measure"),detail:c(a,".detail"),count:c(a,".count"),live:m,card:a,rocks:g,mix:h,play:c(p,".play"),restart:c(p,".restart"),capture:c(p,".capture"),scrub:c(p,"input"),clock:c(p,".clock")}}function Bt(){return'<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor"/></svg>'}function Ft(){return'<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2 H7 V14 H4 Z M9 2 H12 V14 H9 Z" fill="currentColor"/></svg>'}function Rt(){return'<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5 a5.5 5.5 0 1 1-4.6 2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 2.2 L3.4 5.6 L6.6 4.4 Z" fill="currentColor"/></svg>'}function Vt(e,r,t){let i=c(e,".stream"),n=["bourbon","mezcal","syrup"];for(let m of n){let u=c(e,`.bottle.${m==="syrup"?"syrup":m}`),p=r.pour===m;u.setAttribute("opacity",p?"1":"0");let g=p?Math.sin(r.t*7)*1.5:0;u.setAttribute("transform",`translate(200 24) scale(${p?1.3:1}) translate(-200 -24) translate(0 ${p?g:12})`)}let s=r.beat.id==="angostura"||r.beat.id==="banana-bitters";if(c(e,".bottle.bitters").setAttribute("opacity",s?"1":"0"),c(e,".bottle.bitters").setAttribute("transform",s?"translate(200 20) scale(1.35) translate(-200 -20)":"translate(0 12)"),!r.pour){i.setAttribute("opacity","0");return}let d=r.pour==="bourbon"?t.liquids.bourbon.rgb:r.pour==="mezcal"?t.liquids.mezcal.rgb:t.liquids.syrup.rgb,b=Number(c(e,".liquid").getAttribute("y")||360),a=200+Math.sin(r.t*16)*3;i.setAttribute("stroke",A(d)),i.setAttribute("opacity","0.95"),i.setAttribute("d",`M ${a.toFixed(1)} 36 C ${(a+6).toFixed(1)} 90 ${a.toFixed(1)} ${(b*.55).toFixed(1)} ${a.toFixed(1)} ${b.toFixed(1)}`)}function $t(e,r,t){let i=[c(e,".drop.a"),c(e,".drop.b")],n=r.beat,s=n.id==="angostura"||n.id==="banana-bitters",d=n.id==="banana-bitters"?t.liquids.bananaBitters.rgb:t.liquids.angostura.rgb,b=s?(r.t-n.start)/Math.max(.001,n.end-n.start):0;i.forEach((l,a)=>{let m=.12+a*.4,u=s?(b-m)/.32:-1;if(u<=0||u>=1){l.setAttribute("opacity","0");return}let p=36+u*250;l.setAttribute("cy",p.toFixed(1)),l.setAttribute("cx",String(196+a*10)),l.setAttribute("fill",A(d)),l.setAttribute("opacity",String(u<.85?1:1-(u-.85)/.15))})}function lt(e,r,t,i){e.querySelectorAll(".speck").forEach((s,d)=>{let b=r>.05&&t>.08,l=d>3&&i>.4;s.setAttribute("opacity",b?String(Math.min(.85,r*.45)):"0"),s.setAttribute("fill",l?"#e0b45a":"#6e1c16")})}function zt(e,r,t){let{rocks:i,mix:n}=e,d=e.stage.clientWidth<820?.38:1;i.style.opacity=String(t.rocksIn),n.style.opacity=String(t.mixIn),i.style.visibility=t.rocksIn<.02?"hidden":"visible",n.style.visibility=t.mixIn<.02?"hidden":"visible",i.style.transform=`translate(calc(-50% + ${t.rocksX*d}px), -50%) scale(${t.rocksScale})`,n.style.transform=`translate(calc(-50% + ${t.mixX*d}px), -48%) rotate(${t.mixRot}deg)`;let b=c(i,".liner");b.style.transform=`scaleY(${(.15+.85*t.leaf).toFixed(3)})`,b.style.opacity=String(t.leaf);let l=c(i,".cube"),a=c(i,".cube-wet"),m=(1-t.cube)*-190,u=r.beats.find(M=>M.id==="ice-cube"),p=u&&t.t>=u.start?1:0;l.setAttribute("transform",`translate(0 ${m.toFixed(2)}) translate(202 398) scale(1 ${t.cubeSquash.toFixed(3)}) translate(-202 -398)`),l.setAttribute("opacity",String(p)),a.setAttribute("transform",l.getAttribute("transform")||""),a.setAttribute("opacity",String(p*Math.min(1,t.rocksOz*1.4))),st(i,t.color),st(n,t.color);let g=ot(i,t.rocksOz,4.7,168,416,64,92);ot(n,t.mixOz,3.7,168,422,54,72);let h=c(i,".wet-rect");h.setAttribute("y",g.toFixed(2)),h.setAttribute("height",String(460-g)),c(i,".meniscus").setAttribute("fill",A(W(t.color,.42))),c(n,".meniscus").setAttribute("fill",A(W(t.color,.42)));let f=Math.sin(t.stirTurns*Math.PI*2)*(t.stirLive?3.5:.6);c(n,".meniscus").setAttribute("ry",String(6+Math.abs(f))),Vt(n,t,r),$t(n,t,r),lt(n,Math.max(t.angostura,t.bananaBitters)/2,t.mixOz,t.bananaBitters),lt(i,Math.max(t.angostura,t.bananaBitters)/2,t.rocksOz,t.bananaBitters),n.querySelectorAll(".mini").forEach((M,w)=>{let S=ct[w],C=t.mixIce,G=t.stirTurns*Math.PI*2,V=Math.cos(G+w)*7*Math.max(t.stirLive,t.stirTurns>0&&t.strain<1?.35:0),$=Math.sin(G+w*.7)*5*t.stirLive,z=(1-C)*-30;M.setAttribute("transform",`translate(${V.toFixed(1)} ${($+z).toFixed(1)}) rotate(${S.r+Math.sin(G+w)*8*t.stirLive} ${S.x+S.w/2} ${S.y+S.h/2})`),M.setAttribute("opacity",C.toFixed(3))});let F=c(n,".spoon"),L=t.stirTurns>0&&t.strain<.85;F.setAttribute("opacity",L?String(t.stirLive||t.strain<.2?1:.85):"0"),F.setAttribute("transform",`rotate(${(t.stirTurns*360).toFixed(2)} 200 230)`),c(n,".strainer").setAttribute("opacity",t.strain>.05&&t.strain<.98?String(Math.min(1,t.strain*2)):"0");let P=c(n,".frost");P.setAttribute("fill","rgba(255,255,255,0.45)"),P.setAttribute("opacity",String(t.frost*.55*(t.mixIn>.2?1:0)));let R=c(i,".garnish"),v=t.garnish;R.setAttribute("opacity",v.toFixed(3)),R.setAttribute("transform",`translate(${((1-v)*36).toFixed(1)} ${((1-v)*-28).toFixed(1)}) rotate(${(-16+v*10).toFixed(2)} 220 90)`),c(i,".condense").setAttribute("opacity",String(t.frost*Math.min(1,t.rocksOz*2))),c(i,".hero-glow").setAttribute("fill",`rgba(228,176,106,${(.04+t.hero*.16).toFixed(3)})`),e.title.textContent!==t.beat.title&&(e.card.classList.remove("swap"),e.kicker.textContent=t.beat.kicker,e.title.textContent=t.beat.title,e.measure.textContent=t.beat.measure,e.detail.textContent=t.beat.detail,e.live.textContent=`${t.beat.title}. ${t.beat.measure}. ${t.beat.detail}`,e.card.offsetWidth,e.card.classList.add("swap")),e.count.textContent=`${String(t.index+1).padStart(2,"0")}  /  ${String(t.count).padStart(2,"0")}`,e.clock.textContent=`${Q(t.t)}  /  ${Q(r.duration)}`,e.stage.dataset.t=t.t.toFixed(3),Tt(e,t)}function Tt(e,r){let t=e.stage.getBoundingClientRect();if(e.stage.querySelector(".fx")?.setAttribute("viewBox",`0 0 ${t.width} ${t.height}`),r.smoke<=.02){for(let a of e.wisps)a.setAttribute("opacity","0");return}let s=(r.mixIn>r.rocksIn?e.mix:e.rocks).getBoundingClientRect(),d=e.stage.getBoundingClientRect(),b=s.left-d.left+s.width*.5,l=s.top-d.top+s.height*.2;e.wisps.forEach((a,m)=>{let u=(r.t*.09+m*.17)%1,p=Math.sin(u*Math.PI)*.22*r.smoke,g=b+Math.sin(r.t*.8+m*1.7)*28*(1-u),h=l-u*d.height*.26,o=26+u*64;a.setAttribute("cx",g.toFixed(1)),a.setAttribute("cy",h.toFixed(1)),a.setAttribute("rx",o.toFixed(1)),a.setAttribute("ry",(o*.72).toFixed(1)),a.setAttribute("opacity",p.toFixed(3))})}function dt(e,r){let t=qt(e,r),i=new URLSearchParams(window.location.search),n=i.get("capture")==="1",s=Math.min(r.duration,Math.max(0,Number(i.get("t"))||0)),d=i.get("pause")!=="1";n&&t.stage.classList.add("is-capturing");let b="",l=()=>{let o=nt(r,s);o.beat.id!==b&&(b=o.beat.id,t.title.textContent=""),zt(t,r,o),t.scrub.value=String(s),t.play.innerHTML=d?Ft():Bt(),t.play.setAttribute("aria-label",d?"Pause":"Play")},a={seek(o){s=Math.min(r.duration,Math.max(0,o)),l()},play(){s>=r.duration&&(s=0),d=!0,m=performance.now(),l()},pause(){d=!1,l()},restart(){s=0,d=!0,m=performance.now(),b="",l()},getTime(){return s}};window.__film=a;let m=performance.now(),u=0,p=o=>{let f=Math.min(.05,(o-m)/1e3);m=o,d&&(s=Math.min(r.duration,s+f),s>=r.duration&&(d=!1)),l(),u=requestAnimationFrame(p)};t.play.addEventListener("click",()=>{d?a.pause():a.play()}),t.restart.addEventListener("click",()=>a.restart()),t.capture.addEventListener("click",()=>{t.stage.classList.toggle("is-capturing")}),t.scrub.addEventListener("input",()=>{d=!1,a.seek(Number(t.scrub.value))});let g=o=>{let f=o.target;f&&(f.tagName==="INPUT"||f.tagName==="TEXTAREA")||(o.code==="Space"?(o.preventDefault(),d?a.pause():a.play()):o.code==="KeyR"?a.restart():o.code==="Escape"&&t.stage.classList.remove("is-capturing"))};window.addEventListener("keydown",g);let h=()=>l();return window.addEventListener("resize",h),t.stage.dataset.ready="1",l(),u=requestAnimationFrame(p),()=>{cancelAnimationFrame(u),window.removeEventListener("keydown",g),window.removeEventListener("resize",h);let o=window;o.__film===a&&delete o.__film,e.replaceChildren()}}var ut=document.getElementById("app");ut&&dt(ut,rt);})();
