import "./NewsBlocki.css"
const NewsBlocki = () => {
  return (
    
    <> 
    <div className="box1">
    <div className="newimg">
      <img src={props.img} alt="" className='imglo' />
    </div>
    <div className="sub-box2">
      <div className="headinofbox">
        <h1>{props.heading}</h1>
      </div>
      <div className="descriptionofbox">
        <p>{props.descri}</p>
      </div>
      <div className="readmore">
        <button>Read more</button>
      </div>
    </div>
   </div>
    </>
  )
  NewsBlocki.defaultProps = {
    img : "./src/images/pmmodi.jpeg" , 
    heading : "hehehehehe" ,
    descri : "gegegehgdhdhd" ,

  }
}

export default NewsBlocki;