import Home from "./components/Home";
import NewWorkout from "./components/NewWorkout";
import { Route, Router, Routes ,BrowserRouter, HashRouter} from "react-router-dom";
import Workouts from "./components/Workouts";
import Programs from "./components/Programs";
import NewProgram from "./components/NewProgram";
import ContactUsButton from "./components/contact-us/ContactUsButton";
import ReviewsButton from "./components/reviews/ReviewsButton";
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
          <Route path="/contactUs" element={<ContactUsButton />} />
          <Route path="/reviews" element={<ReviewsButton />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
