/* Dashboard presentation; GPS and forward-only planning remain in the core. */
const dashboardDrive=renderDrive;
renderDrive=function(){
 dashboardDrive();
 const host=document.querySelector('#next-card');
 if(!positionReady){
  const denied=/denied|permission/i.test(positionMessage)&&!positionBusy;
  host.innerHTML=`<article class="destination"><div class="neon-cap">◎ YOUR ROAD. YOUR STARTING POINT.</div><div class="location-icon">➤</div><h1>${denied?'Let’s get you located.':'The road starts here.'}</h1><p class="reason">${esc(positionMessage)}</p>${denied?'<div class="recovery">On iPhone: Settings → Privacy & Security → Location Services. Allow your browser to use your location and turn on Precise Location. Check this website’s location permission in your browser, too.</div>':''}<button class="primary wide" id="actual-position-button">${positionBusy?'Finding you…':'Use my location'}</button><button class="text-button wide" id="neon-manual">Choose a planning town</button></article>`;
  document.querySelector('#actual-position-button').onclick=requestActualPosition;
  document.querySelector('#neon-manual').onclick=positionPanel;
 }else{
  const p=data.places.find(p=>p.id===nextId);
  if(p){const e=eta(p);host.innerHTML=`<article class="destination"><div class="neon-cap">➤ NEXT PLANNED STOP</div><div class="stop-name"><div class="stop-symbol">${p.category==='Food'?'♨':p.category==='Stay'?'☾':'66'}</div><div><h1>${esc(p.name)}</h1><div class="townline">${esc(p.town)}, ${esc(p.state)}</div></div></div>${p.mustDo?'<div class="neon-star">★ MUST DO · THE REAL ROUTE 66</div>':''}<div class="metrics"><div><strong>${e?Math.round(e.miles)+' mi':'—'}</strong><small>Estimated distance ahead</small></div><div><strong>${e?fmt(e.hours):'—'}</strong><small>Estimated travel + stops</small></div></div><p class="reason">${esc(p.highlightReason||'A good reason to take the Mother Road.')}</p><div class="stop-actions"><button data-detail="${p.id}">☷ Details</button>${p.phone?'<a href="tel:'+esc(p.phone.replace(/[^+\d]/g,''))+'">Call</a>':'<button disabled aria-label="Phone number unavailable">Call</button>'}<button class="go" data-neon-nav="${p.id}">➤ Navigate</button></div></article>`;}
 }
 let plans=document.querySelector('#neon-plans');if(!plans){plans=document.createElement('div');plans.id='neon-plans';plans.className='neon-plans';host.after(plans)}
 plans.innerHTML=[['Food','♨','EAT AHEAD',state.eat],['Stay','☾','SLEEP AHEAD',state.sleep]].map(([category,icon,label,hours])=>{const p=positionReady?getPlan(category,hours)[0]:null;return `<button class="neon-card neonon neon-plan" data-neon-plan="${category}"><span class="plan-icon">${icon}</span><span class="plan-copy"><b>${label} · ${hours}H</b><strong>${p?esc(p.name):'Find your next great stop'}</strong><small>${p?(p.mustDo?'★ ':'')+esc(p.town)+(p.early?' · Worth stopping early':' · Ahead of you'):'Set your timing · stars first'}</small></span><span class="arrow">›</span></button>`}).join('');
};
document.querySelector('.brand>span:last-child').innerHTML='Get Your <em>Kicks</em>';
document.querySelector('#settings-open').textContent='☰';
const planTab=document.createElement('button');planTab.id='neon-plan-tab';planTab.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 4h14v17H5zM8 2v4m8-4v4M8 10h8m-8 4h5"/></svg><span>Plan</span>';planTab.onclick=()=>{openPlan()};document.querySelector('.bottom-nav').insertBefore(planTab,document.querySelector('[data-screen="discover"]'));
document.addEventListener('click',event=>{const navButton=event.target.closest('[data-neon-nav]');if(navButton){const p=data.places.find(p=>p.id===navButton.dataset.neonNav);if(p)sheet('<div class="eyebrow">LET’S GO</div><h2 class="sheet-title">'+esc(p.name)+'</h2><p class="sheet-intro">Choose your navigation app.</p>'+nav(p)+'<p class="small-note">Destination navigation may choose faster roads. These links do not lock navigation to historic Route 66.</p>')}const planButton=event.target.closest('[data-neon-plan]');if(planButton){planKind=planButton.dataset.neonPlan;openPlan()}});
if(data)renderDrive();
