import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import './employee.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetAllEmployee } from '../lib/react-query/queries';

const Employee = () => {
  const { data: employeeData, isLoading: isLoadingEmp, error, refetch } = useGetAllEmployee();
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const [teamMembers, setEmployees] = useState([]);

  useEffect(() => {
    if (employeeData) {
      setEmployees(employeeData);
    }
  }, [employeeData]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide(current),
  };

  return (
    <div className="event-team-slider">
      <h5>Meet Our Team</h5>
      <div className="slider-container">
        <Slider ref={sliderRef} {...sliderSettings}>
          {teamMembers.map((member, index) => (
            <div key={index} className={`team-member ${activeSlide === index ? 'slick-center' : ''}`}>
              <div className="member-info">
                <img src={member.ImageUrl} alt={member.FirstName} />
                <p>{member.FirstName}</p>
                <p><b>{member.Position}</b></p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Employee;
