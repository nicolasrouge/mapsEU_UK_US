import React, { Component } from 'react';
import Europe2 from "./Europe2";
import ReactTooltip from "react-tooltip";
import Tooltip from "react-simple-tooltip"



    export default class europeRegions extends Component {	
    constructor(props){
        super(props);
        this.state = {
            data: "test"
        }
    }

    handleCallback = (childData) =>{
        this.setState({data: childData});
        console.log(this.state.data);

    }
    render() {
        const {data} = this.state;

        return (
            <div>

                <Europe2 parentCallback = {this.handleCallback} />
                
            </div>

        );
    }
};

