import { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import $ from 'jquery';
import ReactTooltip from "react-tooltip";
import Tooltip from "react-simple-tooltip";


let data = require("./europe.topo.json");

var width = 1000;

const nuts = data;

/*const changeCountry = (props) => {
  console.log(props);
}*/


class Europe extends Component {

  constructor(props) {
    super(props);// super gives us access to "this.state"
    this.state ={
      selectedRegion: '-'
    };
  }
  /*sendData = () => {
    this.parentCallback(this.state.selectedRegion);
  }*/

  onTrigger = () => {
    
}

  //props.parentCallback(geo.properties.name);
  /*sendData = () => {
    this.props.parentCallback("Hey Popsie, How’s it going?");
},*/

  /*changeCountry = (props) => {
    console.log(props);
    this.setState(props => {
      return { selectedRegion: 'COOL' };
    });
  }
*/

  componentDidMount() {

    //build tooltip element
	var tooltip = document.getElementById("tooltip");

	d3.select("#tooltip").style("font-family", "Myriad Pro, Myriad, MyriadPro-Regular, 'Myriad Pro Regular', MyriadPro, 'Myriad Pro', 'Liberation Sans', 'Nimbus Sans L', 'Helvetica Neue', vegur, Vegur, Helvetica, Arial, sans-serif");
	

    console.log("componentDidMount");

      console.log("nuts");
      //loadingDiv.hide();
      $("#but").show();
      //prepare SVG element
      var height = width*(nuts.bbox[3]-nuts.bbox[1])/(nuts.bbox[2]-nuts.bbox[0]),
        svg = d3.select("#map").attr("width", width).attr("height", height),
        path = d3.geoPath().projection(d3.geoIdentity().reflectY(true).fitSize([width,height], topojson.feature(nuts, nuts.objects.gra)))
      ;
      //clear SVG element
      svg.selectAll("*").remove()

      var pattS=3, patt = svg.append("pattern").attr("id","patt_cntrg").attr("x","0").attr("y","0").attr("width",pattS).attr("height",pattS).attr("patternUnits","userSpaceOnUse");
			patt.append("rect").attr("x","0").attr("y","0").attr("width",pattS).attr("height",pattS).style("stroke","none").style("fill","white")
			patt.append("circle").attr("cx",pattS/2).attr("cy",pattS/2).attr("r",pattS/2*0.3).style("stroke","none").style("fill","gray");

      var pattS=3, patt = svg.append("pattern").attr("id","patt_nutsrg").attr("x","0").attr("y","0").attr("width",pattS).attr("height",pattS).attr("patternUnits","userSpaceOnUse");
			patt.append("rect").attr("x","0").attr("y","0").attr("width",pattS).attr("height",pattS).style("stroke","none").style("fill","#fdbf6f")
			patt.append("circle").attr("cx",pattS/2).attr("cy",pattS/2).attr("r",pattS/2*0.3).style("stroke","none").style("fill","white");

      var pattS=7, patt = svg.append("pattern").attr("id","patt_sea").attr("x","0").attr("y","0").attr("width",pattS).attr("height",pattS).attr("patternUnits","userSpaceOnUse");
			patt.append("rect").attr("x",0).attr("y",0).attr("width",pattS).attr("height",pattS).style("stroke","none").style("fill","#b3cde3")
			patt.append("circle").attr("cx",pattS/2).attr("cy",0).attr("r",pattS/2).style("fill","#b3cde3").style("stroke","white").style("stroke-width",0.7);
		

		//define filter for coastal margin
		svg.append("filter").attr("id","blur").attr("x","-200%").attr("y","-200%").attr("width","400%").attr("height","400%")
			.append("feGaussianBlur").attr("in","SourceGraphic").attr("stdDeviation","4")
		;

      //prepare drawing group
      var g = svg.append("g").attr("transform","translate(0,0)");
		

      //draw background rectangle
		g.append("rect").attr("id","bck").attr("x",0).attr("y",0).attr("width", width).attr("height", height)
		//.style("fill","#b3cde3");
		.style("fill","url(#patt_sea)");
		
		//draw coastal margin
		g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.cntbn).features).enter()
			.append("path").attr("d", path)
			.style("fill","none").style("stroke-width","8px").style("filter","url(#blur)").style("stroke-linejoin","round").style("stroke-linecap","round")
			.style("stroke",function(bn){ if(bn.properties.co==="T") return "white"; return "none"; })
		;
		g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.nutsbn).features).enter()
			.append("path").attr("d", path)
			.style("fill","none").style("stroke-width","8px").style("filter","url(#blur)").style("stroke-linejoin","round").style("stroke-linecap","round")
			.style("stroke",function(bn){ if(bn.properties.co==="T") return "white"; return "none"; })
		;
		//draw graticule
		g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.gra).features).enter()
			.append("path").attr("d", path)
			.style("fill","none").style("stroke-width","1px").style("stroke","gray");
		//draw country regions
		g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.cntrg).features).enter()
			.append("path").attr("d", path)
			//.on("mouseover", function(rg) { d3.select(this).style("fill", "#ddd"); tooltip.mouseover("<b>"+rg.properties.na+"</b><br>"+rg.properties.id); })
			//.on("mousemove", function() { tooltip.mousemove(); })
			//.on("mouseout", function() { d3.select(this).style("fill","url(#patt_cntrg)"); tooltip.mouseout(); })
			.style("fill","#f2f2f2")
			.style("fill","url(#patt_cntrg)")
			//.style("filter","url(#dispfil)")
		;
    //draw nuts regions
		g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.nutsrg).features).enter()
    .append("path").attr("d", path)

    .on("mouseover", function(rg) { 
      d3.select(rg.target).style("fill", "#ff7f00"); 
      console.log(rg.target);
      console.log(rg.target.__data__.properties.na);
      //const id = rg.originalTarget.__data__.properties.na;


      //this.changeCountry(id);
      this.setState({
        selectedRegion: rg.target.__data__.properties.na,
      });

    }.bind(this))

    
    /*.on("mousemove", function(rg) { 
      if(rg.originalTarget != undefined){
        this.setState({
          selectedRegion: rg.originalTarget.properties.na,
        });
      }
      console.log(rg);
    
    }.bind(this))*/

    .on("mousemove", function(event) { 
      //d3.select(this).style("fill", "#ff7f00"); 
      $( ".tooltip" ).css({
        "left" : event.pageX-850,
        "top" : event.pageY-60,

      });
    
    })

    .on("click", function(rg) { 
      this.setState({
        selectedRegion: "wesh pk tu click?",
      });

    }.bind(this))

    .on("mouseout", function() { 
      d3.select(this).style("fill","url(#patt_nutsrg)"); 
    })

    .style("fill","#fdbf6f")
    .style("fill","url(#patt_nutsrg)")
    //.style("filter","url(#dispfil)")
  ;

      //draw country regions
      g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.cntrg).features).enter()
        .append("path").attr("d", path)
        .style("fill","url(#patt_cntrg)")
        //.style("filter","url(#dispfil)")
      ;

      //draw country boundaries
      g.append("g").selectAll("path").data(topojson.feature(nuts, nuts.objects.cntbn).features).enter()
        .append("path").attr("d", path)
        .style("fill","none")
        .style("stroke",function(bn){ if(bn.properties.co==="T") return "#1f78b4"; return "gray"; })
        .style("stroke-width","1.2px")
        .style("stroke-linejoin","round").style("stroke-linecap","round")
      ;
      //draw nuts boundaries
      var bn = topojson.feature(nuts, nuts.objects.nutsbn).features;
      bn.sort(function(bn1,bn2){ return bn2.properties.lvl - bn1.properties.lvl; });
      g.append("g").selectAll("path").data(bn).enter()
        .append("path").attr("d", path)
        .style("fill","none")
        .style("stroke",function(bn){
          if(bn.properties.co==="T") return "#1f78b4";
          if(bn.properties.oth==="T") return "#666";
          if(bn.properties.lvl==0) return "#444";
          return "#666";
        })
        .style("stroke-width",function(bn){
          if(bn.properties.co==="T") return "1px";
          if(bn.properties.lvl==0) return "1.5px";
          if(bn.properties.lvl==1) return "1.1px";
          if(bn.properties.lvl==2) return "1.1px";
          if(bn.properties.lvl==3) return "0.6px";
          return "1.1px";
        })
        .style("stroke-linejoin","round").style("stroke-linecap","round")
      
    
  }
/*<ReactTooltip place="top" type="dark" effect="float">
                {this.state.selectedRegion}
            </ReactTooltip>*/ 


            /*https://codesandbox.io/s/xwijz?file=/src/index.js*/
  render() {
    return (
      <div className='App'>

      <h3>Europe</h3>

      <div className="tooltip" style={{display: "inline-block", position: "relative", padding: ".2em 1em", backgroundColor: "black", color:"white", opacity:"0.8"}}>
      {this.state.selectedRegion}
        </div>

           
      <div ><svg id="map"></svg></div>

      </div>
    );
  }

}

export default Europe;