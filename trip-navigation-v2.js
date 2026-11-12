/* Shared trip storage and navigation. Explicit route URLs always open that route. */
(()=>{'use strict';
const KEY='kicks-trip-settings',routes=['start.html','hawkeye.html'];
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{return {}}};
const save=patch=>{const settings={...read(),...patch};try{localStorage.setItem(KEY,JSON.stringify(settings))}catch{}return settings};
const routeUrl=route=>{const url=new URL(route,location.href);url.searchParams.set('build','directory19');return url.href};
const current=()=>document.querySelector('.hawkeye-header')?'hawkeye.html':'start.html';
function switchTo(route){if(!routes.includes(route))return;save({trip:route});if(route!==current())location.assign(routeUrl(route));}
window.TripNavigation={read,save,current,switchTo};
window.addEventListener('load',()=>{if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});});
const page=location.pathname.split('/').pop();
if((!page||page==='index.html')&&read().trip==='hawkeye.html')location.replace(routeUrl('hawkeye.html'));
})();
