import requests from "./httpServices";

const contactUsServices = {
  getContactUsById(id){
    return requests.post(`/contactUs/byid/${id}`);
  },
  getAllContactUs(){
    return requests.post("/contactUs/all");
  },
  deleteContactUs(id){
    return requests.delete(`/contactUs/delete/${id}`);
  },
  updateContactUs(id, body){
    return requests.put(`/contactUs/update/${id}`, body);
  },
}

export default contactUsServices;