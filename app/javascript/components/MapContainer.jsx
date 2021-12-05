import React, { useState, createRef, useEffect } from "react"
import PropTypes from "prop-types"

import Dealer from "./Dealer"
import Map from "./Map"

import "./MapContainer.scss"

export default ({ dealers }) => {
  const [selectedDealer, setSelectedDealer] = useState(null)

  const refs = dealers.reduce((acc, dealer) => {
    acc[dealer.id] = createRef();
    return acc;
  }, {})

  const onDealerSelect = dealer => {
    if (!refs[dealer.id].current) return

    refs[dealer.id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    setSelectedDealer(dealer)
  }

  return (
    <div className="MapContainer">
      <div className="MapContainer-list">
        <h4 className="header">Dealers</h4>
        {dealers.map(dealer => {
          return (
            <Dealer
              ref={refs[dealer.id]}
              dealer={dealer}
              onSelect={dealer => setSelectedDealer(dealer)}
              active={selectedDealer && selectedDealer.id == dealer.id}
              key={dealer.id}
            />
          )
        })}
      </div>
      <div className="MapContainer-map">
        <Map
          dealers={dealers}
          selectedDealer={selectedDealer}
          onDealerSelect={dealer => onDealerSelect(dealer)}
        />
      </div>
    </div>
  )
}
