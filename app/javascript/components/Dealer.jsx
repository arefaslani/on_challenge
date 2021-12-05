import React, { forwardRef } from "react"
import PropTypes from "prop-types"

import "./Dealer.scss"

export default forwardRef(({ dealer, onSelect, active }, ref) => {
  const {
    name,
    phone,
    street,
    zipcode,
    city,
    country,
  } = dealer

  return (
    <div
      className={`Dealer ${active ? "active" : ""}`}
      onClick={() => {
        onSelect(dealer)
      }}
      ref={ref}
    >
      <h4>{name}</h4>
      <p>{zipcode} {street}</p>
      <p>{city}, {country} - {phone} </p>
    </div>
  )
})
