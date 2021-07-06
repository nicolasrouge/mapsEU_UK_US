import React, { useState, useEffect } from "react";
import Europe from "./WorldLanguages/World";
import ReactTooltip from "react-tooltip";
import axios from 'axios';

const changeText = (name) => {
    var url = "";
    if (name === null) {
        return "";
    } else {
        if(name != ""){
            url = "https://www.countryflags.io/" + name.toLowerCase() + "/flat/64.png";
        }else{
            url =""
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
    const [hide, setHide] = useState(false);

    useEffect(async () => {
        if (content != "") {
            console.log({content});
            const result = await axios(
                'https://restcountries.eu/rest/v2/alpha/' + content.toLowerCase(),
            );
            console.log(result.data);
            if (result.data.languages[1] != undefined) {
                setData(result.data.languages[0].name + " and " + result.data.languages[1].name);
                setCapital(result.data.capital);
                setHide(false);
            }
            else {
                setData(result.data.languages[0].name);
                setCapital(result.data.capital);
                setHide(false);
            }
        } else {
            console.log("out");
            setHide(true);
        }
    });

    return (
        <div>
            <Europe setTooltipContent={setContent} setNameTooltipContent={setNameTooltipContent} setComment={setComment} />

            {!hide && 
                <ReactTooltip >
                    <img style={{ width: '30px' }} src={changeText(content)}></img> - <text style={{fontWeight: "bold"}}>{nameContent} - {capital}</text>
                    <p style={{maxWidth: "300px", textAlign: "left" }}>Official language: {data}</p>
                    <p style={{maxWidth: "300px", textAlign: "left" }}>
                    {comment}
                    </p>
                    
                </ReactTooltip>
            }



        </div>
    );
}
export default Worldmap;