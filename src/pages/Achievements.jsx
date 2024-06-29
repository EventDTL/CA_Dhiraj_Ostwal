import img1 from '../images/SPPU.png'
import img2 from '../images/NYCS.png'
import img3 from '../images/we.png'
import img4 from '../images/mngl.png'
import './Achievements.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Achievements() {
    return (
        <>

            <div className="Association" id="linkachieve">
                <h2><span>Ach</span>ievement</h2>
                <div className="Achievemnets ">
                    <div className="NewsBox">
                        <img src={img1} alt="" title="" className="imgo" />
                        <h4><b>1998</b> <br />Qualified as a CA CWA and SET examination in first attempt. </h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img2} alt="" title="" className="imgo" />
                        <h4><b>1999</b> <br />Appointed as a Finance Strategist at Lokmat newspaper the Leading Marathi daily .</h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img3} alt="" title="" className="imgo" />
                        <h4><b>2000</b><br /> Designated as a Stratergy Partner with State Bank of India for their credit card business</h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img4} alt="" title="" className="imgo" />
                        <h4><b>2001</b> <br /> Achieved a business for 10k credit cards for State Bank of India.</h4>
                    </div>
                    <button className='readbtn text-white font-bold py-3 px-5  mt-1 transition-opacity duration-500'  style={{
    height: '6vh',
    marginLeft: '12px',
  }}>
                        <Link to="./MainAchieve">Read More</Link>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Achievements;