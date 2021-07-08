import React, { useState, useEffect } from "react";
import Europe from "./WorldLanguages/World";
import ReactTooltip from "react-tooltip";
import axios from 'axios';

const changeText = (name) => {
    var url = "";
    if (name === null) {
        return "";
    } else {
        if (name != "") {
            url = "https://www.countryflags.io/" + name.toLowerCase() + "/flat/64.png";
        } else {
            url = ""
        }
        return url;
    }
}

//https://restcountries.eu/rest/v2/alpha/co

function Worldmap() {
    const [content, setContent] = useState("test");
    const [nameContent, setNameTooltipContent] = useState("");
    const [comment, setComment] = useState("");
    const [data, setData] = useState("");
    const [capital, setCapital] = useState("");

    useEffect(async () => {
        if (content != "") {
            console.log({ content });
            const result = await axios(
                'https://restcountries.eu/rest/v2/alpha/' + content.toLowerCase(),
            );
            console.log(result.data);
            if (result.data.languages[1] != undefined) {
                setData(result.data.languages[0].name + " and " + result.data.languages[1].name);
                setCapital(result.data.capital);

            }
            else {
                setData(result.data.languages[0].name);
                setCapital(result.data.capital);
            }
        } else {
            console.log("out");
        }
    });


        var tooltipContent = <div><img style={{ width: '30px' }} src={changeText(content)}></img> -
        <text style={{ fontWeight: "bold" }}>{nameContent} - {capital}</text>
        <p style={{ maxWidth: "300px", textAlign: "left" }}>{data}</p>
        <p style={{ maxWidth: "300px", textAlign: "left" }}>{comment}</p></div> ;

      if(content == "") {
        tooltipContent = "";
      }

    return (
        <div>
            <h1 style={{position: "absolute", top: "0.5em"}}>English and French speakers (native or not) </h1>
            <Europe
                setTooltipContent={setContent}
                setNameTooltipContent={setNameTooltipContent}
                setComment={setComment}
            />

            <ReactTooltip >
                {tooltipContent}
            </ReactTooltip>

        </div>
    );
}

export default Worldmap;