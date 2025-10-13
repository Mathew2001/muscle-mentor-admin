import React from "react";

const WorkoutCard = ({ title, duration, level, description, muscleGroup }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>duration : {duration}</p>
      <p>level : {level}</p>
      <p>description : {description}</p>
      {muscleGroup && muscleGroup.length > 0 ? (
        <div>
          <ul>
          {muscleGroup.map((muscle, i) => {
            <li key={i}>{muscle}</li>
          })}
          </ul>
        </div>
      ) : (
        <p>there is no muscles</p>
      )}
    </div>
  );
};

export default WorkoutCard;
