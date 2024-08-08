import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { useGetAllMeeting } from '../../lib/react-query/queries'
import './Meetings.css' // Import CSS file

// Add icons to the library
library.add(faCalendarAlt)

function Meetings() {
  const {
    data: meetingData,
    isLoading: isLoadingMeeting,
    error,
    refetch,
  } = useGetAllMeeting()

  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    if (meetingData && meetingData.documents) {
      setMeetings(
        Array.isArray(meetingData.documents) ? meetingData.documents : []
      )
    }
  }, [meetingData])


  // Function to format date and time into 12-hour format
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr)
    const date = dateTime.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    const time = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    return { date, time }
  }

  return (
    <div className='meetings-container'>
      <h2 className='meetings-header'>Meetings</h2>
      <table className='meetings-table'>
        <thead>
          <tr>
            <th>
              <img
                className='whatsapp-icon'
                src='https://img.icons8.com/windows/32/000000/whatsapp--v1.png'
                style={{
                  filter:
                    'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg)',
                  marginRight: '5px', // Adjust margin for alignment
                }}
                alt='whatsapp--v1'
              />
              WhatsApp
            </th>
            <th>Subject</th>
            <th>
              <FontAwesomeIcon icon={faCalendarAlt} className='icon' />
              Meeting Date
            </th>
            <th>
              <FontAwesomeIcon icon={faCalendarAlt} className='icon' />
              Meeting Time
            </th>

            <th>
              <FontAwesomeIcon icon={faCalendarAlt} className='icon' />
              Created Time
            </th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, index) => (
            <tr key={index} className='meeting-item'>
              <td>
                <div className='icon-container'>
                  <span className='whatsapp-number'>
                    {meeting.WhatsAppNumber}
                  </span>
                </div>
              </td>
              <td>
                <div className='icon-container'>
                  <span className='text'>{meeting.Subject}</span>
                </div>
              </td>
              <td>
                <div className='icon-container'>
                  <span className='text'>
                    {formatDateTime(meeting.DateTime).date}
                  </span>
                </div>
              </td>
              <td>
                <div className='icon-container'>
                  <span className='text'>
                    {formatDateTime(meeting.DateTime).time}
                  </span>
                </div>
              </td>
              <td>
                <div className='icon-container'>
                  <strong>
                    {formatDistanceToNow(parseISO(meeting.SubmitDate), {
                      addSuffix: true,
                    })}
                  </strong>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Meetings
