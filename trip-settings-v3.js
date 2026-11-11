/* Route choice takes effect immediately; each trip keeps its own direction. */
(()=>{'use strict';
const original=settingsPanel;
settingsPanel=function(){
 original();
 const body=document.querySelector('#sheet-body'),fields=document.createElement('div');
 fields.className='route-settings';
 fields.innerHTML='<div class="trip-picker" aria-label="Choose route"><p class="eyebrow">YOUR ROUTE · TAP TO SWITCH</p><div class="trip-picker-buttons"><button type="button" data-trip="start.html" aria-pressed="true">Route 66<small>Chicago ↔ Santa Monica</small></button><button type="button" data-trip="hawkeye.html" aria-pressed="false">Hawkeye Highway<small>I-88 / I-80 · Chicago ↔ Council Bluffs</small></button></div></div><label class="field">Travel direction<select id="settings-route-direction"><option value="1">Chicago → Santa Monica</option><option value="-1">Santa Monica → Chicago</option></select></label><button class="secondary wide" id="settings-trail">GPS &amp; breadcrumbs</button>';
 body.querySelector('.sheet-title').after(fields);
 fields.querySelectorAll('[data-trip]').forEach(b=>b.onclick=()=>TripNavigation.switchTo(b.dataset.trip));
 const direction=fields.querySelector('#settings-route-direction');direction.value=String(state.direction);
 direction.onchange=()=>{state.direction=Number(direction.value);nextId=null;TripNavigation.save({trip:'start.html',route66Direction:state.direction});persist();if(data)renderAll()};
 document.querySelector('#settings-trail').onclick=gpsPanel;
 const position=document.querySelector('#settings-position');if(position)position.textContent='Planning location';
 const save=document.querySelector('#save-settings'),originalSave=save.onclick;
 save.onclick=()=>{TripNavigation.save({trip:'start.html',route66Direction:state.direction});originalSave()};
};
 document.querySelector('#settings-open').onclick=settingsPanel;
})();
