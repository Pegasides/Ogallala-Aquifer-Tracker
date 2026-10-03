/* Ogallala Aquifer Tracker · Version 3.5
 * Canonical facility, campus-group, proposal and research records.
 * County/city reference markers are schematic, never exact facility coordinates.
 */
(function(){
  'use strict';
  const records = [
  {
    "id": "profile-armstrong",
    "name": "Google–Crusoe Goodnight / Project Llano",
    "place": "Armstrong County, Texas",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Construction documented; sponsor targets first buildings in early 2027. Workforce statements differ and remain attributed.",
    "participants": "Google customer / Crusoe developer; Goodnight wind generation operated by Serena.",
    "water": "Sponsor estimates: construction water varies by stage; operating water approximately 2 million gallons per building per year. These are projections, not measured operations.",
    "cooling": "Crusoe describes closed-loop, non-evaporative liquid cooling.",
    "investmentJobs": "50 permanent jobs projected; September workforce claims are not reconciled. Texas-wide Google investment is not allocated to this campus.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "generation",
        "mw": 933,
        "label": "933 MW",
        "detail": "Proposed onsite gas generation; not facility demand."
      },
      {
        "kind": "renewable",
        "mw": 531,
        "label": "531 MW",
        "detail": "Goodnight 1 and 2 wind nameplate combined; company says one operating and one under construction. Not a facility load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Crusoe confirms its developer role and details the campus energy design",
        "url": "https://www.crusoe.ai/resources/newsroom/crusoe-developing-data-center-campus-in-armstrong-county-texas"
      },
      {
        "label": "Project Llano sponsors disclose construction and resource estimates",
        "url": "https://www.newschannel10.com/2026/09/23/construction-underway-six-building-claude-data-center/"
      },
      {
        "label": "Armstrong County open house draws community concerns",
        "url": "https://abc7amarillo.com/news/local/open-house-held-as-data-center-impact-concerns-grow-in-armstrong-county-project-llano-google-crusoe"
      },
      {
        "label": "Crusoe files for two more buildings at the Goodnight campus",
        "url": "https://www.datacenterdynamics.com/en/news/crusoe-files-for-two-more-data-centers-at-goodnight-campus-in-armstrong-county-texas/"
      }
    ],
    "map": {
      "x": 43.3,
      "y": 47.3
    },
    "relation": "Over the aquifer · county reference location",
    "profile": "profile-armstrong",
    "counted": true
  },
  {
    "id": "profile-dove-creek",
    "name": "Beacon — Dove Creek",
    "place": "Tom Green County near San Angelo, Texas",
    "recordType": "facility",
    "status": "proposed",
    "statusDetail": "Proposed campus and dedicated generation; a permit application does not establish approval.",
    "participants": "Beacon / Dove Creek Technology Campus; tenant not verified.",
    "water": "No verified daily facility demand; Reeves County attribution in older artwork is superseded.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "generation",
        "mw": 2409,
        "label": "2,409 MW",
        "detail": "Proposed dedicated gas-fired power plant capacity; not data-center load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Beacon applies for a large gas-fired power plant serving Dove Creek",
        "url": "https://news.oilandgaswatch.org/template/brief/company-plans-massive-gas-power-plant-for-data-center-south-of-san-angelo-texas"
      },
      {
        "label": "Rural residents seek answers about the Dove Creek proposal",
        "url": "https://conchoobserver.com/rural-residents-want-data-center-answers/"
      },
      {
        "label": "Beacon Dove Creek tracked as proposed in Tom Green County",
        "url": "https://poweredbywho.com/projects/beacon-dove-creek-san-angelo-tx"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-dove-creek",
    "counted": true
  },
  {
    "id": "profile-beltline",
    "name": "Beltline",
    "place": "Yukon, Canadian County, Oklahoma",
    "recordType": "facility",
    "status": "proposed",
    "statusDetail": "Proposal under local review; reclaimed-water negotiations do not constitute an executed supply agreement.",
    "participants": "Beltline Energy; tenant not identified.",
    "water": "Up to 2.5 million gallons/day of treated wastewater discussed in reporting; no verified final supply commitment.",
    "cooling": "City says cooling would use non-potable water and depends on adequate supply.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "load",
        "mw": 1000,
        "label": "1,000 MW",
        "detail": "Reported proposed campus demand; not measured consumption."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Beltline proposal puts Oklahoma’s data-center water rules under scrutiny",
        "url": "https://investigatemidwest.org/2026/07/14/oklahoma-data-centers-water-use-loophole/"
      },
      {
        "label": "Engineering memo reviews wastewater flows available for reuse",
        "url": "https://www.yukonok.gov/DocumentCenter/View/4393/Memo-from-Garver-regarding-effluent-flow-data"
      },
      {
        "label": "City says the proposal remains under review",
        "url": "https://cityofyukonok.gov/CivicAlerts.asp?AID=110&ARC=165"
      },
      {
        "label": "Yukon officials and residents weigh reclaimed-water options",
        "url": "https://www.kosu.org/energy-environment/2025-11-18/as-data-centers-eye-oklahoma-communities-residents-and-officials-weigh-in-on-water-concerns"
      }
    ],
    "map": {
      "x": 49.8,
      "y": 50
    },
    "relation": "Eastern regional site outside the aquifer · city/county reference location",
    "profile": "profile-beltline",
    "counted": true
  },
  {
    "id": "profile-cheyenne",
    "name": "Microsoft — Cheyenne existing campuses",
    "place": "Cheyenne, Wyoming",
    "recordType": "campus-group",
    "status": "operational",
    "statusDetail": "Existing campuses operating. New annexation and expansion proposals have their own record.",
    "participants": "Microsoft owner/operator.",
    "water": "Current total daily demand not established here; do not transfer an expansion estimate to existing campuses.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "historical",
        "mw": 35,
        "label": "35 MW (2016)",
        "detail": "Historical existing-campus load reference; current load not verified."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Homeowner files two challenges to Microsoft expansion annexation",
        "url": "https://cowboystatedaily.com/2026/09/25/cheyenne-woman-asks-court-to-overturn-3-500-acre-microsoft-data-center-annexation/"
      },
      {
        "label": "Cheyenne expansion prompts questions about Wyoming’s state-review process",
        "url": "https://cowboystatedaily.com/2026/07/14/why-microsoft-can-skip-state-review-for-3-500-more-data-center-acres-in-cheyenne/"
      },
      {
        "label": "Microsoft submits applications for two additional Cheyenne expansion areas",
        "url": "https://local.microsoft.com/blog/cheyenne-datacenter-update/"
      },
      {
        "label": "Microsoft announces intent to purchase about 3,200 acres in Cheyenne",
        "url": "https://news.microsoft.com/source/2026/04/14/microsoft-announces-intent-to-expand-datacenter-operations-in-cheyenne-accelerating-innovation-and-economic-growth/"
      }
    ],
    "map": {
      "x": 27.3,
      "y": 22
    },
    "relation": "Northern border region · city reference location",
    "profile": "profile-cheyenne",
    "counted": true
  },
  {
    "id": "profile-cheyenne-expansion",
    "name": "Microsoft — Cheyenne proposed expansion",
    "place": "Cheyenne, Wyoming",
    "recordType": "proposal",
    "status": "proposed",
    "statusDetail": "Additional Cheyenne acreage and annexation under local review/litigation. Filed allegations are unresolved; no assumption of completed construction.",
    "participants": "Microsoft proposed developer/operator.",
    "water": "Current total daily demand not established here; do not transfer an expansion estimate to existing campuses.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Microsoft: expansion intent, April 14, 2026",
        "url": "https://news.microsoft.com/source/2026/04/14/microsoft-announces-intent-to-expand-datacenter-operations-in-cheyenne-accelerating-innovation-and-economic-growth/",
        "publishedAt": "2026-04-14"
      },
      {
        "label": "Microsoft Local: Cheyenne application update",
        "url": "https://local.microsoft.com/blog/cheyenne-datacenter-update/"
      }
    ],
    "map": {
      "x": 27.8,
      "y": 21.3
    },
    "relation": "Northern border region · city reference location",
    "profile": "profile-cheyenne-expansion",
    "counted": true
  },
  {
    "id": "profile-jade",
    "name": "Project Tembo — Google / Jupiter Star",
    "place": "Laramie County, Wyoming",
    "recordType": "facility",
    "status": "proposed",
    "statusDetail": "Revised four-building application documented by Laramie County on July 8, 2026. Supporting energy construction does not prove the data-center buildings are operating.",
    "participants": "Google operating as Jupiter Star Holdings, LLC; successor to the withdrawn Crusoe Project Jade application.",
    "water": "No verified operating water requirement for the revised four-building campus.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "Reported $17 billion proposal and 2031 completion target are sponsor projections.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "historical",
        "mw": 1800,
        "label": "1,800 MW (earlier Jade)",
        "detail": "Superseded Crusoe proposal; excluded from the current-load comparison. Revised campus demand not independently established."
      }
    ],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "County identifies Project Jade’s successor as Project Tembo",
        "url": "https://www.laramiecountywy.gov/files/sharedassets/public/v/1/county/public-notice/project-tembo-memo-07082026.pdf"
      },
      {
        "label": "Google presents its proposed $17 billion Project Tembo plan",
        "url": "https://finance.yahoo.com/technology/articles/google-outlines-17b-project-tembo-171700686.html"
      },
      {
        "label": "Crusoe exits while Tallgrass says the larger development continues",
        "url": "https://cowboystatedaily.com/2026/06/11/partner-pulling-out-doesnt-slow-huge-2-7gw-cheyenne-project-jade-data-center/"
      },
      {
        "label": "Crusoe announces a pause in its Project Jade development activities",
        "url": "https://www.datacenterdynamics.com/en/news/crusoe-pauses-work-on-18gw-cheyenne-wyoming-data-center-at-the-request-of-our-customer/"
      }
    ],
    "map": {
      "x": 26.7,
      "y": 22.5
    },
    "relation": "Northern border region · county reference location",
    "profile": "profile-jade",
    "counted": true
  },
  {
    "id": "profile-duos-amarillo",
    "name": "Duos Edge AI — Amarillo",
    "place": "Potter County, Texas",
    "recordType": "campus-group",
    "status": "operational",
    "statusDetail": "Company deployment/open-house records establish deployed local edge infrastructure. Total facility demand is not published in those records.",
    "participants": "Duos Edge AI, a Duos Technologies subsidiary; local edge infrastructure, not a Google hyperscale campus.",
    "water": "No verified facility-specific water-demand figure in the linked deployment records.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "No campus-specific investment or permanent-job figure verified here.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Duos announces deployment of its second Amarillo edge data center",
        "url": "https://ir.duostechnologies.com/news-events/press-releases/detail/832/duos-edge-ai-deploys-second-edge-data-center-in-amarillo"
      },
      {
        "label": "Potter County lease supports another Amarillo edge deployment",
        "url": "https://www.datacenterdynamics.com/en/news/duos-to-deploy-edge-data-center-in-amarillo-texas/"
      },
      {
        "label": "Potter County commissioners approve the Duos lease agreement",
        "url": "https://www.newschannel10.com/2026/01/27/potter-county-duos-edge-ai-reach-lease-agreement-new-data-center/"
      },
      {
        "label": "First Amarillo deployment established the Region 16 education partnership",
        "url": "https://ir.duostechnologies.com/news-events/press-releases/detail/780/duos-edge-ai-launches-first-edge-data-center"
      }
    ],
    "map": {
      "x": 41.2,
      "y": 46.3
    },
    "relation": "On or near the aquifer · city/county reference location",
    "profile": "profile-duos-amarillo",
    "counted": true
  },
  {
    "id": "news-duos-hereford",
    "name": "Duos Edge AI — Hereford",
    "place": "Deaf Smith County, Texas",
    "recordType": "facility",
    "status": "operational",
    "statusDetail": "Company deployment/open-house records establish deployed local edge infrastructure. Total facility demand is not published in those records.",
    "participants": "Duos Edge AI, a Duos Technologies subsidiary; local edge infrastructure, not a Google hyperscale campus.",
    "water": "No verified facility-specific water-demand figure in the linked deployment records.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "No campus-specific investment or permanent-job figure verified here.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Duos: deployed local edge data-center infrastructure",
        "url": "https://ir.duostechnologies.com/news-events/press-releases/detail/844/duos-edge-ai-to-host-hereford-edge-data-center-open-house",
        "publishedAt": "2026-06-09"
      }
    ],
    "map": {
      "x": 39,
      "y": 48.7
    },
    "relation": "Over the aquifer · city/county reference location",
    "profile": "news-duos-hereford",
    "counted": true
  },
  {
    "id": "news-duos-lubbock",
    "name": "Duos Edge AI — Lubbock",
    "place": "Lubbock County, Texas",
    "recordType": "facility",
    "status": "operational",
    "statusDetail": "Company deployment/open-house records establish deployed local edge infrastructure. Total facility demand is not published in those records.",
    "participants": "Duos Edge AI, a Duos Technologies subsidiary; local edge infrastructure, not a Google hyperscale campus.",
    "water": "No verified facility-specific water-demand figure in the linked deployment records.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "No campus-specific investment or permanent-job figure verified here.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Duos: deployed local edge data-center infrastructure",
        "url": "https://ir.duostechnologies.com/news-events/press-releases/detail/840/duos-edge-ai-to-host-lubbock-edge-data-center-open-house",
        "publishedAt": "2026-05-19"
      }
    ],
    "map": {
      "x": 42.9,
      "y": 55.2
    },
    "relation": "Over the aquifer · city/county reference location",
    "profile": "news-duos-lubbock",
    "counted": true
  },
  {
    "id": "news-duos-dumas",
    "name": "Duos Edge AI — Dumas",
    "place": "Moore County, Texas",
    "recordType": "facility",
    "status": "operational",
    "statusDetail": "Company deployment/open-house records establish deployed local edge infrastructure. Total facility demand is not published in those records.",
    "participants": "Duos Edge AI, a Duos Technologies subsidiary; local edge infrastructure, not a Google hyperscale campus.",
    "water": "No verified facility-specific water-demand figure in the linked deployment records.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "No campus-specific investment or permanent-job figure verified here.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Duos: deployed local edge data-center infrastructure",
        "url": "https://ir.duostechnologies.com/news-events/press-releases/detail/843/duos-edge-ai-to-host-dumas-edge-data-center-open-house",
        "publishedAt": "2026-06-04"
      }
    ],
    "map": {
      "x": 38,
      "y": 43.8
    },
    "relation": "Over the aquifer · city/county reference location",
    "profile": "news-duos-dumas",
    "counted": true
  },
  {
    "id": "profile-nebraska-sites",
    "name": "Nebraska — proposal watchlist",
    "place": "Multiple Nebraska counties; not one facility",
    "recordType": "watchlist",
    "status": "watchlist",
    "statusDetail": "A statewide/county watchlist, excluded from facility counts and load totals. County proceedings and land options are not operating data centers.",
    "participants": "Potential developers vary by site; no single tenant or project identity.",
    "water": "No single demand figure. Individual proposals require separate water evidence.",
    "cooling": "No shared cooling system can be assigned to this watchlist.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Custer County supervisors hear proposed data-center regulations; final action remains pending",
        "url": "https://sandhillsexpress.com/local-news/public-hearings-held-for-road-closure-data-centers-battery-energy-storage/"
      },
      {
        "label": "Arevia-linked LLC options more than 560 acres northwest of Lincoln",
        "url": "https://nebraskapublicmedia.org/en/news/news-articles/another-data-center-developer-is-eyeing-land-just-outside-of-lincoln/"
      },
      {
        "label": "Nebraska appoints a 17-member Data Center Task Force",
        "url": "https://governor.nebraska.gov/gov-pillen-announces-appointments-newly-created-data-center-task-force"
      },
      {
        "label": "Executive order changes state review and incentive treatment",
        "url": "https://governor.nebraska.gov/gov-pillen-signs-executive-order-data-centers"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-nebraska-sites",
    "counted": false
  },
  {
    "id": "profile-matador",
    "name": "Project Matador — Fermi America",
    "place": "Carson County northeast of Amarillo, Texas",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Construction active. Turbines delivered onsite are not necessarily installed or operating; operator agreements do not establish first power.",
    "participants": "Fermi America / Fermi Inc.; TensorWave lease through subsidiaries, subject to contractual closing conditions.",
    "water": "Amarillo agreement concerns up to 2.5 million gallons/day; the older artwork’s 5.75 million figure is superseded.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "17 GW is the advertised campus vision; lease revenue is not construction investment. No completed-campus employment total verified.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "load",
        "mw": 222,
        "label": "222 MW",
        "detail": "TensorWave first-phase total facility power under a conditional lease; future phased delivery, not operating demand."
      },
      {
        "kind": "envelope",
        "mw": 17000,
        "label": "17,000 MW",
        "detail": "Advertised full campus power-and-AI vision; not contracted demand or installed generation."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Fermi names NAES to prepare and operate the natural-gas generation fleet",
        "url": "https://fermiamerica.com/fermi-selects-naes-to-operate-project-matadors-natural-gas-fleet/"
      },
      {
        "label": "Fermi signs CBRE to operate and maintain Building One",
        "url": "https://www.accessnewswire.com/newsroom/en/oil-gas-and-energy/fermi-selects-cbre-to-operate-and-maintain-its-first-data-center-1226802"
      },
      {
        "label": "TensorWave lease closing is extended to October 31",
        "url": "https://www.accessnewswire.com/newsroom/en/oil-gas-and-energy/fermi-and-tensorwave-agree-to-extend-closing-date-to-october-31-2026-1225550"
      },
      {
        "label": "Three Siemens gas turbines reach the Project Matador site",
        "url": "https://fermiamerica.com/first-power-generation-assets-arrive-at-project-matador/"
      }
    ],
    "map": {
      "x": 43,
      "y": 45.5
    },
    "relation": "Over the aquifer · publicly documented project area",
    "profile": "profile-matador",
    "counted": true
  },
  {
    "id": "profile-triple-oak",
    "name": "Triple Oak Home Range",
    "place": "Finney County near Garden City, Kansas",
    "recordType": "proposal",
    "status": "proposed",
    "statusDetail": "Energy-linked data-center prospect. Solar/battery approvals do not approve a data center or the separate gas application.",
    "participants": "Triple Oak Power / Home Range; Sherlock Generation gas component. Prospective data-center customer not identified.",
    "water": "600 million gallons/year (~1.64 million/day) was a developer estimate if a data center proceeds; no verified operating demand.",
    "cooling": "Direct evaporative cooling discussed in reporting for a prospective data center; not an operating system.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "400 MW solar and battery special-use permits reported approved; separate 600 MW Sherlock gas application listed for consideration.",
    "powerFacts": [
      {
        "kind": "renewable",
        "mw": 400,
        "label": "400 MW",
        "detail": "Approved solar-project capacity; no contracted data-center load established."
      },
      {
        "kind": "generation",
        "mw": 600,
        "label": "600 MW",
        "detail": "Separate Sherlock Generation gas proposal; pending application, not approved generation."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Proposed data center could use less water than current irrigation",
        "url": "https://www.hppr.org/hppr-news/2026-06-09/an-ai-data-center-project-for-western-kansas-might-use-less-water-than-irrigation-farming"
      },
      {
        "label": "Finney County approves permits for Home Range solar and battery projects",
        "url": "https://greatergardencity.org/2026/06/county-approves-triple-oak-renewable-projects-special-use-permits/"
      },
      {
        "label": "Triple Oak describes the proposed mixed-energy project and customer discussions",
        "url": "https://homerangecleanpower.com/"
      },
      {
        "label": "Kansas data-center incentive law sets investment, jobs, and water requirements",
        "url": "https://kslegislature.gov/b2025_26/bills/sb98/"
      },
      {
        "label": "Finney County: submitted special-use applications",
        "url": "https://www.finneycounty.org/889/Submitted-SUP-Applications"
      }
    ],
    "map": {
      "x": 39.5,
      "y": 32.6
    },
    "relation": "Central basin region · Garden City county reference, not exact project coordinates",
    "profile": "profile-triple-oak",
    "counted": true
  },
  {
    "id": "profile-unnamed-panhandle",
    "name": "Unnamed Panhandle — unresolved research lead",
    "place": "Texas Panhandle; exact identity and location unresolved",
    "recordType": "research",
    "status": "research",
    "statusDetail": "Excluded from facility counts and numeric power comparison; supplied claims have not been matched to one public project.",
    "participants": "Owner, developer and tenant unresolved. Do not relabel as Caprock, Roman or Llano.",
    "water": "Unverified claims in supplied artwork; no defensible facility attribution.",
    "cooling": "Unverified; no cooling system assigned.",
    "investmentJobs": "Unverified; excluded from facility totals.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Project Caprock breaks ground near Abernathy",
        "url": "https://aligneddc.com/press-release/aligned-breaks-ground-on-project-caprock/"
      },
      {
        "label": "Caprock facility page describes closed-loop cooling and its confirmed address",
        "url": "https://aligneddc.com/abernathy-tx-data-center/"
      },
      {
        "label": "Independent coverage confirms Caprock’s construction scale and schedule",
        "url": "https://www.datacenterdynamics.com/en/news/aligned-breaks-ground-on-540mw-data-center-campus-in-texas/"
      },
      {
        "label": "Texas planners lack complete data-center water-demand information",
        "url": "https://www.texastribune.org/2025/09/25/texas-data-center-water-use/"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-unnamed-panhandle",
    "counted": false
  },
  {
    "id": "news-google-haskell",
    "name": "Google — Haskell campuses (2)",
    "place": "Haskell County, Texas",
    "recordType": "campus-group",
    "status": "construction",
    "statusDetail": "Google says construction began November 2025; two-campus group, counted once as a record.",
    "participants": "Google; two planned campuses grouped in this county record.",
    "water": "Facility-specific operating demand not verified; statewide water commitments do not establish campus consumption.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Google: Haskell County construction update",
        "url": "https://datacenters.google/haskell-county/"
      },
      {
        "label": "Texas Tribune: construction and attributed resident impacts",
        "url": "https://www.texastribune.org/2026/08/27/texas-agriculture-data-centers/",
        "publishedAt": "2026-08-27"
      }
    ],
    "map": {
      "x": 46.5,
      "y": 59
    },
    "relation": "Southern border region · county reference location",
    "profile": "news-google-haskell",
    "counted": true
  },
  {
    "id": "news-google-meitner",
    "name": "Google–Intersect Meitner",
    "place": "Gray / Roberts Counties, Texas",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Construction announced June 4, 2026; no verified operational date.",
    "participants": "Google / Intersect; data center co-located with generation.",
    "water": "No verified facility-specific daily requirement in this record.",
    "cooling": "Google says air cooling limits water use; no measured operating-water figure published in the announcement.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Google: Meitner construction announcement",
        "url": "https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/meitner-energy-center/",
        "publishedAt": "2026-06-04"
      }
    ],
    "map": {
      "x": 45,
      "y": 42.8
    },
    "relation": "Over the aquifer · county reference location",
    "profile": "news-google-meitner",
    "counted": true
  },
  {
    "id": "news-caprock",
    "name": "Project Caprock — Aligned",
    "place": "Abernathy, Hale County, Texas",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Groundbreaking announced April 9, 2026; planned campus capacity is not operating load.",
    "participants": "Aligned Data Centers; hyperscale tenant not publicly identified in the announcement.",
    "water": "No verified facility-specific daily requirement in this record.",
    "cooling": "Aligned describes closed-loop cooling with air-cooled heat rejection.",
    "investmentJobs": "Approximately $5 billion expected investment; 313 acres. Projections are not completed expenditures.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "load",
        "mw": 540,
        "label": "540 MW",
        "detail": "Announced planned campus capacity; not verified operating consumption."
      }
    ],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Aligned: Caprock groundbreaking and design",
        "url": "https://aligneddc.com/press-release/aligned-breaks-ground-on-project-caprock/",
        "publishedAt": "2026-04-09"
      }
    ],
    "map": {
      "x": 43.5,
      "y": 53.5
    },
    "relation": "Over the aquifer · city/county reference location",
    "profile": "news-caprock",
    "counted": true
  },
  {
    "id": "news-meta-cheyenne",
    "name": "Meta — Cheyenne",
    "place": "Cheyenne, Wyoming",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Construction category retained pending primary operational confirmation. Wastewater noncompliance notice was appealed; attribution is disputed.",
    "participants": "Meta; wastewater record identifies CHY1-2 / Goat Systems.",
    "water": "Do not equate an appealed wastewater notice with drinking-water contamination.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "Meta lists $1.2 billion investment, 1,000+ peak construction workers and about 100 operational jobs once complete; sponsor figures.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Meta: official location and planned-job record",
        "url": "https://datacenters.atmeta.com/us-locations/"
      },
      {
        "label": "Cheyenne BOPU: investigation and appeal timeline",
        "url": "https://www.cheyennebopu.org/files/assets/bopu/v/1/user-resources-division-documents/administration/press-releases/2026/timeline.pdf"
      }
    ],
    "map": {
      "x": 28.2,
      "y": 22.4
    },
    "relation": "Northern border region · city reference location",
    "profile": "news-meta-cheyenne",
    "counted": true
  },
  {
    "id": "profile-vantage-frontier",
    "name": "Vantage Frontier",
    "place": "Shackelford County near Abilene, Texas",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Under construction. First building H2 2026 (Vantage); customer delivery H1 2027 (Oracle): different projected milestones.",
    "participants": "Vantage developer; Oracle / OpenAI customer context.",
    "water": "No verified facility-specific daily requirement in this record.",
    "cooling": "Vantage describes closed-loop chilled water and near-zero operational water use; company design claim.",
    "investmentJobs": "Over $25 billion planned investment; ten buildings on about 1,200 acres. Red Oak artwork attribution is superseded.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "load",
        "mw": 1400,
        "label": "1,400 MW",
        "detail": "Announced full-campus capacity; not current consumption."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Oracle posts September 8 construction images and a first-half 2027 customer-delivery target",
        "url": "https://www.oracle.com/data-centers/"
      },
      {
        "label": "Frontier’s official campus page confirms location and cooling design",
        "url": "https://vantage-dc.com/data-center-locations/north-america/shackelford-county-tx"
      },
      {
        "label": "Vantage announces a $25-billion-plus, 1.4-gigawatt campus",
        "url": "https://vantage-dc.com/news/vantage-data-centers-unveils-plans-for-frontier-a-25b-mega-campus-in-texas-to-meet-unprecedented-ai-demand/"
      },
      {
        "label": "Local reporting tracks Frontier’s mobilization and underground work",
        "url": "https://www.thealbanynews.net/news/data-center-progress-full-steam-ahead"
      }
    ],
    "map": {
      "x": 45.2,
      "y": 61.4
    },
    "relation": "Southern regional site outside the aquifer · county reference location",
    "profile": "profile-vantage-frontier",
    "counted": true
  },
  {
    "id": "profile-meta-sarpy",
    "name": "Meta — Sarpy Campus",
    "place": "Papillion / Springfield, Sarpy County, Nebraska",
    "recordType": "campus-group",
    "status": "operational",
    "statusDetail": "Operational campus group; east of the Ogallala footprint.",
    "participants": "Meta owner/operator.",
    "water": "Reported annual withdrawals 26.7–37.5 million gallons during 2020–2024; roughly 73,000–103,000 gallons/day. Historical withdrawals, not a future demand forecast.",
    "cooling": "Reporting describes evaporative and closed-loop systems; older artwork’s simple description is superseded.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "renewable",
        "mw": 320,
        "label": "320 MW",
        "detail": "Meta-supported renewable capacity; not measured campus load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Meta’s Sarpy water withdrawals become part of Nebraska’s disclosure debate",
        "url": "https://nebraskaexaminer.com/2026/07/09/data-centers-can-guzzle-serious-water-as-some-nebraskans-worry-tech-giants-seek-solutions/"
      },
      {
        "label": "Meta publishes Sarpy investment, employment, renewable-energy, and community information",
        "url": "https://datacenters.atmeta.com/asset/sarpy-data-center-info-sheet/"
      },
      {
        "label": "Meta’s expansion formally joined the Springfield community",
        "url": "https://datacenters.atmeta.com/2021/03/sarpy-expanding-by-nearly-1-million-square-feet/"
      },
      {
        "label": "State publishes the Papio–Missouri River NRD’s approved water plans and controls",
        "url": "https://dwee.nebraska.gov/water-planning/papio-missouri-river-nrd"
      }
    ],
    "map": {
      "x": 52,
      "y": 22
    },
    "relation": "Eastern regional site · county reference location",
    "profile": "profile-meta-sarpy",
    "counted": true
  },
  {
    "id": "profile-meta-los-lunas",
    "name": "Meta Los Lunas",
    "place": "Los Lunas, Valencia County, New Mexico",
    "recordType": "campus-group",
    "status": "operational",
    "statusDetail": "Existing campus operating; 2016 groundbreaking, with further expansion separately documented.",
    "participants": "Meta owner/operator.",
    "water": "No verified facility-specific daily requirement in this record.",
    "cooling": "Meta describes water-efficient cooling and repeated reuse; no supported household-equivalency figure.",
    "investmentJobs": "Meta reports over $2.5 billion investment and 400+ operational jobs.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "renewable",
        "mw": 885,
        "label": "885 MW",
        "detail": "Supported renewable-energy capacity; not measured campus load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Meta publishes verified investment, employment, energy, and water-stewardship information",
        "url": "https://datacenters.atmeta.com/asset/los-lunas/"
      },
      {
        "label": "Los Lunas remains an active Meta data-center location",
        "url": "https://datacenters.atmeta.com/us-locations/"
      },
      {
        "label": "Los Lunas approves another two-building Meta expansion",
        "url": "https://www.datacenterdynamics.com/en/news/meta-planning-expansion-of-los-lunas-data-center-campus-in-new-mexico/"
      },
      {
        "label": "Village minutes document infrastructure planning beside Meta’s existing campus",
        "url": "https://loslunasnm.gov/AgendaCenter/ViewFile/Minutes/_02272025-1228"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-meta-los-lunas",
    "counted": true
  },
  {
    "id": "profile-powerhouse-grand-prairie",
    "name": "PowerHouse Grand Prairie",
    "place": "Northern Ellis County near Grand Prairie, Texas",
    "recordType": "facility",
    "status": "proposed",
    "statusDetail": "Permitted project in design/engineering according to developer records. Phase/building descriptions differ between official pages.",
    "participants": "PowerHouse / American Real Estate Partners and Provident; tenant not verified.",
    "water": "No verified facility-specific daily requirement in this record.",
    "cooling": "No verified municipal-greywater cooling claim; older artwork’s statement is unsupported.",
    "investmentJobs": "No verified campus investment or jobs total for the artwork’s claims.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "load",
        "mw": 1800,
        "label": "1,800 MW",
        "detail": "Announced full-campus capacity; initial ERCOT tranche stated as 500 MW. Not operating load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "PowerHouse lists Q4 2026 power delivery and Q1 2027 campus delivery",
        "url": "https://www.powerhousedata.com/data-center/powerhouse-grand-prairie"
      },
      {
        "label": "Developer updates Grand Prairie’s footprint and delivery schedule",
        "url": "https://www.americanrepartners.com/properties/powerhouse-grand-prairie"
      },
      {
        "label": "PowerHouse and Provident announce the 1.8-gigawatt Grand Prairie venture",
        "url": "https://www.powerhousedata.com/news/powerhouse-and-provident-rewrite-the-data-center-playbook-with-new-texas-hyperscale-campus"
      },
      {
        "label": "Independent coverage confirms the developers, county, scale, and phased plan",
        "url": "https://www.datacenterdynamics.com/en/news/powerhouse-and-provident-to-develop-18gw-campus-in-dfw-texas/"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-powerhouse-grand-prairie",
    "counted": true
  },
  {
    "id": "profile-project-jupiter",
    "name": "Project Jupiter Santa Teresa",
    "place": "Santa Teresa, Doña Ana County, New Mexico",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Construction continues. September 17 court action lifted temporary stays; this did not grant the requested air permit. Contractual and flood reports retain their qualifications.",
    "participants": "BorderPlex Digital Assets / STACK Infrastructure developers; Oracle technology participant.",
    "water": "County commitment: potable use averages 20,000 gallons/day and peaks at 60,000 at full build; commitment, not operating measurement.",
    "cooling": "Developers describe closed-loop cooling.",
    "investmentJobs": "Up to $165 billion IRB authority is financing authority, not verified construction cost.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "generation",
        "mw": 2450,
        "label": "Up to 2,450 MW",
        "detail": "Bloom’s planned fuel-cell capacity; sponsor statement, not installed generation or data-center load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Governor’s Office records response provides little detail on July Oracle meeting",
        "url": "https://searchlightnm.org/request-for-records-on-governors-meeting-with-data-center-officials-yields-one-photo/"
      },
      {
        "label": "Companies report flooding reached the campus without critical-infrastructure damage",
        "url": "https://www.oracle.com/news/announcement/project-jupiter-statement-on-southern-new-mexico-floods-2026-09-30/"
      },
      {
        "label": "Oracle invokes protection against a possible 2028 delivery delay",
        "url": "https://www.cnbc.com/2026/09/24/oracle-invokes-force-majeure-on-new-mexico-stargate-campus-as-gas-pipeline-slips.html"
      },
      {
        "label": "Project Jupiter’s $18 billion loan package enters stressed trading territory",
        "url": "https://www.reuters.com/business/finance/oracles-18-billion-data-center-debt-under-pressure-ft-reports-2026-09-18/"
      },
      {
        "label": "Bloom: proposed Jupiter fuel-cell system",
        "url": "https://www.bloomenergy.com/blog/communities-are-right-to-ask-about-the-water-use-of-ai-infrastructure/"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-project-jupiter",
    "counted": true
  },
  {
    "id": "profile-tesla-cortex",
    "name": "Tesla Cortex / Giga Texas",
    "place": "Giga Texas, Austin, Travis County, Texas",
    "recordType": "facility",
    "status": "operational",
    "statusDetail": "Existing Cortex cluster; expansion and separate Dojo/semiconductor initiatives must not be conflated.",
    "participants": "Tesla; Cortex training cluster within the larger industrial complex.",
    "water": "556 million gallons in 2025 was for the entire Giga Texas complex; Cortex-only consumption is unverified.",
    "cooling": "Cluster-specific cooling claim not established by the reviewed sources.",
    "investmentJobs": "No supported cluster-specific cost or employment figure for the older artwork.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "historical",
        "mw": 130,
        "label": "130 MW (initial)",
        "detail": "Reported initial power-and-cooling requirement; potential >500 MW expansion is not current consumption."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Tesla identifies Giga Texas as its headquarters and manufacturing hub",
        "url": "https://www.tesla.com/giga-texas"
      },
      {
        "label": "Tesla disbands the Dojo team and redirects its AI-chip strategy",
        "url": "https://www.reuters.com/business/autos-transportation/tesla-streamline-its-ai-chip-design-work-musk-says-2025-08-07/"
      },
      {
        "label": "Giga Texas treated-water use reaches 556 million gallons in 2025",
        "url": "https://austincurrent.org/2026/04/10/tesla-austin-water-drought-gigafactory-musk/"
      },
      {
        "label": "Austin working group calls for closer review of rising industrial demand",
        "url": "https://services.austintexas.gov/edims/document.cfm?id=475048"
      }
    ],
    "map": null,
    "relation": "Regional context; outside the footprint shown on this schematic.",
    "profile": "profile-tesla-cortex",
    "counted": true
  },
  {
    "id": "profile-meta-tulsa",
    "name": "Meta — Tulsa",
    "place": "East Tulsa, Oklahoma",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Meta announced identity and groundbreaking in April 2026; retained as under construction.",
    "participants": "Meta; formerly coded Project Anthem.",
    "water": "No verified daily demand or direct Arkansas River supply claim.",
    "cooling": "No supported campus-specific system claim in the reviewed sources.",
    "investmentJobs": "Meta: >$1 billion investment, >1,000 peak construction workers, ~100 operational jobs once complete.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "renewable",
        "mw": 1500,
        "label": "1,500 MW",
        "detail": "Clean-energy contracts supporting grid supply; not data-center load."
      }
    ],
    "verifiedAt": "2026-10-01",
    "sources": [
      {
        "label": "Meta confirms Tulsa as its newest AI-optimized data center",
        "url": "https://datacenters.atmeta.com/2026/04/hello-tulsa/"
      },
      {
        "label": "Local and state leaders mark the official Project Anthem groundbreaking",
        "url": "https://partnertulsa.org/meta-breaks-ground-on-new-1-billion-data-center-in-tulsa/"
      },
      {
        "label": "City records establish Project Anthem’s 340-acre incentive district",
        "url": "https://www.cityoftulsa.org/apps/COTDisplayDocument/?DocumentIdentifiers=2750&DocumentType=CouncilDocument"
      },
      {
        "label": "Tulsa considers and approves a temporary pause on additional data centers",
        "url": "https://www.cityoftulsa.org/apps/CouncilDocuments?item=49527"
      }
    ],
    "map": {
      "x": 50.9,
      "y": 47
    },
    "relation": "Eastern regional site outside the aquifer · regional reference location",
    "profile": "profile-meta-tulsa",
    "counted": true
  },
  {
    "id": "news-google-wilbarger",
    "name": "Google — Wilbarger County campus",
    "place": "Wilbarger County, Texas",
    "recordType": "facility",
    "status": "construction",
    "statusDetail": "Google explicitly identifies the campus as under construction on February 24, 2026.",
    "participants": "Google; co-located AES clean-energy projects.",
    "water": "No measured operating daily requirement in the announcement.",
    "cooling": "Google says advanced air cooling; water only for critical campus uses such as kitchens.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Google: Wilbarger campus under construction",
        "url": "https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/data-center-wilbarger-county/",
        "publishedAt": "2026-02-24"
      }
    ],
    "map": {
      "x": 47,
      "y": 57
    },
    "relation": "Southeast regional site outside the aquifer · county reference location",
    "profile": "news-google-wilbarger",
    "counted": true
  },
  {
    "id": "news-black-pearl",
    "name": "Black Pearl — Cipher / AWS conversion",
    "place": "Winkler County, Texas",
    "recordType": "facility",
    "status": "partial",
    "statusDetail": "Cipher says first HPC capacity delivered and rent commenced August 2026; remaining Phase I and Phase II still under construction. This is not full-campus completion.",
    "participants": "Cipher Digital owner/developer; AWS tenant per lease announcements.",
    "water": "No verified facility-specific water figure; portfolio-wide gas announcement is not assigned to this campus.",
    "cooling": "See the evidence below; no system assumed from another facility.",
    "investmentJobs": "See linked records; announced figures are projections unless identified as completed.",
    "permits": "Permit status is distinct from announcement and construction; see current public records below.",
    "powerFacts": [
      {
        "kind": "load",
        "mw": 300,
        "label": "300 MW",
        "detail": "300 MW gross announced AWS/HPC conversion capacity; initial delivery does not establish full 300 MW operation."
      }
    ],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Cipher: initial HPC delivery and remaining construction",
        "url": "https://investors.cipherdigital.com/news-releases/news-release-details/cipher-digital-provides-second-quarter-2026-business-update",
        "publishedAt": "2026-08-04"
      },
      {
        "label": "Cipher: AWS lease and 300 MW gross capacity",
        "url": "https://investors.cipherdigital.com/static-files/5ac7d692-7e1d-413c-b929-e08ee809828b",
        "publishedAt": "2026-06-08"
      }
    ],
    "map": {
      "x": 32.4,
      "y": 61.5
    },
    "relation": "Operational site; AI conversion underway southwest of the aquifer · county reference location",
    "profile": "news-black-pearl",
    "counted": true
  },
  {
    "id": "profile-project-roman",
    "name": "Project Roman — Google proposal",
    "place": "Hereford / Deaf Smith County, Texas",
    "recordType": "proposal",
    "status": "proposed",
    "statusDetail": "Four initial buildings proposed by the chamber/Google project site. Anticipated construction is a sponsor schedule, not proof of a permit or groundbreaking. Distinct from Duos Hereford.",
    "participants": "Google / Deaf Smith County Chamber project sponsors; no third-party tenant identified.",
    "water": "Sponsors say water would be limited to domestic uses during initial phases; no measured operating demand.",
    "cooling": "Proposed non-evaporative air cooling; sponsors say initial buildings will not use water for cooling.",
    "investmentJobs": "Sponsor projections: 1,000 construction jobs and 50 permanent jobs; not verified employment.",
    "permits": "No final site-specific permitting determination established by the sponsor page.",
    "powerFacts": [],
    "verifiedAt": "2026-10-03",
    "sources": [
      {
        "label": "Project Roman: chamber/Google proposal and water claims",
        "url": "https://www.projectroman.com/"
      }
    ],
    "map": {
      "x": 39.6,
      "y": 49.3
    },
    "relation": "Deaf Smith County reference · not exact site coordinates; separate from Duos Hereford",
    "profile": "profile-project-roman",
    "counted": true
  }
];
  const statusLabels={operational:'Operational',construction:'Under construction',proposed:'Proposed',partial:'Initial delivery / construction',watchlist:'Proposal watchlist',research:'Unresolved research lead'};
  const countedRecords=records.filter(r=>r.counted);
  window.OATFacilityRegistry={
    schemaVersion:'2.0',lastVerified:'2026-10-01',lastUpdated:'2026-10-03',records,statusLabels,
    evidencePolicy:'Government actions, sponsor claims, independent reporting and unresolved allegations remain separately attributed. Future aquifer years do not forecast facility completion.',
    counts:{records:records.length,countedRecords:countedRecords.length,researchRecords:records.length-countedRecords.length,mappedLocations:countedRecords.filter(r=>r.map).length,regionalLinks:countedRecords.filter(r=>!r.map).length},
    mappedLocations:countedRecords.filter(r=>r.map).map(r=>({...r,...r.map})),
    regionalLocations:countedRecords.filter(r=>!r.map),
    powerProfiles:records.map(r=>({profile:r.id,name:r.name,place:r.place,facts:r.powerFacts,counted:r.counted})),
    changeLog:[{date:'2026-10-03',type:'approved audit corrections',summary:'Unified counts and profiles; distinguished load from supply, historical figures and research leads; corrected Tembo and Wilbarger; recorded partial Black Pearl delivery; added Roman; removed automatic future operational status.'}]
  };
})();
