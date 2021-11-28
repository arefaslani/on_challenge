import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ dealers, onMarkerSelect, selectedMarker }) => {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      {dealers.map(({ id, latitude, longitude }) => (
        <Marker coordinates={[latitude, longitude]} key={id} onClick={() => onMarkerSelect(id)}>
          <circle r={8} fill={selectedMarker == id ? "#cc381a" : "#28a708"} />
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
