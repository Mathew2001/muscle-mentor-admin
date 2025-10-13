import React from 'react'
import { useDispatch } from 'react-redux'

const ProgramCard = ({name,durationWeeks,description}) => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>{name}</h1>
      <p>durationWeeks : {durationWeeks}</p>
      <p>description : {description}</p>
    </div>
  )
}

export default ProgramCard
