import requests from "./httpServices";

const workoutSevices = {
  createProgram(body){
    return requests.post("programs/add" , body)
  },
  getAllPrograms(){
    return requests.post("programs/allPrograms")
  },
  getProgramById(id){
    return requests.post(`/programs/getbyid/${id}`)
  },
  updateProgram(id,body){
    return requests.put(`programs/update/${id}` , body)
  },
  deleteProgram(id){
    return requests.delete(`programs/delete/${id}`)
  },
} 

export default workoutSevices