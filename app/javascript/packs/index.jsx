import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MapContainer from '../components/MapContainer'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('map-data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <MapContainer dealers={data} />,
    document.getElementById('app-place-holder')
  )
})
