import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './index.css'
import SimpleMap from './simple'

function maPosition(position) {
  console.log(position)

  const map = (
    //<SimpleMap position={[position.coords.latitude, position.coords.longitude] } />
    <SimpleMap position={[48.115163, -1.673232]} />
  );

  render(map, document.getElementById('root'));
}

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);

