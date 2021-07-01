import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  Line,
  Sphere
} from "react-simple-maps";
import { PatternLines } from "@vx/pattern";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// https://www.worldatlas.com/articles/top-coffee-producing-countries.html
const frenchSpeaking = [
  "FRA",
  "BEL",
  "CHE",
  "HTI",
  "CMR",
  "CAN",
  "LUX",
  "MCO",
  "SEN",
  "MDG",
  "CIV",
  "GAB",
  "BFA",
  "TCD",
  "BEN",
  "TGO",
  "DJI",
  "COD",
  "MLI",
  "SYC",
  "GNQ",
  "NER",
  "GNQ",
  "VUT",
  "GUF",
  "PYF",
  "ATF",
  "GIN",
  "CAF",
  "BDI",
  "COG"
]

const frenchImportant =[
  "DZA",
  "MAR",
  "TUN"
]
// https://www.worldatlas.com/articles/top-coffee-producing-countries.html
const spanSpeaking = [
  "ARG",
  "CHL",
  "URY",
  "COL",
  "HND",
  "MEX",
  "GTM",
  "PER",
  "NIC",
  "CRI",
  "SLV",
  "ECU",
  "VEN",
  "DOM",
  "CUB",
  "PAN",
  "BOL",
  "PRY",
  "ESP",
];
const engSpeaking = [
  "USA",
  "SGP", "AUS", "IRL", "ZAF", "BLZ", "GUY", "CAN", "NZL", "BHS", "BHS",
  "JAM", "GBR", "NGA", "DMA", "PHL", "MLT", "TTO", "GRD", "IND",
  "VCT", "KNA", "KEN", "GHA", "PNG", "LBR", "SLE", "ZWE"

]

const ableTospeakEnglish =[
"SUR",
"NOR",
"SWE",
"FIN",
"DEU",
"NLD",
"IND",
"BGD",
"PAK"
]

const topGDP =[
  "CHN",
  "KOR",
  "POL"
  ]
  

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};
const markers = [
  {
    markerOffset: -6,
    name: "",
    coordinates: [4.895168, 52.370216]
  },
  {
    markerOffset: -6,
    name: "Bengaluru",
    coordinates: [77.5912997, 12.9791198]
  },
  {
    markerOffset: -6,
    name: "Melbourne",
    coordinates: [144.963058, -37.813629]
  },
  {
    markerOffset: -6,
    name: "",
    coordinates: [13.3888599, 52.5170365]
  },
  {
    markerOffset: -6,
    name: "Montreal",
    coordinates: [-73.567253, 45.501690]
  },
  {
    markerOffset: -6,
    name: "New York",
    coordinates: [-73.935242, 40.730610]
  },
  {
    markerOffset: -6,
    name: "",
    coordinates: [-0.1276474, 51.5073219]
  },
  {
    markerOffset: -6,
    name: "Los Angeles",
    coordinates: [-118.243683, 34.052235]
  },
  {
    markerOffset: -6,
    name: "",
    coordinates: [2.3514616, 48.8566969]
  },
  {
    markerOffset: -6,
    name: "San Fransisco",
    coordinates: [-122.419418, 37.774929]
  },
  {
    markerOffset: -6,
    name: "Seattle",
    coordinates: [-122.3300624, 47.6038321]
  },
  {
    markerOffset: -6,
    name: "Tel Aviv",
    coordinates: [34.7818064, 32.0852997]
  },
  {
    markerOffset: -6,
    name: "Toronto",
    coordinates: [-79.3839347, 43.6534817]
  },
  {
    markerOffset: -6,
    name: "Chicago",
    coordinates: [-87.623177, 41.881832]
  },

];

function generateCircle(deg) {
  if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  return new Array(361).fill(1).map((d, i) => {
    return [-180 + i, deg];
  });
}

const Europe = ({ setTooltipContent, setNameTooltipContent }) => {
  return (
    <ComposableMap data-tip="" projection="geoEqualEarth">
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke="#776865"
        strokeWidth={0.5}
        background="#002b80"
        orientation={["diagonal"]}
      />
      <Sphere stroke="#DDD" strokeWidth={0.3} />
      <Graticule stroke="#DDD" strokeWidth={0.2} />
      <Geographies geography={geoUrl} stroke="#000" strokeWidth={0.4}>
        {({ geographies }) =>
          geographies.map(geo => {
            var color = "#595959";
            const isHighlighted =
              frenchSpeaking.indexOf(geo.properties.ISO_A3) !== -1;
            if (isHighlighted) {
              color = "url('#lines')";
            }
            const isEng =
              engSpeaking.indexOf(geo.properties.ISO_A3) !== -1;
            if (isEng) {
              color = "#b30000";
            }

                const isFrenchImportant =
                frenchImportant.indexOf(geo.properties.ISO_A3) !== -1;
              if (isFrenchImportant) {
                color = "#002b80";
              }

              const isAbleaToSpeakEng = 
              ableTospeakEnglish.indexOf(geo.properties.ISO_A3) !== -1;
              if (isAbleaToSpeakEng) {
                color = "#4d0000";
              }

              const isTopGDP = 
              topGDP.indexOf(geo.properties.ISO_A3) !== -1;
              if (isTopGDP) {
                color = "yellow";
              }
            const isSpan =
              spanSpeaking.indexOf(geo.properties.ISO_A3) !== -1;
            if (isSpan) {
              color = "#e65c00";
            }
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}

                onMouseEnter={() => {
                  setTooltipContent(`${geo.properties.ISO_A2}`);
                  setNameTooltipContent(`${geo.properties.NAME}`);
                  console.log(geo.properties);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                  console.log("");
                }}
                style={{
                  hover: {
                    fill: "#009999",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
                fill={color}

                onClick={() => console.log(geo.properties/*.ISO_A3*/)}
              />
            );
          })
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={2} fill="yellow" stroke="black" strokeWidth={0.3} />
          <text
            textAnchor="middle"
            y="-3"
            style={{ fontFamily: "system-ui", fill: "white", fontSize: 5 }}
          >
            {name}
          </text>
        </Marker>
      ))}
      <Line coordinates={generateCircle(0)} stroke="#F53" strokeWidth={0.5} />
      <Line
        coordinates={generateCircle(23)}
        stroke="#776865"
        strokeWidth={0.5}
        strokeDasharray={[5, 5]}
      />
      <Line
        coordinates={generateCircle(-24)}
        stroke="#776865"
        strokeWidth={0.5}
        strokeDasharray={[5, 5]}
      />
    </ComposableMap>
  );
};

export default memo(Europe);