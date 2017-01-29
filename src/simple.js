import React, { Component } from 'react'
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, Leaflet } from 'react-leaflet';

import dateFormat from "dateformat"

const simpleApi = { url: "http://localhost:8080" }
if (process.env.NODE_ENV === "production") {
  simpleApi.url = "http://lolcat.passoire.net:8080"
}

class SimpleMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cats: [],
      position: this.props.position,
      zoom: 21
    }


    this.onMoveend = (e) => {
      const {lat, lng} = e.target.getCenter()

      fetch(`${simpleApi.url}/cats?lat=${lat}&lng=${lng}&distance=100`)
        .then((response) => response.json())
        .then((json) => this.setState({ cats: json }))
        .catch((error) => console.log(error))
    }
  }

  componentDidMount() {

    this.myIcon = L.icon({
      iconUrl: "cat.svg",
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    });

    const lat = this.state.position[0]
    const lng = this.state.position[1]

    fetch(`${simpleApi.url}/cats?lat=${lat}&lng=${lng}&distance=10`)
      .then((response) => response.json())
      .then((json) => this.setState({ cats: json }))
      .catch((error) => console.log(error))
  }




  render() {
    const position = this.state.position
    return (
      <Map center={position} zoom={this.state.zoom} onMoveend={this.onMoveend}>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        {
          this.state.cats.map(cat =>
            <Marker key={cat.id} position={cat.position} icon={this.myIcon}>
              <Popup>
                <span>{cat.id} le {dateFormat(new Date(cat.timestamp), "isoDateTime")}</span>
              </Popup>
            </Marker>
          )
        }
      </Map>
    )
  }
}


export default SimpleMap;
