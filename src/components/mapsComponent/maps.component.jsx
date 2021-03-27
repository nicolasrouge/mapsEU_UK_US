import { VectorMap } from '@south-paw/react-vector-maps';
import React, { Component } from 'react';
import nzMap from './united-kingdom-counties.json';
//import nzMap from './europe-good.json';
import france from './france-new.json';
import styled from 'styled-components';

//another map: https://www.react-simple-maps.io/examples/europe-map-with-graticule/
//https://codesandbox.io/s/europe-map-with-graticule-t3xj0?from-embed=&file=/src/index.js

//https://react-vector-maps.netlify.app/converter

export default class Graph extends Component {	
  render() {

    const Map = styled.div`
    margin: 1rem auto;
    width: 510px;

  svg {
    stroke: #fff;

    // All layers are just path elements
    path {
      fill: #a82b2b;
      cursor: pointer;
      outline: none;

      // When a layer is hovered
      &:hover {
        fill: rgba(168,43,43,0.83);
      }

      // When a layer is focused.
      &:focus {
        fill: rgba(168,43,43,0.6);
      }

      // When a layer is 'checked' (via checkedLayers prop).
      &[aria-checked='true'] {
        fill: rgba(56,43,168,1);
      }

      // When a layer is 'selected' (via currentLayers prop).
      &[aria-current='true'] {
        fill: rgba(56,43,168,0.83);
      }

      // You can also highlight a specific layer via it's id
      &[id="nz-can"] {
        fill: rgba(56,43,168,0.6);
      }
    }
  }
`;

    
		return (
            <Map>
                <VectorMap {...nzMap} checkedLayers={['nz-auk']} currentLayers={['nz-wgn']} />

            </Map>
            
		);
	}
}
