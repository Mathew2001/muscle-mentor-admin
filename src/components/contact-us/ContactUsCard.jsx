import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteContactUs } from '../../redux/actions/contactUsActions'
import { useContactUs } from '../../hooks/useContactUs'

const ContactUsCard = ({ name, email, message, id, date, status: initialStatus, phone }) => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState(initialStatus || 'pending')
  const { handleSubmit, register, errors, onSubmit, reset } = useContactUs(id)
  const handleStatus = (newStatus) => {
    onSubmit(id, { name: name, email: email, message: message, status: newStatus, phone: phone })
  }
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'ממתין'
      case 'in progress':
        return 'בביצוע'
      case 'completed':
        return 'הושלם'
      case 'cancelled':
        return 'בוטל'
      default:
        return 'ממתין'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  return (
    <div className="col" style={{ height: '500px' }}>
      <div className="card shadow-sm h-100">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between">
          <h1 className="card-title h5">שם: {name}</h1>
          <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteContactUs(id))}
            >
              מחק
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">דואר אלקטרוני: {email}</p>
          <p className="card-text">טלפון: {phone}</p>
          <p className="card-text">הודעה: {message}</p>
          <p className="card-text">תאריך: {formatDate(date)}</p>
          <p className="card-text">{getStatusText(status)}</p>
        </div>
        <div className="card-footer d-flex justify-content-between ">
          <button
            className="btn btn-warning"
            onClick={() => handleStatus("in progress")}
            disabled={status === 'in progress'}
          >
            בביצוע
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleStatus("completed")}
            disabled={status === 'completed'}
          >
            הושלם
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleStatus("pending")}
            disabled={status === 'pending'}
          >
            ממתין
          </button>
         
        </div>
      </div>
    </div>
  )
}

export default ContactUsCard