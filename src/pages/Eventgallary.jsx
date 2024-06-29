import egallary1 from '../images/evg1.png'
import egallary2 from '../images/evg2.png'
import egallary3 from '../images/evg3.png'
import egallary4 from '../images/evg4.png'
import egallary5 from '../images/evg5.png'
import './Eventgallary.css'
function Eventgallary() {
    return (
        <>
            {/* <!-- Our Gallery --> */}
            <section className='Eventgallary'>
                <div className="text-center">
                    <h2><span>Even</span>ts Gallery</h2>
                </div>
                <ul className="Gallery">
                    <li className="Img1">
                        <img src={egallary1} alt="" title="" className="img-fluid" />
                    </li>
                    <li className="Img2">
                        <img src={egallary2} alt="" title="" className="img-fluid" />
                    </li>
                    <li className="Img3">
                        <img src={egallary3} alt="" title="" className="img-fluid" />
                    </li>
                    <li className="Img4">
                        <img src={egallary4} alt="" title="" className="img-fluid" />
                    </li>
                    <li className="Img5">
                        <img src={egallary5} alt="" title="" className="img-fluid" />
                    </li>
                </ul>
                <div className="GalleryMob">
                    <img src={egallary1} alt="" title="" className="img-fluid" />
                    <img src={egallary2} alt="" title="" className="img-fluid" />
                    <img src={egallary3} alt="" title="" className="img-fluid" />
                    <img src={egallary4} alt="" title="" className="img-fluid" />
                    <img src={egallary5} alt="" title="" className="img-fluid" />
                </div>
            </section>
            {/* <!-- End Our Gallery --> */}

        </>
    )
}
export default Eventgallary;