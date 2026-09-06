/*
 * Ogallala Aquifer Tracker — central data-center facility registry
 * Version 3.5 maintenance foundation
 *
 * Update evidence here first. The interactive map and power comparison
 * both read from this shared record so approved changes remain consistent.
 */
(function(){
  'use strict';
  window.OATFacilityRegistry={
    schemaVersion:'1.0',
    lastVerified:'2026-08-25',
    evidencePolicy:'Only approved, source-supported changes are published. Proposals, company claims, government actions and independent findings remain separately labeled.',
    mappedLocations:[
 {name:'Duos Edge AI — Amarillo',place:'Potter County, Texas',status:'operational',relation:'On or near the aquifer · city/county reference location',profile:'profile-duos-amarillo',x:41.2,y:46.3},{name:'Duos Edge AI — Hereford',place:'Deaf Smith County, Texas',status:'operational',relation:'Over the aquifer · city/county reference location',x:39.0,y:48.7},{name:'Duos Edge AI — Lubbock',place:'Lubbock County, Texas',status:'operational',relation:'Over the aquifer · city/county reference location',x:42.9,y:55.2},{name:'Duos Edge AI — Dumas',place:'Moore County, Texas',status:'operational',relation:'Over the aquifer · city/county reference location',x:38.0,y:43.8},{name:'Microsoft — Cheyenne campuses',place:'Cheyenne, Wyoming',status:'operational',relation:'Northern border region · city reference location',profile:'profile-cheyenne',x:27.3,y:22.0},{name:'Meta — Sarpy Campus',place:'Sarpy County, Nebraska',status:'operational',relation:'Eastern regional site · county reference location',profile:'profile-meta-sarpy',x:52.0,y:22.0},
 {name:'Project Matador — Fermi America',place:'Carson County northeast of Amarillo, Texas',status:'construction',relation:'Over the aquifer · publicly documented project area',profile:'profile-matador',x:43.0,y:45.5},{name:'Google–Crusoe Goodnight / Project Llano',place:'Armstrong County, Texas',status:'construction',relation:'Over the aquifer · county reference location',profile:'profile-armstrong',x:43.3,y:47.3},{name:'Google — Haskell campuses (2)',place:'Haskell County, Texas',status:'construction',relation:'Southern border region · county reference location',x:46.5,y:59.0},{name:'Google–Intersect Meitner',place:'Gray / Roberts Counties, Texas',status:'construction',relation:'Over the aquifer · county reference location',x:45.0,y:42.8},{name:'Project Caprock — Aligned',place:'Abernathy, Hale County, Texas',status:'construction',relation:'Over the aquifer · city/county reference location',x:43.5,y:53.5},{name:'Meta — Cheyenne',place:'Cheyenne, Wyoming',status:'construction',relation:'Northern border region · city reference location',x:28.2,y:22.4},{name:'Meta — Tulsa',place:'Tulsa / Catoosa, Oklahoma',status:'construction',relation:'Eastern regional site outside the aquifer · regional reference location',profile:'profile-meta-tulsa',x:50.9,y:47.0},{name:'Vantage Frontier',place:'Shackelford County, Texas',status:'construction',relation:'Southern regional site outside the aquifer · county reference location',profile:'profile-vantage-frontier',x:45.2,y:61.4},
 {name:'Project Jade / Cheyenne AI Factory',place:'Laramie County, Wyoming',status:'proposed',relation:'Paused / on hold in northern border region · county reference location',profile:'profile-jade',x:26.7,y:22.5},{name:'Microsoft — Cheyenne expansion',place:'Cheyenne, Wyoming',status:'proposed',relation:'Northern border region · city reference location',profile:'profile-cheyenne',x:27.8,y:21.3},{name:'Beltline',place:'Yukon, Canadian County, Oklahoma',status:'proposed',relation:'Eastern regional site outside the aquifer · city/county reference location',profile:'profile-beltline',x:49.8,y:50.0},{name:'Google — Wilbarger County campus',place:'Wilbarger County, Texas',status:'proposed',relation:'Southeast regional site outside the aquifer · county reference location',x:47.0,y:57.0},{name:'Black Pearl — Cipher / AWS conversion',place:'Winkler County, Texas',status:'proposed',relation:'Operational site; AI conversion underway southwest of the aquifer · county reference location',x:32.4,y:61.5}
],
    powerProfiles:[
 {profile:'profile-armstrong',name:'01 · Google Armstrong County',place:'Texas',mw:933,kind:'context',label:'933 MW',detail:'Proposed onsite gas generation; campus load not separately disclosed'},
 {profile:'profile-dove-creek',name:'02 · Beacons Dove Creek',place:'Texas',mw:2409,kind:'context',label:'2,409 MW',detail:'Proposed dedicated power-plant capacity; data-center load undisclosed'},
 {profile:'profile-beltline',name:'03 · Oklahoma Beltline',place:'Oklahoma',mw:1000,kind:'load',label:'1,000 MW',detail:'Reported proposed campus demand'},
 {profile:'profile-cheyenne',name:'04 · Microsoft Cheyenne',place:'Wyoming',mw:35,kind:'load',label:'35 MW',detail:'Documented existing load approaching 35 MW in 2016; new expansion undisclosed'},
 {profile:'profile-jade',name:'05 · Crusoe Project Jade',place:'Wyoming',mw:1800,kind:'load',label:'1,800 MW',detail:'Announced initial demand; earlier concept described expansion toward 10,000 MW'},
 {profile:'profile-duos-amarillo',name:'06 · Duos Edge AI Amarillo',place:'Texas',mw:null,kind:'nd',label:'Not disclosed',detail:'Official deployment records do not publish electrical demand'},
 {profile:'profile-nebraska-sites',name:'07 · Nebraska Proposed Sites',place:'Nebraska',mw:null,kind:'nd',label:'Not disclosed',detail:'Multi-site profile; no single comparable demand figure'},
 {profile:'profile-matador',name:'08 · Project Matador',place:'Texas',mw:17000,kind:'context',label:'17,000 MW',detail:'Current advertised power-and-AI campus vision; separate TensorWave lease is 222 MW'},
 {profile:'profile-triple-oak',name:'09 · Triple Oak Home Range',place:'Kansas',mw:400,kind:'context',label:'400 MW',detail:'Approved solar-project capacity; prospective data-center demand is not contracted'},
 {profile:'profile-unnamed-panhandle',name:'10 · Unnamed Texas Panhandle',place:'Texas',mw:1100,kind:'claim',label:'≈1,100 MW',detail:'Midpoint of an unverified 1.0–1.2 GW profile claim; identity remains unresolved'},
 {profile:'profile-vantage-frontier',name:'11 · Vantage Frontier',place:'Texas',mw:1400,kind:'load',label:'1,400 MW',detail:'Official planned campus capacity'},
 {profile:'profile-meta-sarpy',name:'12 · Meta Sarpy County',place:'Nebraska',mw:320,kind:'context',label:'320 MW',detail:'New Meta-supported renewable capacity—not a disclosed facility load'},
 {profile:'profile-meta-los-lunas',name:'13 · Meta Los Lunas',place:'New Mexico',mw:885,kind:'context',label:'885 MW',detail:'Supported renewable-energy figure—not a disclosed facility load'},
 {profile:'profile-powerhouse-grand-prairie',name:'14 · PowerHouse Grand Prairie',place:'Texas',mw:1800,kind:'load',label:'1,800 MW',detail:'Announced full-campus capacity; initial ERCOT tranche is 500 MW'},
 {profile:'profile-project-jupiter',name:'15 · Project Jupiter',place:'New Mexico',mw:900,kind:'context',label:'700–900 MW',detail:'Reported dedicated microgrid range; shown at its 900-MW upper bound'},
 {profile:'profile-tesla-cortex',name:'16 · Tesla Cortex / Giga Texas',place:'Texas',mw:500,kind:'load',label:'>500 MW',detail:'Potential expansion; initial reported power-and-cooling requirement was 130 MW'},
 {profile:'profile-meta-tulsa',name:'17 · Meta Tulsa / Anthem',place:'Oklahoma',mw:1500,kind:'context',label:'1,500 MW',detail:'Clean-energy contracts added to the grid—not disclosed facility demand'}
],
    changeLog:[
      {date:'2026-09-06',type:'accuracy',summary:'Realigned city/county data-center reference markers and clarified that community dots are not exact monitoring-well coordinates.'},
      {date:'2026-08-25',type:'maintenance',summary:'Established the shared facility registry, scheduled weekly change reviews, and scheduled monthly full audits.'}
    ]
  };
})();
