import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  Line,
  Sphere,
  Annotation
} from "react-simple-maps";
import { PatternLines } from "@vx/pattern";
import percentages from './percentage';
import islands from './islands';
import engSpeakingPercentage from "./englishSpeakingCountries";
import engIsles from "./engIsles";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// https://www.worldatlas.com/articles/top-coffee-producing-countries.html
const frenchSpeaking = [
  "FRA", "BEL", "CHE", "HTI", "CMR", "CAN", "LUX", "MCO", "SEN", "MDG",
  "CIV", "GAB", "BFA", "TCD", "BEN", "TGO", "DJI", "COD", "MLI", "SYC",
  "NER", "GNQ", "VUT", "GUF", "PYF", "ATF", "GIN", "CAF", "BDI", "COG", "NCL"
]
const frenchImportant = [
  "DZA",
  "MAR",
  "TUN"
]
const spanSpeaking = [
  "ARG", "CHL", "URY", "COL", "HND", "MEX", "GTM", "PER", "NIC", "CRI", "SLV", "ECU", "VEN",
  "DOM", "CUB", "PAN", "BOL", "PRY", "ESP", "GNQ"
];
const engSpeaking = [
  "USA",
  "SGP", "AUS", "IRL", "ZAF", "BLZ", "GUY", "CAN", "NZL", "BHS", "BHS",
  "JAM", "GBR", "NGA", "DMA", "PHL", "MLT", "TTO", "GRD", "IND",
  "VCT", "KNA", "KEN", "GHA", "PNG", "LBR", "SLE", "ZWE",
]
const ableTospeakEnglish = [
  "SUR", "NOR", "SWE", "FIN", "DEU", "NLD",
  "IND", "PAK", "DNK"
]
const canada = [
  "CAN"
]



function generateCircle(deg) {
  if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  return new Array(361).fill(1).map((d, i) => {
    return [-180 + i, deg];
  });
}

const World = ({ setTooltipContent, setNameTooltipContent }) => {
  return (
    <ComposableMap data-tip="" projection="geoEqualEarth" width="900">
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke="#776865"
        strokeWidth={0.5}
        background="#002b80"
        orientation={["diagonal"]}
      />

      <PatternLines
        id="linesEngFr"
        height={5}
        width={5}
        stroke="#002b80"
        strokeWidth={0.6}
        background="#b30000"
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
            const isCAN =
              canada.indexOf(geo.properties.ISO_A3) !== -1;
            if (isCAN) {
              color = "url('#linesEngFr')";
            }
            const isAbleaToSpeakEng =
              ableTospeakEnglish.indexOf(geo.properties.ISO_A3) !== -1;
            if (isAbleaToSpeakEng) {
              color = "#4d0000";
            }
            /*const isSpan =
              spanSpeaking.indexOf(geo.properties.ISO_A3) !== -1;
            if (isSpan) {
              color = "#e65c00";
            }*/
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
                  setNameTooltipContent("");
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

                onClick={() => {
                  setTooltipContent(`${geo.properties.ISO_A2}`);
                  setNameTooltipContent(`${geo.properties.NAME}`);
                  console.log(geo.properties);
                }}
              />
            );
          })
        }
      </Geographies>
      {percentages.map(({ name, coordinates }) => (
        <Marker key={"annot"} coordinates={coordinates}>
          <text
            textAnchor="middle"
            style={{ fontFamily: "system-ui", fill: "yellow", fontSize: 6, pointerEvents: "none" }}
          >
            {name}
          </text>
        </Marker>
      ))}

      {engSpeakingPercentage.map(({ name, coordinates }) => (
        <Marker key={"annot"} coordinates={coordinates}>
          <text
            textAnchor="middle"
            style={{ fontFamily: "system-ui", fill: "pink", fontSize: 6, pointerEvents: "none" }}
          >
            {name}
          </text>
        </Marker>
      ))}

      {islands.map(({ name, percentage, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={2} fill="#002b80" stroke="black" strokeWidth={0.3} />
          <text
            textAnchor="middle"
            y="-3"
            style={{ fontFamily: "system-ui", fill: "yellow", fontSize: 5, pointerEvents: "none" }}
          >
            {name}
          </text>
        </Marker>
      ))}

      {engIsles.map(({ name, percentage, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={2} fill="red" stroke="black" strokeWidth={0.3} />
          <text
            textAnchor="middle"
            y="-3"
            style={{ fontFamily: "system-ui", fill: "yellow", fontSize: 5, pointerEvents: "none" }}
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

export default memo(World);