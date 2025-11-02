import requests from "./httpServices";

const imageServices = {
  addImage(image){
    return requests.post("/image/add", image);
  }
}

export default imageServices;