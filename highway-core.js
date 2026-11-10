(function(root){
const R=3958.7613;
function distance(a,b){const r=Math.PI/180,dl=(b.lat-a.lat)*r,dn=(b.lon-a.lon)*r,h=Math.sin(dl/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(Math.min(1,h)))}
function model(coords){let mile=0;return coords.map((c,i)=>{const p={lon:c[0],lat:c[1]};if(i)mile+=distance({lon:coords[i-1][0],lat:coords[i-1][1]},p);return {...p,mile}})}
function project(p,line){if(!p||!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||line.length<2)return null;let best=null;const cos=Math.cos(p.lat*Math.PI/180);for(let i=1;i<line.length;i++){let a=line[i-1],b=line[i],x=(a.lon-p.lon)*cos,y=a.lat-p.lat,dx=(b.lon-a.lon)*cos,dy=b.lat-a.lat,den=dx*dx+dy*dy,t=den?Math.max(0,Math.min(1,-(x*dx+y*dy)/den)):0,lat=a.lat+t*(b.lat-a.lat),lon=a.lon+t*(b.lon-a.lon),away=distance(p,{lat,lon});if(!best||away<best.away)best={mile:a.mile+t*(b.mile-a.mile),away,lat,lon}}return best}
function upcoming(places,mile,direction='WB',category='Rest'){if(!Number.isFinite(mile))return [];return places.filter(p=>Number.isFinite(p.progress)&&p.corridorEligible!==false&&(!p.direction||p.direction===direction)&&p.status!=='closed'&&(category==='All'||p.category===category||p.categories?.includes(category))&&(direction==='WB'?p.progress-mile:mile-p.progress)>0).map(p=>({...p,distance:Math.abs(p.progress-mile)})).sort((a,b)=>a.distance-b.distance)}
const api={distance,model,project,upcoming};if(typeof module==='object'&&module.exports)module.exports=api;else root.HighwayCore=api;
})(typeof globalThis==='object'?globalThis:this);
