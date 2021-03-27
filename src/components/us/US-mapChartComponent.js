import React, { memo }  from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";

import allStates from "./data/allstates.json";
import { PatternLines } from "@vx/pattern";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

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

const US_MapChart = (props) => {

  const markers = [
    {
      markerOffset: -6,
      name: "New York",
      coordinates: [-73.935242,40.730610]
    },
    {
      markerOffset: -6,
      name: "Los Angeles",
      coordinates: [-118.243683,34.052235]
    },
    {
      markerOffset: -6,
      name: "Chicago",
      coordinates: [-87.623177,41.881832]
    }
  ];
  
  return (
    <ComposableMap height="500" data-tip="" projection="geoAlbersUsa">

      <PatternLines
        id="lines"
        height={6}
        width={6}
        stroke="#D6D6DA"
        strokeWidth={4}
        background="#776865"
        orientation={["diagonal"]}
      />

      <ZoomableGroup zoom={1}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                onMouseEnter={() => {
                  props.parentCallback(geo.properties.name);
                  console.log(geo.properties.name==="Texas");
                }}
                onMouseLeave={() => {
                  //props.parentCallback("");
                  //console.log("");
                }}
                style={{
                  /*default: {
                    fill: "#D6D6DA",
                    outline: "none"
                  },*/
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
                fill={geo.properties.name === "Texas" ? "url('#lines')" : "#D6D6DA"}
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={11} textAnchor="middle" fontFamily= "Roboto, system-ui">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={11} alignmentBaseline="middle" fontFamily= "Roboto, system-ui" fill= "#101010">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>

      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={4} fill="#F00" stroke="#fff" strokeWidth={1} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "Roboto, system-ui", fill: "#101010", fontSize: 11}}
          >
            {name}
          </text>
        </Marker>
      ))}

      </ZoomableGroup>

    </ComposableMap>
  );
};

export default memo (US_MapChart);
