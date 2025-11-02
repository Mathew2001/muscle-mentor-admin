
import ReviewCard from './ReviewCard'
import SwiperItems from '../SwiperItems'

const Reviews = ({ reviews, title }) => {
  return (
    <div className="container" dir="rtl">
      <h1 className="text-right mb-4">{title}</h1>
      <div className="position-relative h-100 ">
        {reviews && reviews.length > 0 ? (
          <SwiperItems items={reviews} renderItems={(item, index) => (
            <ReviewCard key={item._id} userName={item.userName} rating={item.rating} content={item.content} isApproved={item.isApproved} id={item._id} />
          )} />
        ) : (
          <h1>לא נמצאו תגובות</h1>
        )}
      </div>
    </div>
  )
}

export default Reviews