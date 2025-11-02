import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContactUs } from '../../redux/actions/contactUsActions'
import ContactsUsAll from './ContactsUsAll'
import BackButton from '../BackButton'
//import Search from '../Search'

const ContactUsButton = () => {
  const dispatch = useDispatch()
  const { contactUs } = useSelector((state) => state.contactUsReducer)
  const [currentStatus, setCurrentStatus] = useState('pending')

  const HandleButtons = (action) => {
    switch (action) {
      case 'completed':
        setCurrentStatus('completed')
        break
      case 'in progress':
        setCurrentStatus('in progress')
        break
      default:
        setCurrentStatus('pending')
        break
    }
  }
  useEffect(() => {
    dispatch(getAllContactUs())
  }, [dispatch])

  const completedContactUs = contactUs.filter((contactUs) => contactUs.status === 'completed') || []
  const inProgressContactUs = contactUs.filter((contactUs) => contactUs.status === 'in progress') || []
  const pendingContactUs = contactUs.filter((contactUs) => contactUs.status === 'pending') || []

  return (
    <div className="container mt-4" dir="rtl">
      <BackButton />
      {/* <Search data={contactUs} searchBy="name" cardComponent="ContactUsCard" /> */}
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('completed')}>פניות משתמשים שהסתימו בהצלחה</button>
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('in progress')}>פניות משתמשים בביצוע</button>
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('pending')}>פניות משתמשים ממתין</button>
      <ContactsUsAll contactUs={contactUs} title="כל הפניות" />
      {currentStatus === 'completed' && (
        <ContactsUsAll contactUs={completedContactUs} title="פניות משתמשים שהסתימו בהצלחה" />
      )}
      {currentStatus === 'in progress' && (
        <ContactsUsAll contactUs={inProgressContactUs} title="פניות משתמשים בביצוע" />
      )}
      {currentStatus === 'pending' && (
        <ContactsUsAll contactUs={pendingContactUs} title="פניות משתמשים ממתין" />
      )}
    </div>
  )
}

export default ContactUsButton