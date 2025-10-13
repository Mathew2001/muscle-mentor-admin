import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  updateWorkout,
  getWorkoutById
} from "../redux/actions/workoutActions";
import { Link, useParams } from "react-router-dom";
import { getAllPrograms } from "../redux/actions/programActions";


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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Level:</label>
          <select
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

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Muscle Groups:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="chest"
                checked={muscleGroup.includes('chest')}
                onChange={handleMuscleGroupChange}
              />
              Chest
            </label>
            <label>
              <input
                type="checkbox"
                value="back"
                checked={muscleGroup.includes('back')}
                onChange={handleMuscleGroupChange}
              />
              Back
            </label>
            <label>
              <input
                type="checkbox"
                value="legs"
                checked={muscleGroup.includes('legs')}
                onChange={handleMuscleGroupChange}
              />
              Legs
            </label>
            <label>
              <input
                type="checkbox"
                value="shoulders"
                checked={muscleGroup.includes('shoulders')}
                onChange={handleMuscleGroupChange}
              />
              Shoulders
            </label>
            <label>
              <input
                type="checkbox"
                value="arms"
                checked={muscleGroup.includes('arms')}
                onChange={handleMuscleGroupChange}
              />
              Arms
            </label>
            <label>
              <input
                type="checkbox"
                value="core"
                checked={muscleGroup.includes('core')}
                onChange={handleMuscleGroupChange}
              />
              Core
            </label>
          </div>
        </div>

        <div>
          <label>Program:</label>
          <select
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

        <button type="submit">Add Workout</button>
      </form>
      <Link to={"/"}>Back</Link>
    </div>
  );
};

export default Workout;
