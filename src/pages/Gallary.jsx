import './gallary.css'
import gimg1 from '../images/gallary1.jpg'
import gimg2 from '../images/gallary2.jpg'
import gimg3 from '../images/gallary3.jpg'
import gimg4 from '../images/gallary4.jpg'
import gimg5 from '../images/gallary5 (2).jpg'
import gimg6 from '../images/gallary6.jpg'
import gimg7 from '../images/gallary7.jpg'
import gimg8 from '../images/gallary8.jpg'
import gimg9 from '../images/gallary9.jpg'
import Img from '../images/carrer.jpg'
import Banner from '../component/ui/Banner'
function Gallary() {
  return (
    <>
      <Banner
        imageUrl={Img}
        breadcrumb='Home > Career'
        headline='Gallary'
      />{' '}
      <div className="gallary" id='Gallary'>
        <img src={gimg1} className="img-fluid" alt="" />
        <img src={gimg2} className="img-fluid" alt="" />

        <img src={gimg3} className="img-fluid" alt="" />

        <img src={gimg4} className="img-fluid" alt="" />


        <img src={gimg5} className="img-fluid img5" alt="" />

        <img src={gimg6} className="img-fluid img6" alt="" />
        <img src={gimg7} className="img-fluid img7" alt="" />
        <img src={gimg8} className="img-fluid img8" alt="" />
        <img src={gimg9} className="img-fluid img9" alt="" />
      </div>

    </>
  )
};

export default Gallary;
