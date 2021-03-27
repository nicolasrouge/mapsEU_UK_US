import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends Component {	
  render() {
		const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: false,
				title:{
					text: "Nominal GDP in billion USD per Year"
				},
				axisY : {
					title: "billion USD"
				},
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "Germany",
					showInLegend: true,
					dataPoints: [
						{ y: 3423.466, label: "2010" },
						{ y: 3761.14, label: "2011" },
						{ y: 3545.95, label: "2012" },
						{ y: 3753.69, label: "2013" },
						{ y: 3904.92, label: "2014" },
						{ y: 3383.09, label: "2015" },
						{ y: 3496.61, label: "2016" },
						{ y: 3664.51, label: "2017" },
						{ y: 3951.34, label: "2018" },
						{ y: 3863.34, label: "2019" },
            { y: 3780.55, label: "2020" }
          ]
        },
        {
					type: "spline",
					name: "United Kingdom",
					showInLegend: true,
					dataPoints: [
						{ y: 2455.309, label: "2010" },
						{ y: 2635.799, label: "2011" },
						{ y: 2677.082, label: "2012" },
						{ y: 2755.356, label: "2013" },
						{ y: 3036.310, label: "2014" },
						{ y: 2897.060, label: "2015" },
						{ y: 2669.107, label: "2016" },
						{ y: 2640.067, label: "2017" },
						{ y: 2828.833, label: "2018" },
						{ y: 2743.586, label: "2019" },
            { y: 2638.296, label: "2020" }
          ]
				},
				{
					type: "spline",
					name: "France",
					showInLegend: true,
					dataPoints: [
						{ y: 2647.54, label: "2010" },
						{ y: 2864.03, label: "2011" },
						{ y: 2685.31, label: "2012" },
						{ y: 2811.96, label: "2013" },
						{ y: 2856.70, label: "2014" },
						{ y: 2439.44, label: "2015" },
						{ y: 2466.15, label: "2016" },
						{ y: 2591.78, label: "2017" },
						{ y: 2780.15, label: "2018" },
						{ y: 2707.07, label: "2019" },
            { y: 2551.45, label: "2020" }
					]
				}]
    }

		return (
		<div style={{width:"40%"}}>
			<CanvasJSChart options = {options} 
			/>
		</div>
		);
	}
}
