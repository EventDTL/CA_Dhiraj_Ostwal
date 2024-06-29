import emp1 from "../images/nagini.jpg";
import emp2 from "../images/chanchl.jpg";
import emp3 from "../images/hemant.jpg";
import emp4 from "../images/gauri.jpg";
import emp5 from "../images/purva.jpg";
import emp6 from "../images/ganesh.jpg";
import emp7 from "../images/mitali.jpg";
import emp8 from "../images/mukta.jpg";
// import Img from '../images/carrer.jpg';
// import Banner from '../component/ui/Banner';
import './employee.css';
import React, { useState, useEffect, useRef } from 'react';

function Employee() {
    const employees = [
        { image: emp1, name: "Nagini Mhatre", position: "Account Assistant" },
        { image: emp2, name: "Chanchal Mate", position: "Account Assistant" },
        { image: emp3, name: "Hemant Zujam", position: "Senior Executive" },
        { image: emp4, name: "Gauri Jagtap", position: "Account Assistant" },
        { image: emp5, name: "Purva Kulkarni", position: "Account Assistant" },
        { image: emp6, name: "Ganesh Manjare", position: "Manger" },
        { image: emp7, name: "Mitali Shinde", position: "Account Assistant" },
        { image: emp8, name: "Mukta Jagdale", position: "Account Assistant" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const nextSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % employees.length);
        };

        timeoutRef.current = setInterval(nextSlide, 2500);

        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
            }
        };
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % employees.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? employees.length - 1 : prevIndex - 1
        );
    };

    const getSlidesToShow = () => {
        const slides = [];
        for (let i = 0; i < 3; i++) {
            const adjustedIndex = (currentIndex + i) % employees.length;
            slides.push(employees[adjustedIndex]);
        }
        return slides;
    };

    return (
        <>
            {/* <Banner
                imageUrl={Img}
                breadcrumb='Home > Career'
                headline='Employee'
            /> */}
            <div className="emp">
                <div className="emtext"> <h2><span>Our </span>Team</h2>
                </div>
                <div className="slider">
                    <button onClick={prevSlide} className="slider-button">
                        &#10094;
                    </button>
                    <div className="slider-content">
                        {getSlidesToShow().map((employee, index) => (
                            <div className={`slide ${index === 1 ? 'center' : ''}`} key={index}>
                                <img src={employee.image} alt={`Slide ${index}`} />
                                <h1>{employee.name}</h1>
                                <p>{employee.position}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={nextSlide} className="slider-button">
                        &#10095;
                    </button>
                </div>
            </div>
        </>
    );
}

export default Employee;
