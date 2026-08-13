/*
==========================================================
MAP ENGINE 2.0
==========================================================
*/

const MapEngine = {
    version: "2.0",
    initialized: false,

    initialize() {
        console.log("Initializing Map Engine 2.0 - deployment test");

        this.layer = document.getElementById("map-engine-layer");

        if (this.layer) {
            console.log("Map Engine layer found.");

            const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );

            svg.setAttribute("id", "geographic-map");
            svg.setAttribute("viewBox", "0 0 500 500");
            svg.setAttribute("width", "500");
            svg.setAttribute("height", "500");

            this.layer.appendChild(svg);
            this.drawStateBoundaries(svg);

            console.log("Geographic SVG layer created.");
        }

        this.initialized = true;
    },

    async drawStateBoundaries(svg) {
        const stateIds = [
            "08",
            "20",
            "31",
            "35",
            "40",
            "46",
            "48",
            "56"
        ];

        try {
            const usa = await d3.json(
                "https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json"
            );

            const allStates = topojson.feature(
                usa,
                usa.objects.states
            );

            const selectedStates = {
                type: "FeatureCollection",
                features: allStates.features.filter((state) =>
                    stateIds.includes(
                        String(state.id).padStart(2, "0")
                    )
                )
            };

            const projection = d3.geoMercator()
                .fitExtent(
                    [[20, 20], [480, 480]],
                    selectedStates
                );

            this.projection = projection;

            const path = d3.geoPath(projection);

            d3.select(svg)
                .selectAll(".geographic-state")
                .data(selectedStates.features)
                .join("path")
                .attr("class", "geographic-state")
                .attr("d", path)
                .attr("fill", "rgba(255,255,255,0.06)")
                .attr("stroke", "#ffffff")
                .attr("stroke-width", "1.5");

            console.log("Eight geographic state boundaries drawn.");

            window.dispatchEvent(
                new CustomEvent("mapengine:geography-ready")
            );

        } catch (error) {
            console.error(
                "Unable to draw state boundaries:",
                error
            );
        }
    }
};

MapEngine.initialize();

/*
==========================================================
VERSION 3.1 TIMELINE PRESENTATION ORDER
Human visual-review pass, August 12, 2026.
Order: map -> Tracker Working Index -> timeline controls -> sources.
==========================================================
*/
function applyV31TimelinePresentationOrder(){
    const shell=document.querySelector('.shell');
    const timelineCard=document.querySelector('.timeline-card');
    const mainGrid=document.querySelector('.main-grid');
    const mapCard=document.querySelector('.map-card');
    const statusGrid=document.querySelector('.status-grid');
    const sideStack=document.querySelector('.side-stack');
    const sourceCard=document.querySelector('.source-card');

    if(!shell||!timelineCard||!mainGrid||!mapCard||!statusGrid||document.body.dataset.v31Presentation==='1')return;
    document.body.dataset.v31Presentation='1';

    const style=document.createElement('style');
    style.id='v3-1-presentation-order';
    style.textContent=`
      .shell{max-width:1080px!important;padding-top:16px!important}
      .map-card{margin-bottom:16px}
      .v3-status-card{background:linear-gradient(145deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow);padding:16px;margin-bottom:16px}
      .v3-status-label{margin:0 0 10px;color:#dffcf7;font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
      .v3-status-card .status-grid{margin-top:0}
      .timeline-card{margin-bottom:16px}
      .timeline-card::before{content:'Timeline controls';display:block;margin:0 0 12px;color:#dffcf7;font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase;text-align:center}
      .source-card{margin-bottom:16px}
      .main-grid{display:block!important}
      .side-stack{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
      @media(max-width:760px){.side-stack{grid-template-columns:1fr}.shell{padding-top:10px!important}}
    `;
    document.head.appendChild(style);

    shell.insertBefore(mapCard,shell.firstElementChild);

    const statusSection=document.createElement('section');
    statusSection.className='v3-status-card';
    statusSection.setAttribute('aria-label','Tracker Working Index and basin condition');
    const statusLabel=document.createElement('div');
    statusLabel.className='v3-status-label';
    statusLabel.textContent='Tracker Working Index · relative aquifer condition';
    statusSection.appendChild(statusLabel);
    statusSection.appendChild(statusGrid);
    shell.insertBefore(statusSection,timelineCard);

    if(sourceCard){
        sourceCard.setAttribute('aria-label','Sources used in this map pass');
        shell.insertBefore(sourceCard,mainGrid);
    }

    if(sideStack && !sideStack.children.length){
        mainGrid.remove();
    }
}

/*
==========================================================
VERSION 3.2 "PRETTY MAP" PRESENTATION
Visual layer only. Geographic state paths and the interactive
community / hotspot / infrastructure layers remain controlling.
The basin silhouette is a Tracker orientation graphic, not a
surveyed aquifer boundary.
==========================================================
*/
function prettyMapRgba(color,alpha){
    if(!color)return `rgba(96,165,250,${alpha})`;
    const hex=color.trim().match(/^#([0-9a-f]{6})$/i);
    if(hex){
        const n=parseInt(hex[1],16);
        return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
    }
    const rgb=color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if(rgb)return `rgba(${rgb[1]},${rgb[2]},${rgb[3]},${alpha})`;
    return color;
}

function applyV32PrettyMapPresentation(){
    const mapGrid=document.querySelector('.map-grid');
    const viewport=document.getElementById('map-viewport');
    const basinLayer=document.getElementById('basin-layer');
    const north=document.getElementById('basin-north');
    const central=document.getElementById('basin-central');
    const south=document.getElementById('basin-south');

    if(!mapGrid||!viewport||!basinLayer||!north||!central||!south||document.body.dataset.v32PrettyMap==='1')return;
    document.body.dataset.v32PrettyMap='1';

    const style=document.createElement('style');
    style.id='v3-2-pretty-map-style';
    style.textContent=`
      #map-viewport{
        max-width:720px!important;
        background:
          radial-gradient(circle at 30% 18%,rgba(63,132,169,.18),transparent 34%),
          radial-gradient(circle at 72% 72%,rgba(32,93,115,.14),transparent 38%),
          linear-gradient(145deg,#102732 0%,#091821 55%,#0d202a 100%)!important;
        border-color:rgba(145,190,211,.48)!important;
        box-shadow:inset 0 0 46px rgba(0,0,0,.38),0 16px 34px rgba(0,0,0,.25);
      }
      .map-grid::before{
        content:'';position:absolute;inset:12px 18px;z-index:6;pointer-events:none;border-radius:20px;
        background:
          repeating-linear-gradient(24deg,rgba(255,255,255,.018) 0 1px,transparent 1px 11px),
          radial-gradient(ellipse at 50% 48%,rgba(75,136,155,.10),transparent 60%);
      }
      #map-engine-layer{z-index:70!important;opacity:1!important}
      #geographic-map .geographic-state{
        fill:rgba(28,56,70,.34)!important;
        stroke:rgba(226,240,247,.82)!important;
        stroke-width:1.25!important;
        vector-effect:non-scaling-stroke;
      }
      .state{display:none!important}
      #v32-pretty-aquifer{
        position:absolute;left:70px;top:16px;width:330px;height:468px;z-index:95;pointer-events:none;
        --pretty-north:rgba(96,165,250,.46);
        --pretty-central:rgba(245,158,11,.44);
        --pretty-south:rgba(239,68,68,.46);
        background:linear-gradient(to bottom,
          var(--pretty-north) 0%,var(--pretty-north) 32%,
          rgba(232,244,248,.38) 32.4%,
          var(--pretty-central) 33%,var(--pretty-central) 61%,
          rgba(232,244,248,.34) 61.4%,
          var(--pretty-south) 62%,var(--pretty-south) 100%);
        clip-path:polygon(43% 0%,58% 1%,69% 8%,73% 20%,67% 31%,71% 42%,64% 53%,70% 65%,66% 78%,57% 98%,40% 100%,29% 89%,32% 76%,25% 64%,31% 52%,27% 39%,34% 27%,31% 14%);
        filter:drop-shadow(0 0 1px rgba(255,255,255,.9)) drop-shadow(0 0 12px rgba(56,189,248,.23));
        transition:background .28s ease,filter .28s ease;
      }
      #v32-pretty-aquifer::after{
        content:'';position:absolute;inset:0;clip-path:inherit;
        background:
          radial-gradient(circle at 46% 18%,rgba(255,255,255,.18),transparent 22%),
          radial-gradient(circle at 55% 73%,rgba(255,255,255,.10),transparent 27%),
          repeating-linear-gradient(132deg,rgba(255,255,255,.045) 0 1px,transparent 1px 10px);
        mix-blend-mode:screen;
      }
      .pretty-state-label{
        position:absolute;z-index:110;pointer-events:none;color:rgba(237,247,251,.62);
        font-size:12px;font-weight:900;letter-spacing:.12em;text-shadow:0 2px 5px rgba(0,0,0,.9);
      }
      .basin-zone{background:transparent!important;border-color:transparent!important}
      .basin-zone::after{opacity:.48!important;border-top-style:dotted!important}
      .basin-callout{
        background:rgba(5,18,26,.88)!important;border-width:1px!important;border-left-width:4px!important;
        border-radius:9px!important;padding:7px 9px!important;box-shadow:0 6px 16px rgba(0,0,0,.28);
      }
      .community-marker{box-shadow:0 0 0 2px rgba(3,12,18,.72),0 0 8px rgba(255,255,255,.22)!important}
      .v32-pretty-map-caption{
        max-width:720px;margin:8px auto 0;color:#a9bdc8;font-size:10.5px;line-height:1.45;text-align:center;
      }
      .v32-pretty-map-caption strong{color:#dffcf7}
      @media(max-width:620px){
        #v32-pretty-aquifer{left:70px;top:16px}
        .pretty-state-label{font-size:10px}
        .v32-pretty-map-caption{font-size:9.5px;padding:0 4px}
      }
    `;
    document.head.appendChild(style);

    const field=document.createElement('div');
    field.id='v32-pretty-aquifer';
    field.setAttribute('aria-hidden','true');
    mapGrid.insertBefore(field,basinLayer);

    const stateLabels=[
        ['SD',245,36],['WY',48,112],['NE',292,112],['CO',48,215],
        ['KS',305,225],['NM',52,332],['OK',326,309],['TX',250,414]
    ];
    stateLabels.forEach(([name,left,top])=>{
        const label=document.createElement('span');
        label.className='pretty-state-label';
        label.textContent=name;
        label.style.left=left+'px';
        label.style.top=top+'px';
        label.setAttribute('aria-hidden','true');
        mapGrid.appendChild(label);
    });

    const syncColors=()=>{
        field.style.setProperty('--pretty-north',prettyMapRgba(north.style.color||getComputedStyle(north).color,.46));
        field.style.setProperty('--pretty-central',prettyMapRgba(central.style.color||getComputedStyle(central).color,.44));
        field.style.setProperty('--pretty-south',prettyMapRgba(south.style.color||getComputedStyle(south).color,.48));
    };

    [north,central,south].forEach(zone=>{
        const observer=new MutationObserver(syncColors);
        observer.observe(zone,{attributes:true,attributeFilter:['style']});
    });
    syncColors();

    if(!document.querySelector('.v32-pretty-map-caption')){
        const caption=document.createElement('p');
        caption.className='v32-pretty-map-caption';
        caption.innerHTML='<strong>Map context:</strong> basin colors are a Tracker orientation layer. State boundaries and interactive community points provide geographic reference; the colored silhouette is not a surveyed aquifer boundary.';
        viewport.insertAdjacentElement('afterend',caption);
    }
}

function applyTrackerPresentation(){
    applyV31TimelinePresentationOrder();
    applyV32PrettyMapPresentation();
}

if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyTrackerPresentation,{once:true});
}else{
    applyTrackerPresentation();
}
