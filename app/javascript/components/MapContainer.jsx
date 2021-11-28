import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Dealer from './Dealer'
import Map from './Map'

export default ({ dealers }) => {
  const [selectedMarker, setSelectedMarker] = useState(-1)

  return (
    <div>
      <div>
        <Map
          dealers={dealers}
          selectedMarker={selectedMarker}
          onMarkerSelect={id => setSelectedMarker(id)}
        />
      </div>
      <div className="row flex-row flex-nowrap overflow-auto">
        {dealers.map(dealer => (
          <Dealer
            {...dealer}
            onSelect={id => setSelectedMarker(id)}
            key={dealer.id} />
        ))}
      </div>
    </div>
  )
}
