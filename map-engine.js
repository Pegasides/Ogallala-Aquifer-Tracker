/*
==========================================================
MAP ENGINE 2.0


*/

const MapEngine = {
    version: "2.0",
    initialized: false,

   initialize() {console.log("Initializing Map Engine 2.0 - deployment test");

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

if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyV31TimelinePresentationOrder,{once:true});
}else{
    applyV31TimelinePresentationOrder();
}
