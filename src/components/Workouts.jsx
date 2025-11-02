import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import workoutReducer from "../redux/reducers/workoutReducer";
import { getAllWorkouts } from "../redux/actions/workoutActions";
import WorkoutCard from "./WorkoutCard";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";
const Workouts = () => {
  const dispatch = useDispatch();
  const { workouts } = useSelector((state) => state.workoutReducer);
  useEffect(() => {
    dispatch(getAllWorkouts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="text-center mb-3">Workouts</h1>
      <div className="d-flex justify-content-between align-items-center">
        <BackButton />
        <Link to={"/workout/add"} className="btn btn-primary">add workout</Link>
      </div>
      <div className="row g-4 mt-1">
        {workouts && workouts.length > 0 ? (
          <div className="row g-4 mt-1">
            {workouts.map((workout) => (
              <div key={workout._id}>
                <WorkoutCard
                  title={workout.title}
                  duration={workout.duration}
                  level={workout.level}
                  description={workout.description}
                  muscleGroup={workout.muscleGroup}
                  id={workout._id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>there is no workouts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
