import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProgram, getProgramById, updateProgram } from "../redux/actions/programActions";
import { Link, useParams } from "react-router-dom";
import BackButton from "./BackButton";
import MultiImageUploader from "../inputs/MultiImageUploader";

const NewProgram = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const { program } = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (id)
      dispatch(getProgramById(id))
  }, [dispatch])

  useEffect(() => {
    if (program) {
      setName(program.name)
      setDurationWeeks(program.durationWeeks)
      setDescription(program.description)
      setImages(program.images)
    }
  }, [program])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateProgram(id, { name, durationWeeks, description, images }));
    } else dispatch(createProgram({ name, durationWeeks, description, images }));
    setName("");
    setDurationWeeks(0);
    setDescription("");
    setImages([]);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-3">Add Program</h1>
      <div className="row justify-content-center">
        <div className="col-md-10 col-xl-8">
          <div className="d-flex justify-content-between align-items-center">
            <BackButton />
            <Link to={"/program/allPrograms"} className="btn btn-primary">all programs</Link>
          </div>
          <form onSubmit={handleSubmit} className="border p-3 rounded mt-2">
            <div className="mb-3">
              <label>name:</label>
              <input
                className="form-control"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>durationWeeks:</label>
              <input
                className="form-control"
                type="number"
                required
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>description:</label>
              <input
                className="form-control"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <MultiImageUploader setImages={setImages} images={images} />
            <button type="submit" className="btn btn-primary">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProgram;
