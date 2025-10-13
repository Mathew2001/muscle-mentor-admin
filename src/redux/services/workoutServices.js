
import requests from './httpServices'

const workoutServices = {
  createWorkout(body){
    return requests.post("workouts/add" , body)
  },
  getAllWorkouts(){
    return requests.post("workouts/allWorkouts")
  },
  getWorkoutById(id){
    return requests.post(`workouts/getbyid/${id}`);
  },
  updateWorkout(id,body){
    return requests.put(`workouts/update/${id}`,body)
  },
  deleteWorkout(id){
    return requests.delete(`workouts/delete/${id}`)
  },
}

export default workoutServices