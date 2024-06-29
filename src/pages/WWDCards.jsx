import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Import your images
import card1 from '../images/istockphoto-1180187740-612x612.jpg'
import card2 from '../images/istockphoto-1181250359-612x612.jpg'
import card3 from '../images/istockphoto-499517325-612x612.jpg'
import card4 from '../images/istockphoto-1455167765-612x612.jpg'

// CSS styles
const styles = {
  card: {
    position: 'relative',
    backgroundColor: '#212121',
    color: '#fff',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    borderRadius: '1rem',
  },
  cardHover: {
    transform: 'translateY(-15px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  cardContent: {
    position: 'relative',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#A0DEFF',
  },
  cardTitle: {
    marginBottom: '16px',
    color: 'black', // Changed text color to black
  },
  cardButton: {
    color: 'black', // Changed button text color to black
    backgroundColor: 'white',
    fontWeight: 'bold',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '1rem',
    paddingX: '1.4rem',
  },
}

function Cards() {
  const [hoverCard, setHoverCard] = React.useState(null)

  const handleMouseEnter = (index) => {
    setHoverCard(index)
  }

  const handleMouseLeave = () => {
    setHoverCard(null)
  }

  return (
    <Grid
      container
      spacing={3}
      justifyContent='center'
      style={{ marginTop: '2rem', padding: '2rem' }}
    >
      {[card1, card2, card3, card4].map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card
            style={{
              ...styles.card,
              ...(hoverCard === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <CardMedia
              style={styles.cardMedia}
              image={card}
              title='Card image'
            />
            <CardContent style={styles.cardContent}>
              <Typography
                variant='h5'
                component='h2'
                gutterBottom
                style={styles.cardTitle}
              >
                Card title
              </Typography>
              <Button variant='outlined' style={styles.cardButton}>
                Primary
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Cards
