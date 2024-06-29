import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled, Box, Grid, Typography, Button } from '@mui/material';
import './award.css'

// import React from 'react';
import { Link } from 'react-router-dom';
// Import your images
import aword1 from '../images/Vishwa-Maitri-Sangha.png';
import aword2 from '../images/maharashtra-rajya-marathi-patrakar-sangha.png';
import aword3 from '../images/Suryadatta.png';

const AwardContainer = styled(Box)(({ theme }) => ({
  padding: '40px 20px',
  backgroundColor: 'white',
}));

const AwardHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: '30px',
}));

const AwardHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '2em',
  margin: 0,
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
}));

const AwardImage = styled('img')(({ theme }) => ({
  borderRadius: '30px',
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  marginBottom: '20px',
}));

const AwardContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  display: 'flex', // Added display flex
  flexDirection: 'column', // Added flex direction column
  justifyContent: 'center', // Added justify content center
  alignItems: 'center', // Added align items center
}));

const AwardText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2em',
  margin: '10px 0',
  textAlign: 'center', // Added text align center
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--main-color)',
  color: '#10100f !important',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '8px 15px',
  borderRadius: '25px',
  transition: 'color 0.2s, transform 1s 0.2s',
  display: 'inline-block',
  margin: '5px 0px 0px',
  fontSize: '18px',
  boxShadow: '2px 2px 20px #c5c5c5',
  border: '4px solid #fff',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    backgroundColor: '#F88F03!important',
    borderColor: '#F88F03 !important',
    boxShadow: '0 10px 10px -10px rgba(0, 0, 0, 0.5)',
    color: '#fff !important',
  },
}));

const Award = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const AwardPhoto = styled(Typography)(({ theme }) => ({
    display: 'flex', // Added display flex
    flexDirection: 'column', // Added flex direction column
    justifyContent: 'center', // Added justify content center
    alignItems: 'center', // Added align items center
  }));

  return (
    <AwardContainer>
      <AwardHeader>
        <AwardHeaderText variant="h2" className='awordh'><h2><span>Awa</span>rds</h2></AwardHeaderText>
      </AwardHeader>
      <SliderContainer>
        <Slider {...settings}>
          <div className="slider-item">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
              <AwardPhoto>
                <AwardImage src={aword1} alt="Image 1" />
              </AwardPhoto>  
              </Grid>
              <Grid item xs={12} md={6}>
                <AwardContent>
                  <AwardText variant="body1">
                    2018-19: Facilitated for BNI EXCELLENCE tenure green pin holder.
                  </AwardText>
                  <button className='sbtn  text-white font-bold py-3 px-5  mt-1 transition-opacity duration-500'>
           <Link to="./NewsBlogs">Read More</Link>
          </button>
                </AwardContent>
              </Grid>
            </Grid>
          </div>
          <div className="slider-item">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
              <AwardPhoto>
                <AwardImage src={aword2} alt="Image 2" />
              </AwardPhoto>
              </Grid>
              <Grid item xs={12} md={6}>
                <AwardContent>
                  <AwardText variant="body1">
                    Awarded by Shree Parmerkar Institute for research, innovation and technology.
                  </AwardText>
                  <button className='sbtn  text-white font-bold py-3 px-5  mt-1 transition-opacity duration-500'>
           <a href="./MainAchieve">Read More</a>
          </button>
                </AwardContent>
              </Grid>
            </Grid>
          </div>
          <div className="slider-item">
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
              <AwardPhoto>
                <AwardImage src={aword3} alt="Image 3" />
              </AwardPhoto>
              </Grid>
              <Grid item xs={12} md={6}>
                <AwardContent>
                  <AwardText variant="body1">
                    Vishwa Maitri Sangha BharatVarsh recognized contribution in Education Sector Rashtra Gaurav Sanman on the Occasion of Azadi Ka Amrit Mahotsav (2022)
                  </AwardText>
                  <button className='sbtn  text-white font-bold py-3 px-5  mt-1 transition-opacity duration-500'>
           <a href="./MainAchieve">Read More</a>
          </button>
                </AwardContent>
              </Grid>
            </Grid>
          </div>
        </Slider>
      </SliderContainer>
    </AwardContainer>
  );
};

export default Award;