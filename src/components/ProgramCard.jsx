import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProgram } from '../redux/actions/programActions'
import { getAllWorkouts } from '../redux/actions/workoutActions'
import { Link } from 'react-router-dom'
import SwiperItems from './SwiperItems'
import WorkoutCard from './WorkoutCard'

const ProgramCard = ({ name, durationWeeks, description, id }) => {
  const dispatch = useDispatch()
  const {workouts } = useSelector((state) => state.workoutReducer);
  useEffect(() => {
    dispatch(getAllWorkouts());
  }, [dispatch]);

  const workoutsByProgramId = workouts.filter((workout) => workout.programId === id);
  return (
    <div className="col">
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h1>{name}</h1>
          <div className="d-flex justify-content-start gap-2">
            <button onClick={() => dispatch(deleteProgram(id))} className="btn btn-danger">delete</button>
            <Link to={`/program/update/${id}`} className="btn btn-primary">edit program</Link>
          </div>
        </div>
        <div className="card-body">
          <p>durationWeeks : {durationWeeks}</p>
          <p>description : {description}</p>
        </div>
        <div className="card-body container">
          <SwiperItems items={workoutsByProgramId} renderItems={(workout) => <WorkoutCard key={workout._id} title={workout.title} duration={workout.duration} level={workout.level} description={workout.description} muscleGroup={workout.muscleGroup} id={workout._id} />} />
        </div>
        
      </div>
    </div>
  )
}

export default ProgramCard
