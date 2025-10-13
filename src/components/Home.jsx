import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Home = () => {
  return (
    <>
      <div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: 150, height: 120, borderRadius: 10, marginLeft: 10 }}
        />
        <h1>MuscleMentor</h1>
        </div>
        <Link to={"workout/add"} style={{ margin: 2 }}>
          add workout
        </Link>
        <Link to={"program/add"} style={{ margin: 2 }}>
          add program
        </Link>
        <Link to={"workout/allWorkouts"} style={{ margin: 2 }}>
          workouts
        </Link>
        <Link to={"program/allPrograms"} style={{ margin: 2 }}>
          programs
        </Link>
      </div>
    </>
  );
};

export default Home;
