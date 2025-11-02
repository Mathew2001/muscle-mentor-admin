import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({ className }) => {
  return (
    <div>
      <Link to='/' className={`btn btn-secondary ${className || ''}`}>
        back to home
      </Link>
    </div>
  )
}

export default BackButton