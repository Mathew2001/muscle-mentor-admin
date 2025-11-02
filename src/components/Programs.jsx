import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProgram, getAllPrograms } from '../redux/actions/programActions'
import ProgramCard from './ProgramCard'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'

const Programs = () => {
  const dispatch = useDispatch()
  const { programs } = useSelector((state) => state.programReducer);
  useEffect(() => {
    dispatch(getAllPrograms());
  }, [dispatch])

  return (
    <div className="container ">
      <h1 className="text-center mb-3">Programs</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <BackButton />
        <Link to={"/program/add"} className="btn btn-primary">add program</Link>
      </div>
      <div className="row g-4 mt-1 ">
        {programs && programs.length > 0 ? (
          programs.map((program) => (
            <div key={program._id}>
              <ProgramCard
                name={program.name}
                durationWeeks={program.durationWeeks}
                description={program.description}
                id={program._id}
              />
            </div>
          ))) : (
          <div>
            <p>there is no programs</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Programs

