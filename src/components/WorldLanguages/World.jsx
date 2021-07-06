import React, { memo, useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
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
import frenchSpeakers from './frenchSpeakers.csv';
//frenchIslands
import latlongCountries from './world_country_and_usa_states_latitude_and_longitude_values.csv';
import { longStackSupport } from "q";
import { ZoomableGroup } from "react-simple-maps"
import { LinearGradient, RadialGradient } from '@vx/gradient';

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
const colorScale = scaleLinear()
  .domain([0, 0.68])
  .range(["#ffedea", "#002b80"]);

const colorScale2 = scaleLinear()
  .domain([0, 0.68])
  .range(["#ffedea", "red"]);

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
    <ComposableMap data-tip="" projection="geoEqualEarth" width="900">
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
      <LinearGradient id="gradient" from="red" to="#002b80" x1="60.7%" y1="0%" x2="61%" y2="0%"/>;

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

      <Sphere stroke="#DDD" strokeWidth={0.3} />
      <Graticule stroke="#DDD" strokeWidth={0.2} />
      {data.length > 0 && (
        <Geographies geography={geoUrl} stroke="#000" strokeWidth={0.4}>
          {({ geographies }) =>
            geographies.map(geo => {
              var color = "white";

              /*const isEng =
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
              }*/
              
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

        

      {latLongdata.map(({ latitude, longitude, country, english, french }) => {
        console.log("english -> " + english);
        if (english.length > 0 &&(english > french)) {
          return(
            <Marker key={"annot"} coordinates={[longitude, latitude]} country={country}>

              <text
                textAnchor="middle"
                style={{ fontFamily: "system-ui", fill: "yellow", fontSize: 6, pointerEvents: "none", opacity: "0.8" }}
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
              setNameTooltipContent(country_code);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
                setNameTooltipContent("");
                console.log("");
              }}
            >
            <circle r={2} fill="red" stroke="black" strokeWidth={0.3} />
                        
            </Marker>
          )
        }
      })}

      
      {latLongdata.map(({ latitude, longitude, country, frenchIslands, country_code }) => {
        if (frenchIslands == 1) {
          return(
            <Marker key={"annot"} coordinates={[longitude, latitude]} country_code={country_code} 
            onMouseEnter={() =>{
              setTooltipContent(country_code);
              setNameTooltipContent(country_code);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
                setNameTooltipContent("");
                console.log("");
              }}>
                        <circle r={2} fill="blue" stroke="black" strokeWidth={0.3} />
            </Marker>
          )
        }
      })}

      {latLongdata.map(({ latitude, longitude, country, french, english }) => {
        if (french != "" && (french > english)) {
          return (
            <Marker key={"annot"} coordinates={[(longitude+100), (latitude-0.1)]} country={country}>
              <text
                textAnchor="middle"
                style={{ fontFamily: "system-ui", fill: "black", fontSize: 6, pointerEvents: "none", opacity: "0.8" }}
              >
                {
                Math.round(french * 100)
                
                }%
              </text>
            </Marker>
          )
        }
      })}

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
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default memo(World);


      /*
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

      const e = latLongdata.find((s) => s.country_code === geo.properties.ISO_A2);
              console.log("e", e);
      
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
      ))}*/