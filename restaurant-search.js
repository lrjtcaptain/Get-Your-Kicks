(function(root){
const normalize=value=>String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/['’`]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
function search(places,query,{area=null,direction=1,starsOnly=false}={}){const terms=normalize(query).split(' ').filter(Boolean);return places.filter(p=>{if(starsOnly&&!p.mustDo)return false;if(area!==null&&(!Number.isFinite(area)||!Number.isFinite(p.area)||direction*(p.area-area)<=0))return false;const text=normalize([p.name,p.chain,...(p.aliases||[]),p.city,p.address,...(p.tags||[]),...(p.amenities||[])].join(' '));return terms.every(term=>text.includes(term))}).sort((a,b)=>Number(b.mustDo)-Number(a.mustDo)||direction*(a.area-b.area)||a.name.localeCompare(b.name));}
const api={normalize,search};if(typeof module==='object'&&module.exports)module.exports=api;else root.RestaurantSearch=api;
})(typeof globalThis==='object'?globalThis:this);
