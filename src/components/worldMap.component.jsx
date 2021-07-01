import React, { useState, useEffect } from "react";
import Europe from "./Europe/Europe";
import ReactTooltip from "react-tooltip";
import axios from 'axios';

const changeText = (name) => {
    var url ="";
    if(name === null){
        return "";
    }else{
        url = "https://www.countryflags.io/"+ name.toLowerCase() +"/flat/64.png";
        return url;
    }
  }

  //https://restcountries.eu/rest/v2/alpha/co

function Worldmap () {
    const [content, setContent] = useState("test");
    const [nameContent, setNameTooltipContent] = useState("");
    const [data, setData] = useState("");

    useEffect(async () => {
        const result = await axios(
          'https://restcountries.eu/rest/v2/alpha/' + content.toLowerCase(),
        );
        console.log(result.data);
        if(result.data.languages[1] != undefined){
            setData(result.data.languages[0].name + " and " + result.data.languages[1].name);
        }
        else
        {        
            setData(result.data.languages[0].name );
        }
      });
     
    return (
        <div>
            <Europe setTooltipContent={setContent} setNameTooltipContent={setNameTooltipContent} />
            <ReactTooltip >
            <img style={{width:'30px'}} src={changeText(content)}></img> - {nameContent}
                <br></br>
                {data}
                
            </ReactTooltip>
        </div>
    );
}
export default Worldmap;