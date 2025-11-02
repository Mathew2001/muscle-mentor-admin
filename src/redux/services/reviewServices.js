import requests from "./httpServices";

const reviewServices = {
  getAllReviews(){
    return requests.post("/review/all");
  },
  deleteReview(id) {
    return requests.delete(`/review/delete/${id}`);
  },
  updateReview(id, body){
    return requests.put(`/review/update/${id}`, body);
  },
  getReviewById(id){
    return requests.post(`/review/byid/${id}`);
  },
  getReviewsByIsApproved(){
    return requests.post(`/review/byisapproved`);
  }
}

export default reviewServices;