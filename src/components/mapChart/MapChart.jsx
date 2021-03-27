import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker
} from "react-simple-maps";

//https://codesandbox.io/s/rmmzrkm75o?file=/src/Map.js
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const eu = [
    "FRA",
    "DEU",
    "ITA",
    "BEL",
    "ESP",
    "LUX",
    "IRL",
    "NLD",
    "DNK",
    "PRT",
    "SWE",
    "FIN",
    "AUT",
    "GRC",
    "POL",
    "CZE",
    "SVK",
    "HUN",
    "EST",
    "LVA",
    "LTU",
    "ROU",
    "BGR",
    "HRV",
    "SVN"
  ];

  const schengen = [
    "FRA",
    "DEU",
    "ITA",
    "BEL",
    "ESP",
    "LUX",
    "NLD",
    "DNK",
    "PRT",
    "SWE",
    "FIN",
    "AUT",
    "GRC",
    "POL",
    "CZE",
    "SVK",
    "HUN",
    "EST",
    "LVA",
    "LTU",
    "HRV",
    "SVN",
    "HRV",
    "CHE",
    "NOR",
    "ISL"
  ]

  /*const highlighted=[
    "POL"

  ]*/

  const eurozone=[
    "FRA",
    "DEU",
    "ITA",
    "BEL",
    "ESP",
    "LUX",
    "NLD",
    "PRT",
    "FIN",
    "AUT",
    "GRC",
    "SVK",
    "EST",
    "LVA",
    "LTU",
    "SVN",
    "IRL"
  ]

const MapChart = (props) => {

  return (
    <ComposableMap
    projection="geoAzimuthalEqualArea"
    projectionConfig={{
      rotate: [-9.0, -53.5, 0],
      scale: 930,
    }}
    width={500}
    style={{ width: "100%", height: "auto" }} 
  >
    <Graticule stroke="#EAEAEC" />
    <Geographies geography={geoUrl}>
      {({ geographies }) =>
        geographies.map(geo => {
          console.log(props.mode.mode);
          var backgroundCountryColor = "eu";
          var isHighlighted = eu.indexOf(geo.properties.ISO_A3) !== -1;
          if(props.mode.mode === "EU"){
            isHighlighted =
            eu.indexOf(geo.properties.ISO_A3) !== -1;
          }else if(props.mode.mode === "Schengen"){
            isHighlighted =
            schengen.indexOf(geo.properties.ISO_A3) !== -1;
            backgroundCountryColor = "blue";
          }else if(props.mode.mode === "Eurozone"){
            isHighlighted =
            eurozone.indexOf(geo.properties.ISO_A3) !== -1;
            backgroundCountryColor = "eu";
          }
          else{
            console.log("hello");
          }
          return (
          
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                /*default: {
                  fill: "#D6D6DA",
                  outline: "none"
                },*/
                hover: {
                  fill: "#E42",
                  outline: "none"
                },
                pressed: {
                  fill: "#E42",
                  outline: "none"
                }
              }}
              fill={isHighlighted ? backgroundCountryColor=="eu" ? "rgb(0, 27, 38)" : "#825051" : "#D6D6DA"}//F53
              stroke="white"
              strokeWidth="0.2px"
              onClick={() => console.log(geo.properties.ISO_A3, isHighlighted)}
              onMouseEnter={() => {
                const { NAME, POP_EST } = geo.properties;
                //this.props.handler = `${NAME} — ${rounded(POP_EST)}`;
              }}
              
              //fill="#9998A3"
              //stroke="#EAEAEC"
              //onClick={test}
            />
          )
        }
          )
      }
    </Geographies>
    <Marker coordinates={[2.7, 46.8]} fill="#777">
      <text textAnchor="middle" fill={"#fdfdfd"} fontSize="8" fontWeight="bold">
        FRA
      </text>
    </Marker>
    <Marker coordinates={[4.7, 50.6]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        BEL
      </text>
    </Marker>
    <Marker coordinates={[5.5, 52.2]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        NLD
      </text>
    </Marker>
    <Marker coordinates={[7, 49.5]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        LUX
      </text>
    </Marker>
    <Marker coordinates={[10.2, 51.4]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        DEU
      </text>
    </Marker>
    <Marker coordinates={[-7.7, 53.3]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        IRL
      </text>
    </Marker>
    <Marker coordinates={[12.2, 42.9]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        ITA
      </text>
    </Marker>
    <Marker coordinates={[-3.4, 40.2]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        ESP
      </text>
    </Marker>
    <Marker coordinates={[19.5, 52]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        POL
      </text>
    </Marker>
    <Marker coordinates={[19.4, 47.0]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        HUN
      </text>
    </Marker>
    <Marker coordinates={[17.1, 45.4]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        HRV
      </text>
    </Marker>
    <Marker coordinates={[14.6, 47.4]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        AUT
      </text>
    </Marker>
    <Marker coordinates={[20, 48.8]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        SVK
      </text>
    </Marker>
    <Marker coordinates={[-8, 40]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        PRT
      </text>
    </Marker>
    <Marker coordinates={[15.6, 49.6]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        CZE
      </text>
    </Marker>
    <Marker coordinates={[14.6, 46]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        SVN
      </text>
    </Marker>
    <Marker coordinates={[25.1, 45.6]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        ROU
      </text>
    </Marker>
    <Marker coordinates={[25.3, 42.6]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        BGR
      </text>
    </Marker>
    <Marker coordinates={[21.7, 38.9]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        GRC
      </text>
    </Marker>
    <Marker coordinates={[24, 55.2]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        LTU
      </text>
    </Marker>

    <Marker coordinates={[25.4,56.8]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        LVA
      </text>
    </Marker>

    <Marker coordinates={[25.1,58.6]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        EST
      </text>
    </Marker>

    <Marker coordinates={[25,62.3]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        FIN
      </text>
    </Marker>

    <Marker coordinates={[15.7,62.7]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        SWE
      </text>
    </Marker>

    <Marker coordinates={[8.5,62]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        NOR
      </text>
    </Marker>

    <Marker coordinates={[8.1,46.8]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        CHE
      </text>
    </Marker>

    <Marker coordinates={[-1.6,52]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        GBR
      </text>
    </Marker>

    <Marker coordinates={[33,58]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        RUS
      </text>
    </Marker>
    <Marker coordinates={[31,48.57]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        UKR
      </text>
    </Marker>
    <Marker coordinates={[34.7,38.6]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        TUR
      </text>
    </Marker>
    <Marker coordinates={[-18.19,64.62]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        ISL
      </text>
    </Marker>
    <Marker coordinates={[9.6,35.5]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        TUN
      </text>
    </Marker>
    <Marker coordinates={[3.15,35.2]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        DZA
      </text>
    </Marker>
    <Marker coordinates={[-4.3,34.2]} fill="#777">
      <text textAnchor="middle" fill="#fdfdfd" fontSize="8" fontWeight="bold">
        MAR
      </text>
    </Marker>
    
  </ComposableMap>
  );
};

export default MapChart;
