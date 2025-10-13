import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import workoutReducer from "../redux/reducers/workoutReducer";
import { deleteWorkout, getAllWorkouts } from "../redux/actions/workoutActions";
import WorkoutCard from "./WorkoutCard";
import { Link } from "react-router-dom";
const Workouts = () => {
  const dispatch = useDispatch();
  const { workouts } = useSelector((state) => state.workoutReducer);
  useEffect(() => {
    dispatch(getAllWorkouts());
  }, [dispatch]);

  return (
    <div>
      {workouts && workouts.length > 0 ? (
        <div>
          {workouts.map((workout) => (
            <div key={workout._id}>
              <WorkoutCard
                title={workout.title}
                duration={workout.duration}
                level={workout.level}
                description={workout.description}
                muscleGroup={workout.muscleGroup}
              />
              <button onClick={() => dispatch(deleteWorkout(workout._id))}>
                delete
              </button>
              <Link to={`/workout/update/${workout._id}`} style={{ margin: 2 }}>
                edit workout
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>there is no workouts</p>
        </div>
      )}
      <Link to={"/"}>back</Link>
    </div>
  );
};

export default Workouts;
