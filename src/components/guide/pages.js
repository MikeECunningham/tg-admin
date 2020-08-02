"use strict";
exports.__esModule = true;
var pages = [
    // Blandings Turtle
    {
        speciesCode: "BNTU",
        speciesName: "Blanding's Turtle",
        latinName: "Emydoidea Blandingii",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/blandings/blandings1.jpg",
            "./assets/images/blandings/blandings2.jpg",
            "./assets/images/blandings/blandings3.jpg",
            "./assets/images/blandings/blandings4.jpg",
            "./assets/images/blandings/blandings5.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Scott Gillingwater",
            "Tracy Parker",
            "Scott Gillingwater",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Has bright yellow chin and throat",
            "Has smooth, highly domed upper shell that is black with yellow flecking",
            "Reaches upper shell length of up to 28 cm",
            "Has yellow lower shell that is marked with large dark blotches or is entirely black",
            "Lives in wetlands and basks on rocks, logs or mats of vegetation",
            "Is often seen crossing roads"
        ],
        thumbnail: "./assets/images/avatars/turtles/blandings.png"
    },
    // Midland Painted Turtle
    {
        speciesCode: "MPTU",
        speciesName: "Midland Painted Turtle",
        latinName: "Chrysemys Picta Marginata",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/midlandPainted/midlandPainted1.jpg",
            "./assets/images/midlandPainted/midlandPainted2.jpg",
            "./assets/images/midlandPainted/midlandPainted4.jpg",
            "./assets/images/midlandPainted/midlandPainted5.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Joe Crowley",
            "Scott Gillingwater",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Has broad, smooth, flat upper shell that is olive to black with red marking along edges",
            "Reaches shell length of up to 20 cm",
            "Is striped with red and yellow on head and neck",
            "Is found in most aquatic habitats in southern Ontario"
        ],
        thumbnail: "./assets/images/avatars/turtles/midlandPainted.png"
    },
    // Western Painted Turtle
    {
        speciesCode: "WPTU",
        speciesName: "Western Painted Turtle",
        latinName: "Chrysemys Picta Bellii",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/westernPainted/westernPainted1.jpg"
        ],
        imageCredits: [
            "Joe Crowley"
        ],
        descriptions: [
            "Has smooth, flat upper shell that is olive to black with red marking along edges",
            "Has yellow stripes on head and neck",
            "Grows to over 25 cm long",
            "In Ontario occurs north and west of Lake Superior",
            "Lives in wetlands, rivers, ponds and lakes, and basks on logs, rocks or shorelines"
        ],
        thumbnail: "./assets/images/avatars/turtles/westernPainted.png"
    },
    // Northern Map Turtle
    {
        speciesCode: "MATU",
        speciesName: "Northern Map Turtle",
        latinName: "Graptemys Geographica",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/northernMap/northernMap1.jpg",
            "./assets/images/northernMap/northernMap2.jpg",
            "./assets/images/northernMap/northernMap3.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Scott Gillingwater",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Has upper shell that is olive with yellow lines, similar to contour lines on a map",
            "Has distinct ridge down centre of shell, on which back edge is serrated",
            "Is patterned with yellow lines on head and legs",
            "Grows up to 27 cm long (females larger than males)",
            "Lives in large rivers and lakes"
        ],
        thumbnail: "./assets/images/avatars/turtles/northernMap.png"
    },
    // Snapping Turtle
    {
        speciesCode: "SNTU",
        speciesName: "Snapping Turtle",
        latinName: "Chelydra Serpentina",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/snapping/snapping1.jpg",
            "./assets/images/snapping/snapping2.jpg",
            "./assets/images/snapping/snapping3.jpg",
            "./assets/images/snapping/snapping5.jpg",
        ],
        imageCredits: [
            "Joe Crowley",
            "Scott Gillingwater",
            "Scott Gillingwater",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Is the largest turtle in Ontario, with big head and shell that reaches length of up to 47 cm",
            "Has tan, brown or black upper shell, often covered in algae, serrated at back end",
            "Has very small lower shell",
            "Has triangular spikes along top of long tail",
            "Snaps when threatened on land"
        ],
        thumbnail: "./assets/images/avatars/turtles/snapping.png"
    },
    // Eastern Musk Turtle
    {
        speciesCode: "STIN",
        speciesName: "Eastern Musk Turtle",
        latinName: "Sternotherus Odoratus",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/easternMusk/easternMusk1.jpg",
            "./assets/images/easternMusk/easternMusk2.jpg",
            "./assets/images/easternMusk/easternMusk3.jpg",
            "./assets/images/easternMusk/easternMusk4.jpg",
            "./assets/images/easternMusk/easternMusk5.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Joe Crowley",
            "Scott Gillingwater",
            "Nick Cairns",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Has narrow, domed upper shell that is cream, brown or black with dark flecking and often covered with algae",
            "Reaches upper shell length of up to 13 cm",
            "Has small, fleshy lower shell that is cream to brown",
            "Has light yellow stripe above and below eye on each side of pointy snout",
            "Lives in large water bodies such as ponds, lakes and rivers"
        ],
        thumbnail: "./assets/images/avatars/turtles/easternMusk.png"
    },
    // Spiny Softshell
    {
        speciesCode: "SSTU",
        speciesName: "Spiny Softshell",
        latinName: "Apalone Spinifera",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/spinySoftshell/spinySoftshell1.jpg",
            "./assets/images/spinySoftshell/spinySoftshell2.jpg",
            "./assets/images/spinySoftshell/spinySoftshell4.jpg",
            "./assets/images/spinySoftshell/spinySoftshell5.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Scott Gillingwater",
            "Scott Gillingwater",
            "Joe Crowley"
        ],
        descriptions: [
            "Has leathery, olive-grey to brown upper shell",
            "Has long snout",
            "In males has upper shell with darkly outlined spots",
            "In females has upper shell with green to brown camouflage pattern",
            "Grows up to 46 cm long (females twice as large as males)",
            "In Ontario lives in rivers and some large lakes"
        ],
        thumbnail: "./assets/images/avatars/turtles/spinySoftshell.png"
    },
    // Spotted Turtle
    {
        speciesCode: "SPTU",
        speciesName: "Spotted Turtle",
        latinName: "Clemmys Guttata",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/spotted/spotted1.jpg",
            "./assets/images/spotted/spotted2.jpg",
            "./assets/images/spotted/spotted3.jpg",
            "./assets/images/spotted/spotted4.jpg",
            "./assets/images/spotted/spotted5.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Joe Crowley",
            "Joe Crowley",
            "Joe Crowley",
            "James Paterson"
        ],
        descriptions: [
            "Has smooth, black upper shell with large yellow spots",
            "Has orange-yellow markings on head, neck and limbs",
            "Has lower shell that is completely black or is creamy yellow marked with black",
            "Grows up to 12 cm long",
            "Lives in small, shallow bodies of water, such as bogs, marshes, fens, coastal wetlands and small ponds"
        ],
        thumbnail: "./assets/images/avatars/turtles/spotted.png"
    },
    // Wood Turtle
    {
        speciesCode: "WOTU",
        speciesName: "Wood Turtle",
        latinName: "Glyptemys Insculpta",
        riskLevel: "SAR",
        imageURLs: [
            "./assets/images/wood/wood1.jpg",
            "./assets/images/wood/wood2.jpg",
            "./assets/images/wood/wood3.jpg"
        ],
        imageCredits: [
            "Joe Crowley",
            "Scott Gillingwater",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Is the most terrestrial turtle in Ontario",
            "Has sculpted, yellow to brown upper shell",
            "Has yellowish lower shell with dark blotches",
            "Has striking orange-yellow on neck and front legs",
            "Grows up to 23 cm long",
            "Lives in fast-flowing coldwater rivers and creeks and nearby flood plains and forests"
        ],
        thumbnail: "./assets/images/avatars/turtles/wood.png"
    },
    // Red-Eared Slider
    {
        speciesCode: "RSTU",
        speciesName: "Red-Eared Slider",
        latinName: "Trachemys Scripta Elegans",
        riskLevel: "INV",
        imageURLs: [
            "./assets/images/red-earedSlider/red-earedSlider2.jpg",
            "./assets/images/red-earedSlider/red-earedSlider3.jpg",
            "./assets/images/red-earedSlider/red-earedSlider4.jpg"
        ],
        imageCredits: [
            "Scott Gillingwater",
            "Scott Gillingwater",
            "Scott Gillingwater"
        ],
        descriptions: [
            "Is a non-native turtle often sold in pet stores and released into wild by pet owners",
            "Has green, brown or black upper shell that reaches maximum length of 33 cm",
            "Has distinctive red patch behind each eye, and green head, neck and limbs",
            "Is native to eastern United States"
        ],
        thumbnail: "./assets/images/avatars/turtles/red-earedSlider.png"
    }
];
exports["default"] = pages;
