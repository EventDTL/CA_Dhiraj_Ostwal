import "./Profile.css"
import Profileimg from '../images/rajesh-pande.png'
import Img from '../images/carrer.jpg'
import Banner from '../component/ui/Banner'
function Profile() {
    return (
        <>
            <Banner
                imageUrl={Img}
                breadcrumb='Home > Career'
                headline='Profile'
            />{' '}
            <div className="achievements" >
                <div className="achievecontain" >
                    <h2></h2>
                    <h4> B. Com, CA, CMA and SET </h4>
                    <p className="pgap">CA Dhiraj Ostwal is an experienced and professional CA with more than 25 years in Business Coaching, advisory and, strategy planning. He has worked on a global level in countries like America, Australia, New Zealand, and Singapore. With his extraordinary rich core business experience, he has helped various business houses in India by guiding and sharing his entrepreneurial skills. </p>
                    <p className="pgap">He has been a real backbone and helping hand to various emerging startups and MSME Companies in India with his knowledge and training skills in Business coaching and Business management. He has led the example by starting 3 firms of his own after his comeback to India from abroad in 2015. Being a successful mentor and business coach he has made many businesses successful and potentially earnable centres.
                    </p>
                </div>
                <div className="acheiveimg">
                    <img src={Profileimg} alt="" title="" className="img-fluid" />
                </div>
            </div>
            <hr/>
      <div className="achievewid">
        <div className="achievedis">
            <div className="achievepara">
            <h2> Vision </h2>
                <p>To become the most trusted, efficient and result-oriented companion to empower entrepreneurs, Start-ups and corporates for uninterrupted growth through world-class business strategies.
               </p>
            </div>
            <div className="achievepara">
                <h2> Mission </h2>
               <p> To reach out 1000+ businesses to boost their profitability through most sustainable business strategies which will have positive impact on taxes, human resources, finance, resources and overall key factors of organisation</p>
            </div>
         </div>   
         </div>
        </>
    )
}
export default Profile;