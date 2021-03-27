import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends Component {	
  render() {
		const options = {
            theme: "dark2",
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "sovereign states in Europe by GDP (PPP) per capita - 2020"
            },
            subtitles: [{
                text: "In USD",
                fontSize: 16
            }],
            axisY: {
                prefix: "$",
                /*scaleBreaks: {
                    customBreaks: [{
                        startValue: 10000,
                        endValue: 35000
                    }]
                }*/
            },
            data: [{
                type: "column",
                yValueFormatString: "$#,##0.00",
                dataPoints: [
                    { label: "Luxembourg", y: 112875 },
                    { label: "Ireland", y: 89383 },
                    { label: "Switzerland", y: 68340 },
                    { label: "Norway", y: 64856 },
                    { label: "Denmark", y: 57781 },
                    { label: "Netherland", y: 57101 },
                    { label: "Austria", y: 55406 },
                    { label: "Iceland", y: 54482 }	
                ]
            }]
    }
    
		return (
		<div style={{width:"40%", float:"right"}}>
			<CanvasJSChart options = {options} 
			/>
		</div>
		);
	}
}
