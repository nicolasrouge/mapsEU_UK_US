import React from 'react';
import './card-list.styles.css';
import {Card} from '../card/card.component';


export const CardList = props => (
    <div className="card-list">
        {props.countries.map(country => (
            <Card 
                key={country.alpha2Code}
                country={country.name}
                flag={country.flag }
                capital={country.capital} />
                
        ))}
    </div>
)