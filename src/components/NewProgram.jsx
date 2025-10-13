import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProgram, getProgramById, updateProgram } from "../redux/actions/programActions";
import { Link, useParams } from "react-router-dom";

const NewProgram = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(0);
  const [description, setDescription] = useState("");
  const { program } = useSelector((state) => state.programReducer);

  useEffect(() => {
    if(id)
      dispatch(getProgramById(id))
  },[dispatch])

  useEffect(() => {
    if(program)
    {
      setName(program.name)
      setDurationWeeks(program.durationWeeks)
      setDescription(program.description)
    }
  },[program])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateProgram(id, { name, durationWeeks, description }));
    } else dispatch(createProgram(name, durationWeeks, description));
    setName("");
    setDurationWeeks(0);
    setDescription("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>durationWeeks:</label>
        <input
          type="number"
          required
          value={durationWeeks}
          onChange={(e) => setDurationWeeks(e.target.value)}
        />
        <label>description:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <Link to={"/"}>Back</Link>
    </div>
  );
};

export default NewProgram;
