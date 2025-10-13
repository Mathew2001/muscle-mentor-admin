import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { deleteProgram, getAllPrograms } from '../redux/actions/programActions'
import ProgramCard from './ProgramCard'
import { Link } from 'react-router-dom'

const Programs = () => {
  const dispatch = useDispatch()
  const { programs } = useSelector((state) => state.programReducer);
  useEffect(() => {
    dispatch(getAllPrograms());
  },[dispatch])

  return (
    <div>
      {programs && programs.length > 0 ? (
        <ul>
          {programs.map((program) => (
            <li key={program._id}>
              {" "}
              <ProgramCard
                name={program.name}
                durationWeeks={program.durationWeeks}
                description={program.description}
              />{" "}
              <button onClick={()=> dispatch(deleteProgram(program._id))}>delete</button>
              <Link to={`/program/update/${program._id}`}>edit program</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>there is no programs</p>
        </div>
      )}
      <Link to={"/"}>back</Link>
    </div>
  );
}

export default Programs

