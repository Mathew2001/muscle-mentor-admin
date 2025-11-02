import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  updateWorkout,
  getWorkoutById
} from "../redux/actions/workoutActions";
import { Link, useParams } from "react-router-dom";
import { getAllPrograms } from "../redux/actions/programActions";
import BackButton from "./BackButton";


const Workout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [programId, setProgramId] = useState("");
  const { workout } = useSelector((state) => state.workoutReducer);
  const { programs } = useSelector((state) => state.programReducer);

  useEffect(() => {
    dispatch(getAllPrograms());
  }, [dispatch])

  useEffect(() => {
    if (id)
      dispatch(getWorkoutById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (workout) {
      setTitle(workout.title);
      setDuration(workout.duration);
      setLevel(workout.level);
      setDescription(workout.description);
      setMuscleGroup(workout.muscleGroup);
      setProgramId(workout.programId);
    }
  }, [workout])

  const handleProgramChange = (e) => {
    setProgramId(e.target.value);
  };

  const handleMuscleGroupChange = (e) => {
    const value = e.target.value;
    setMuscleGroup(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(
        updateWorkout(id, { title, duration, level, description, muscleGroup, programId })
      );
    } else {
      dispatch(createWorkout(title, duration, level, description, muscleGroup, programId));
    }
    setTitle("");
    setDuration(0);
    setLevel("");
    setDescription("");
    setMuscleGroup([]);
    setProgramId("");
  };

  return (
    <div className="container">
      <h1 className="text-center mb-3">Add Workout</h1>
      <div className="row justify-content-center">
        <div className="col-md-10 col-xl-8">
          <div className="d-flex justify-content-between align-items-center">
            <BackButton />
            <Link to={"/workout/allWorkouts"} className="btn btn-primary">all workouts</Link>
          </div>
          <form onSubmit={handleSubmit} className="border p-3 rounded mt-2">
            <div className="mb-3">
              <label>Title:</label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Duration (minutes):</label>
              <input
                className="form-control"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Level:</label>
              <select
                className="form-control"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Muscle Groups:</label>
              <div className="form-check d-flex flex-column gap-2">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="chest"
                    checked={muscleGroup.includes('chest')}
                    onChange={handleMuscleGroupChange}
                  />
                  Chest
                </label>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="back"
                    checked={muscleGroup.includes('back')}
                    onChange={handleMuscleGroupChange}
                  />
                  Back
                </label>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="legs"
                    checked={muscleGroup.includes('legs')}
                    onChange={handleMuscleGroupChange}
                  />
                  Legs
                </label>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="shoulders"
                    checked={muscleGroup.includes('shoulders')}
                    onChange={handleMuscleGroupChange}
                  />
                  Shoulders
                </label>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="arms"
                    checked={muscleGroup.includes('arms')}
                    onChange={handleMuscleGroupChange}
                  />
                  Arms
                </label>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="core"
                    checked={muscleGroup.includes('core')}
                    onChange={handleMuscleGroupChange}
                  />
                  Core
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label>Program:</label>
              <select
                className="form-control"
                value={programId}
                onChange={handleProgramChange}
                required
              >
                <option value="">Select Program</option>
                {programs && programs.map(program => (
                  <option key={program._id} value={program._id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Workout;
