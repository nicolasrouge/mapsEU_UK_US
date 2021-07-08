import React, { memo, useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { PatternLines } from "@vx/pattern";
import frenchSpeakers from './frenchSpeakers.csv';
import latlongCountries from './world_country_and_usa_states_latitude_and_longitude_values.csv';
import { ZoomableGroup } from "react-simple-maps"
import { LinearGradient } from '@vx/gradient';

//https://vx-demo.vercel.app/docs/group
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// https://www.worldatlas.com/articles/top-coffee-producing-countries.html

const spanSpeaking = [
  "ARG", "CHL", "URY", "COL", "HND", "MEX", "GTM", "PER", "NIC", "CRI", "SLV", "ECU", "VEN",
  "DOM", "CUB", "PAN", "BOL", "PRY", "ESP", "GNQ"
];

const canada = [
  "CAN"
]

function generateCircle(deg) {
  if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  return new Array(361).fill(1).map((d, i) => {
    return [-180 + i, deg];
  });
}

//https://en.wikipedia.org/wiki/Geographical_distribution_of_French_speakers
/**      <Sphere stroke="#DDD" strokeWidth={0.3} />
      <Graticule stroke="#DDD" strokeWidth={0.2} /> */
const colorScale = scaleLinear()
  .domain([0, 0.72])
  .range(["#ffedea", "#105d8b"]);

const colorScale2 = scaleLinear()
  .domain([0, 0.70])
  .range(["#ffedea", "#b30000"]);

const World = ({ setTooltipContent, setNameTooltipContent, setComment }) => {
  const [data, setData] = useState([]);
  const [latLongdata, setLatLongData] = useState([]);

  useEffect(() => {
    csv(frenchSpeakers).then((data) => {
      setData(data);
    });

    //latlongCountries

    csv(latlongCountries).then((data) => {
      setLatLongData(data);
    });

  }, []);



  return (
    <ComposableMap data-tip="" projection="geoEqualEarth" width="900" height="1400" zoom="0.5">
      <ZoomableGroup>
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke="#776865"
        strokeWidth={0.5}
        background="#002b80"
        orientation={["diagonal"]}
      />
      
      //canada
      <LinearGradient id="gradient" from="#990000" to="#002a6b" x1="60.7%" y1="0%" x2="61%" y2="0%"/>;

      <PatternLines
        id="linesEngFr"
        height={5}
        width={5}
        stroke="#002b80"
        strokeWidth={0.6}
        strokeLinecap= "butt"
        background="red"
        shapeRendering="100"
        orientation={["diagonal"]}
      />


      {data.length > 0 && (
        <Geographies geography={geoUrl} stroke="#000" strokeWidth={0.4}>
          {({ geographies }) =>
            geographies.map(geo => {
              var color = "white";
              
              const d = latLongdata.find((s) => s.country_code === geo.properties.ISO_A2);


              if(d !== undefined){
                color = colorScale2(d["english"]);
                console.log("d", d);
                if(d.french !== "" && d.french >d.english ){
                  color = colorScale(d["french"]);
                }
              }

              const isCAN =
                canada.indexOf(geo.properties.ISO_A3) !== -1;
              if (isCAN) {
                color = "url('#gradient')"
              }

              return (

                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.ISO_A2}`);
                    setNameTooltipContent(`${geo.properties.NAME}`);

                    //get the comment
                    const d = latLongdata.find((s) => s.country_code === geo.properties.ISO_A2);
                    var comment = "";
                    if(d !== undefined){
                      console.log("d", d);
                      if(d["com"] != ""){
                        comment = d["com"];
                      }
                    }
                    setComment(comment);

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
        </Geographies>)}

        

      {latLongdata.map(({ latitude, longitude, country, english, french, englishIsland, smallCountry}) => {
        console.log("english -> " + english);
        var lat = parseInt(latitude);
        var long = parseInt(longitude);
        if(englishIsland== 1){
          lat = lat+1.5;
          long = long+1;
        }

        if (english.length > 0 &&(english > french) && english != 1 && english > 0.04 && smallCountry != 1) {
          return(
            <Marker key={"annot"} coordinates={[long, lat]} country={country}>
              <text
                textAnchor="middle"
                style={{ fontFamily: "system-ui", fill: "yellow", fontSize: 5, pointerEvents: "none", opacity: "1" }}
              >
                {Math.round(english * 100)}%
              </text>
            </Marker>
          )
        }
      })}


      {latLongdata.map(({ latitude, longitude, country, englishIsland, country_code }) => {
        if (englishIsland == 1) {
          return(
            <Marker data-tip="" key={"annot"} coordinates={[longitude, latitude]} country_code={country_code} 
            onMouseEnter={() =>{
              setTooltipContent(country_code);
              setNameTooltipContent(country);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
                setNameTooltipContent("");
                console.log("");
              }}
            >
            <circle r={1.6} fill="#9e0307" stroke="black" strokeWidth={0.3} />
                        
            </Marker>
          )
        }
      })}
      
      {latLongdata.map(({ latitude, longitude, country, frenchIslands, country_code }) => {
        
        if (frenchIslands == 1) {
          return(
            <Marker key={"annot"} coordinates={[longitude, latitude]} country_code={country_code} country={country}
            onMouseEnter={() =>{
              setTooltipContent(country_code);
              setNameTooltipContent(country);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
                setNameTooltipContent("");
                console.log("");
              }}>
                        <circle r={1.6} fill="#3e668a" stroke="black" strokeWidth={0.3} />
            </Marker>
          )
        }
      })}

      {latLongdata.map(({ latitude, longitude, country, french, english, frenchIslands }) => {

        var lat = parseInt(latitude);
        var long = parseInt(longitude);
        if(frenchIslands== 1){
          lat = lat+0.9;
          long = long+0.9;
        }


        if (french != "" && (french > english) && french != 1 && french >= 0.09) {
          return (
            <Marker key={"frenchIlands"+country} coordinates={[(long), (lat)]} country={country}>
              <text
                textAnchor="middle"
                style={{ fontFamily: "system-ui", fill: "black", fontSize: 5, pointerEvents: "none", opacity: "1" }}
              >
                {
                Math.round(french * 100)
                
                }%
              </text>
            </Marker>
          )
        }
      })}


      </ZoomableGroup>
    </ComposableMap>
  );
};

export default memo(World);