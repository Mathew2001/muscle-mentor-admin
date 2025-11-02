import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews, getReviewsByIsApproved } from '../../redux/actions/reviewActions'
import { useEffect } from 'react'
import Reviews from './Reviews'
import BackButton from '../BackButton'
//import Search from '../Search'
import ReviewCard from './ReviewCard'

const ReviewsButton = () => {
  const dispatch = useDispatch()
  const { reviews, reviewsByIsApproved } = useSelector((state) => state.reviewReducer)
  const [currentStatus, setCurrentStatus] = useState('all')
  useEffect(() => {
    dispatch(getAllReviews())
    dispatch(getReviewsByIsApproved())
  }, [dispatch])

  
  const reviewsByIsNotApproved = reviews.filter((review) => !review.isApproved) || []
  
  const HandleButtons = (action) => {
    switch(action) {
      case 'approved':
        setCurrentStatus('approved')
        break
      case 'unapproved':
        setCurrentStatus('unapproved')
        break
      default:
        setCurrentStatus('all')
        break
    }
  }
  return (
    <div className="container mt-5" dir="rtl">
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('approved')}>ביקורות מאושרות</button>
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('unapproved')}>ביקורות ממתינות לאישור</button>
      <BackButton />
      {/* <Search data={reviews} searchBy="userName" cardComponent="ReviewCard" /> */}
      <Reviews reviews={reviews} title="כל הביקורות" />
      {currentStatus === 'approved' && (
        <Reviews reviews={reviewsByIsApproved} title="ביקורות מאושרות" />
      )}
      {currentStatus === 'unapproved' && (
        <Reviews reviews={reviewsByIsNotApproved} title="ביקורות ממתינות לאישור" />
      )}
    </div>
  )
}

export default ReviewsButton