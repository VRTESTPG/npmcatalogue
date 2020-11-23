import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = () => {
  return (
    <div style={{color:'#b91131'}}>
      <Spinner animation="border" variant="danger" size="md" />
    </div>
  )
}

export default Loader
