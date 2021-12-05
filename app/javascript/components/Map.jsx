import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"
import "./Map.scss"

mapboxgl.accessToken = "pk.eyJ1IjoiYXJlZmFzbGFuaSIsImEiOiJja3duc2dmMHcyb3ZzMm5xdnZxNW1mMjdlIn0.S7PZcoQDidxV8mA3EU8LQw"

const normalizeCoordination = (coordination) => {
  coordination = parseFloat(coordination)
  if (coordination < -90) {
    coordination = -90
  }
  else if (coordination > 90) {
    coordination = 90
  }

  return coordination
}

const renderData = (dealers) => ({
  type: "FeatureCollection",
  features: dealers.map(dealer => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          normalizeCoordination(dealer.latitude),
          normalizeCoordination(dealer.longitude)
        ]
      },
      properties: dealer
    }
  })
})

export default ({ dealers, onDealerSelect, selectedDealer }) => {
  const flyToStore = (currentFeature) =>
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 10
    })

  const mapContainer = useRef(null)
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [0, 0],
      zoom: 0
    })

    map.current.on("load", () => {
      /* Add the data to your map as a layer */
      map.current.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: renderData(dealers)
        }
      })

      map.current.resize();
    })
  })

  useEffect(() => {
    map.current.on("click", (event) => {
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ["locations"]
      });

      /* If it does not exist, return */
      if (!features.length) return;

      const clickedPoint = features[0];

      flyToStore(clickedPoint);
      onDealerSelect(clickedPoint.properties)
    })
  })

  if (selectedDealer) {
    map.current.flyTo({
      center: [
        normalizeCoordination(selectedDealer.latitude),
        normalizeCoordination(selectedDealer.longitude)
      ],
      zoom: 10
    })
  }

  return (
    <div ref={mapContainer} className="Mapbox" />
  )
}
