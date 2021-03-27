import React, { Component } from 'react';
import '../Images/language-page.css';
import US_MapChart from "./US-mapChartComponent";
import ReactTooltip from "react-tooltip";


const changeText = (name) => {
    if(name === null){
        return "";
    }else{
        name = "https://www.states101.com/img/flags/svg/" + name.replace(' ', '-').toLowerCase();
        
        var url = name + '.svg';
        return url;
    }
  }

export default class USPage extends Component {	
    
      constructor(props){
            super(props);
            this.state = {
                data: null
            }
        }

        handleCallback = (childData) =>{
            this.setState({data: childData});
            console.log(this.state.data);

        }

  render() {
      const {data} = this.state;
      var logo = require('./us-flag/texas.svg'); 
      
		return (
            <div>


                <h3> United States of America</h3>
            <ReactTooltip place="top" type="dark" effect="float"> {data + "  "}
                <img style={{width:"35px" }} src={changeText(data)} />
            </ReactTooltip>

            <div style={{width:"70%", margin:"auto"}}>

            <US_MapChart  parentCallback = {this.handleCallback} />


                </div>

            <h2>Maps and Data from Reddit</h2>
            <div class="reddit-embed center" red-author="u/StevenMaurer"
            red-title="Map of the US by a truck driver who has seen most of it..."
            red-href="https://www.reddit.com/r/MapPorn/comments/lkxyg7/map_of_the_us_by_a_truck_driver_who_has_seen_most/about.json" ></div>


            <div class="reddit-embed center" red-author="u/StevenMaurer"
            red-title="Map of the US by a truck driver who has seen most of it..."
            red-href="https://www.reddit.com/r/MapPorn/comments/l9f3w3/urban_megaregions_of_the_united_states_oc/about.json" ></div>

            
            


            </div>
            
            
		);
	}
}
