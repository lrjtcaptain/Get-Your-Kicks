/* Original miniature roadside illustrations; no icon font or stock icon set. */
(()=>{'use strict';
const drawings={
 road:'<path fill="#173a48" stroke="#e7cf94" d="M9 29l9-26h8l9 26z"/><path stroke="#8eeaff" stroke-width="2" stroke-dasharray="4 3" d="M22 5v23"/><path stroke="#3d7e79" d="M4 25l5-8M36 25l4-8"/>',
 rest:'<path fill="#223d32" d="M1 20L7 5l6 15zM30 19l6-17 7 17z"/><path fill="#b99564" stroke="#f5dbac" d="M10 16h24v13H10z"/><path fill="#325768" stroke="#97dce6" d="M6 16L22 6l16 10z"/><path fill="#071c29" d="M15 19h14v10H15z"/><path stroke="#e5bc77" stroke-width="2" d="M12 23h20M16 23l-2 6m13-6 2 6"/>',
 food:'<path fill="#355761" stroke="#afd9dc" d="M4 13q17-12 36 0v15H4z"/><path stroke="#f093a4" stroke-width="2" d="M3 13h38"/><path fill="#efbb69" d="M7 17h7v7H7zm10 0h7v7h-7zm11 0h8v7h-8z"/><path fill="#102638" d="M19 17h5v12h-5z"/><path stroke="#9ceaff" d="M5 27h33"/>',
 fuel:'<path fill="#c9604c" stroke="#f0d7a6" d="M10 7q0-4 5-4h10q5 0 5 4v22H10z"/><path fill="#d8dac4" d="M14 8h12v9H14z"/><path fill="#2a515d" d="M16 10h8v4h-8z"/><path stroke="#e6bb72" d="M14 21h12m-12 3h12"/><path fill="none" stroke="#89bac3" stroke-width="2" d="M30 11q9 0 7 12q-1 5-5 1V13l-3-3"/><path stroke="#f4d6a0" stroke-width="2" d="M7 30h26"/>',
 stay:'<path fill="#31545e" stroke="#a7d9de" d="M3 15h38v14H3z"/><path fill="#eeb575" d="M7 19h7v6H7zm11 0h7v6h-7zm11 0h7v6h-7z"/><path stroke="#ef88a9" stroke-width="2" d="M2 14h40M7 13V4h21v9"/><path stroke="#a9eaff" d="M11 7h13m-13 3h9"/>',
 plan:'<path fill="#d8c394" stroke="#f5e3ba" d="M5 5l11 3 12-3 11 3v21l-11-3-12 3-11-3z"/><path stroke="#967e56" d="M16 8v21M28 5v21"/><path fill="none" stroke="#14647a" stroke-width="2" stroke-dasharray="3 2" d="M10 21q8-16 14-4t10-3"/><circle fill="#b54f44" cx="33" cy="14" r="3"/>',
 passport:'<path fill="#17505b" stroke="#d8bd79" d="M10 3h25v27H10q-5 0-5-4V8q0-5 5-5z"/><path stroke="#d8bd79" d="M10 3v27m5-5h14"/><circle fill="none" stroke="#d8bd79" cx="23" cy="14" r="7"/><path stroke="#d8bd79" d="M16 14h14m-7-7q-6 7 0 14q6-7 0-14"/>',
 settings:'<circle fill="#143a48" stroke="#e0c28b" cx="22" cy="16" r="13"/><circle fill="#0c2635" stroke="#7fcddd" cx="22" cy="16" r="10"/><path fill="#d7ab68" d="M22 5l4 11-4 10-4-10z"/><path fill="#8ce9f4" d="M22 5v21l-4-10z"/><circle fill="#f8e1ac" cx="22" cy="16" r="2"/>',
 search:'<circle fill="#153e4c" stroke="#dec68f" stroke-width="3" cx="19" cy="13" r="9"/><path fill="none" stroke="#85dce9" stroke-width="4" d="M26 20l9 9"/><path fill="none" stroke="#8bd3d9" d="M14 10q4-4 8-1"/>'
};
const art=k=>'<svg class="road-art-icon" aria-hidden="true" viewBox="0 0 44 34">'+(drawings[k]||drawings.road)+'</svg>';
function put(el,key,label){if(!el||el.dataset.roadArt===key&&el.querySelector('.road-art-icon'))return;el.innerHTML=art(key)+'<span>'+label+'</span>';el.dataset.roadArt=key;}
function decorate(){observer.disconnect();
 const labels={Rest:['rest','Rest Areas'],Food:['food','Restaurants'],Fuel:['fuel','Gas'],Truck:['road','Truck Stops'],All:['plan','All stops']};
 document.querySelectorAll('[data-category]').forEach(b=>{const v=labels[b.dataset.category];if(v)put(b,...v);});
 [['#settings-open','settings',''],['#highway-settings-open','settings',''],['#drive-tab','road','Drive'],['#rest-tab','rest','Rest Areas'],['#settings-tab','settings','Settings'],['#neon-plan-tab','plan','Plan'],['[data-screen="drive"]','road','Drive'],['[data-screen="discover"]','plan','Discover'],['[data-screen="passport"]','passport','Passport'],['#dashboard-search','search','Search restaurants & stops']].forEach(([s,k,l])=>put(document.querySelector(s),k,l));
 document.querySelectorAll('.quick button').forEach(b=>put(b,b.dataset.quick==='Food'?'food':b.dataset.quick==='Stay'?'stay':b.dataset.service==='gas stations'?'fuel':'rest',b.dataset.quick==='Food'?'Eat':b.dataset.quick==='Stay'?'Sleep':b.dataset.service==='gas stations'?'Fuel':'Rest'));
 const cap=document.querySelector('.ticker-cap>span');if(cap&&!cap.querySelector('svg'))cap.innerHTML=art('rest');
 document.querySelectorAll('.stop-symbol').forEach(e=>{if(!e.querySelector('svg'))e.innerHTML=art(e.textContent.includes('☾')?'stay':e.textContent.includes('♨')?'food':'road');});
 document.querySelectorAll('.search>span').forEach(e=>{if(!e.querySelector('svg'))e.innerHTML=art('search');});
 // Remove legacy decorative emoji from text, preserving the meaningful must-do star.
 const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=walk.nextNode()){if(n.parentElement.closest('script,style,svg,textarea,input'))continue;const clean=n.nodeValue.replace(/[🅿🚛⛽♨☾☰⚙⌕☷➤◉◌📍🍔🛏🚗🧭]/gu,'');if(clean!==n.nodeValue)n.nodeValue=clean;}
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});
}
const observer=new MutationObserver(decorate);decorate();
})();
