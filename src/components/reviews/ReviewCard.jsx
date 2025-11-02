import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteReview } from '../../redux/actions/reviewActions'
import { useReviewSubmit } from '../../hooks/useReviewSubmit'

const ReviewCard = ({ userName, rating, content, isApproved: initialIsApproved, id }) => {
  const dispatch = useDispatch()
  const [isApproved, setIsApproved] = useState(initialIsApproved)
  const { onSubmit } = useReviewSubmit()
  const HandleIsApproved = () => {
    onSubmit(id, { userName: userName, rating: rating, content: content, isApproved: !isApproved })
    setIsApproved(!isApproved)
  }

  return (
    <div className="col" style={{ height: '350px' }}>
      <div className="card m-3 shadow-sm h-100">
        <div className="card-header bg-light h-100">
          <h1 className="card-title h5 mb-2">{userName}</h1>
          <div className="d-flex align-items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                style={{
                  color: index < rating ? '#ffd700' : '#e4e5e9',
                  fontSize: '1.2rem'
                }}
              >
                ★
              </span>
            ))}
          </div>
          <p className="card-text">{content}</p>
          <p className="card-text">
            <small className="text-muted">
              סטטוס: {isApproved ? 'מאושר' : 'ממתין לאישור'}
            </small>
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteReview(id))}
          >
            מחק
          </button>
          <button
            className="btn btn-primary"
            onClick={HandleIsApproved}
          >
            {isApproved ? 'בטל אישור' : 'אישור'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard