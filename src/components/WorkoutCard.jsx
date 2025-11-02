import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../redux/actions/workoutActions";
import { Link } from "react-router-dom";

const WorkoutCard = ({ title, duration, level, description, muscleGroup, id }) => {
  const dispatch = useDispatch();

  return (
    <div className="col">
      <div className="card h-100" >
        <div className="card-header">
          <h1>{title}</h1>
        </div>
        <div className="card-body">
          <p>duration : {duration}</p>
          <p>level : {level}</p>
          <p>description : {description}</p>
          {muscleGroup && muscleGroup.length > 0 ? (
            <>
              <p>muscle groups : {muscleGroup.join(", ")}</p>
            </>
          ) : (
            <p>there is no muscles</p>
          )}
        </div>
        <div className="card-footer d-flex justify-content-start gap-2">
          <button onClick={() => dispatch(deleteWorkout(id))} className="btn btn-danger">delete</button>
          <Link to={`/workout/update/${id}`} className="btn btn-primary">edit workout</Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
