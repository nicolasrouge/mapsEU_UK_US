import React, { Component } from 'react';
import worldEconomy2019 from './worldEconomy2019.jpg';
import ModalImage from "react-modal-image";
import './language-page.css';


export default class Languages extends Component {	
  render() {
		return (
            <div>

                <ModalImage
                  small="https://cdn.howmuch.net/articles/Draft-9-24f8.jpg"
                  className="image1"
                  large="https://cdn.howmuch.net/articles/Draft-9-24f8.jpg"
                  alt="All the World’s Wealth in One Visual"
                />

            </div>
            
            
		);
	}
}
