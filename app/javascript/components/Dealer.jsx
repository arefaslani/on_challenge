import React from 'react'
import PropTypes from 'prop-types'

export default ({
  id,
  name,
  phone,
  street,
  zipcode,
  city,
  country,
  latitude,
  longitude,
  onSelect
}) => (
  <div className="card mb-1 col-xs-12 col-sm-6 col-md-4 col-xs-3">
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
      <div className="card-text">
        <p className="m-0">{street}</p>
        <p className="m-0">{zipcode} {city}</p>
        <p className="m-0">{country}</p>
      </div>
      <a href="#"
        className="card-link"
        onClick={e => {
          e.preventDefault()
          onSelect(id)
        }}
      >
        Mark on map
      </a>
    </div>
  </div>
)
