import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Home = () => {
  return (
    <div className="`navbar d-flex justify-content-start align-items-center gap-2">
      {/* <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: 150, height: 120, borderRadius: 10, marginLeft: 10 }}
        />
        <h1>MuscleMentor</h1>
        </div> */}
      <Link to={"workout/allWorkouts"} className="btn btn-primary">
        workouts
      </Link>
      <Link to={"program/allPrograms"} className="btn btn-primary">
        programs
      </Link>
      <Link to={"contactUs"} className="btn btn-primary">
        contact us
      </Link>
      <Link to={"reviews"} className="btn btn-primary">
        reviews
      </Link>
    </div>
  );
};

export default Home;
