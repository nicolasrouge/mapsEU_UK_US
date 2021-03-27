import React from 'react';
import './card.styles.css';

export const Card = props => (
    <div className="card-container">
        <img className="image-size" alt="country" src={props.flag}></img>
        <h2>{props.country }</h2>
        <p>{props.capital }</p>
        
    </div>
)