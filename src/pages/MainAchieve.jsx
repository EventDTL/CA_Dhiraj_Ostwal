import img1 from '../images/SPPU.png'
import img2 from '../images/NYCS.png'
import img3 from '../images/we.png'
import img4 from '../images/mngl.png'
import img5 from '../images/ev1.png'
import img6 from '../images/ev2.png'
import img7 from '../images/ev3.png'
import img8 from '../images/ev4.png'
import img9 from '../images/ev5.png'
import img10 from '../images/ev6.png'
import img11 from '../images/ev7.png'
import img12 from '../images/ev8.png'
import img13 from '../images/ev9.png'
import img14 from '../images/st.svg'
import Img from '../images/carrer.jpg'
import Banner from '../component/ui/Banner'
import './MainAchieve.css'
function MainAchieve(){
    return(
     <>
      <Banner
                imageUrl={Img}
                breadcrumb='Home > Career'
                headline='Achievemnets'
            />{' '}
      <div className="Association">
                 <h2><span>Ach</span>ievements</h2>
                <div className="Achievemnets ">
                    <div className="NewsBox">
                        <img src={img1} alt="" title="" className="imgo" />
                        <h4>1998 <br />Qualified as a CA CWA and SET examination in first attempt. </h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img2} alt="" title="" className="imgo" />
                        <h4>1999 <br />Appointed as a Finance Strategist at Lokmat newspaper the Leading Marathi daily .</h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img3} alt="" title="" className="imgo" />
                        <h4>2000<br /> Designated as a Stratergy Partner with State Bank of India for their credit card business</h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img4} alt="" title="" className="imgo" />
                        <h4>2001 <br /> Achieved a business for 10k credit cards for State Bank of India.</h4>
                    </div>

                    <div className="NewsBox">
                        <img src={img8} alt="" title=""  className="imgo" />
                        <h4>2002 <br/> Assigned Pune Division Stratergy partner for SBI Card. </h4>
                    </div>

                    <div className="NewsBox">
                        <img src={img7} alt="" title=""  className="imgo" />
                        <h4> 2003 <br/> Bound for Pan India Human Stratergies for Himalaya Drug Company. </h4>

                    </div>

                    <div className="NewsBox">
                        <img src={img5} alt="" title=""  className="imgo" />
                        <h4>2004 <br/>Got an assignment for Symbiosis Pune (SCMHRD) to built education stratergies and MDPs.</h4>
                    </div>

                    <div className="NewsBox">
                        <img src={img6} alt="" title=""  className="imgo" />
                        <h4>2005<br/>  Facilitated by State Bank of India for achieving largest business in West India through our stratergies.</h4>
                    </div>

                    <div className="NewsBox">
                        <img src={img13} alt="" title=""  className="imgo" />
                        <h4>2006<br/> Consigned by Reebok India Ltd for building stratergies of retail business in India.</h4>
                    </div>


                    <div className="NewsBox">
                        <img src={img9} alt="" title=""  className="imgo" />
                        <h4>2007<br/> Partnered with noted builder in Pune for 300+ flats development. </h4>
                    </div>


                    <div className="NewsBox">
                        <img src={img10} alt="" title=""  className="imgo" />
                            <h4>2008<br/> Designed and drafted stratergies for Australian clients for their business expansion. </h4>
                    </div>

                    <div className="NewsBox">
                        <img src={img11} alt="" title=""  className="imgo" />
                        <h4>2009<br/> Worked on the 100+ acres land parcel where 216 owners which was financed by German bank through English mortgage. </h4>
                    </div>


                    <div className="NewsBox">
                        <img src={img14} alt="" title=""  className="imgo" />
                        <h4>2011<br /> Mediated family dispute for a well known business family for assets of 545 crs. </h4>
                    </div>
                    <div className="NewsBox">
                        <img src={img12} alt="" title="" className="imgo"/>
                        <h4> 2020 <br /> Assembled and conceived Youtube channel with 100+ videos and 1.1M views. </h4>
                    </div>

                </div>
            </div>
     </>
    )
}
export default MainAchieve;