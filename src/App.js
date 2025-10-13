import Home from "./components/Home";
import NewWorkout from "./components/NewWorkout";
import { Route, Router, Routes ,BrowserRouter, HashRouter} from "react-router-dom";
import Workouts from "./components/Workouts";
import Programs from "./components/Programs";
import NewProgram from "./components/NewProgram";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/add" element={<NewWorkout />} />
          <Route path="/workout/update/:id" element={<NewWorkout />} />
          <Route path="/workout/allWorkouts" element={<Workouts />} />
          <Route path="/program/add" element={<NewProgram />} />
          <Route path="/program/update/:id" element={<NewProgram />} />
          <Route path="/program/allPrograms" element={<Programs />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
