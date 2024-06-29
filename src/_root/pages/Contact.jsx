import React, { useEffect, useState } from 'react'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import './Contact.css' // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faPhone,
  faClock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { useGetAllContactUs } from '../../lib/react-query/queries'

const Contact = () => {
  const {
    data: contactData,
    isLoading: isLoadingContact,
    error,
    refetch,
  } = useGetAllContactUs()
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    if (contactData && contactData.documents) {
      setContacts(
        Array.isArray(contactData.documents) ? contactData.documents : []
      )
    }
  }, [contactData])

  return (
    <div className='contact-list'>
      <h1>New Inquiry</h1>
      {isLoadingContact && <p>Loading contacts...</p>}
      {error && <p>Error fetching contacts: {error.message}</p>}
      {contacts.map((contact) => {
        const registeredDate = contact.SubmitDate
        const parsedDate = registeredDate ? parseISO(registeredDate) : null
        const formattedDate = parsedDate
          ? format(parsedDate, 'yyyy-MM-dd')
          : 'Unknown date'
        const timeElapsed = parsedDate
          ? formatDistanceToNow(parsedDate, { addSuffix: true })
          : 'Unknown time'

        return (
          <div key={contact.$id} className='contact-item'>
            <div className='contact-header'>
              <div>
                <FontAwesomeIcon icon={faUser} /> <strong>Name:</strong>{' '}
                {contact.FirstName} {contact.LastName}
              </div>
              <div className='contact-time-elapsed'>
                <FontAwesomeIcon icon={faClock} />{' '}
                <strong>{timeElapsed}</strong>
              </div>
            </div>
            <div className='pb-2'>
              <FontAwesomeIcon icon={faPhone} />{' '}
              <strong>Contact Number:</strong> {contact.Phone}
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} /> <strong>Message:</strong>{' '}
              {contact.Message}
            </div>
            <p className='contact-date'>
              <strong>Date: </strong>
              {formattedDate}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Contact
