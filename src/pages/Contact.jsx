import React, { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material'
import { Email, Home, Phone } from '@mui/icons-material'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import XIcon from '@mui/icons-material/Twitter' // Adjusted to match Twitter's icon import
import FacebookIcon from '@mui/icons-material/Facebook'
import { useContactUs } from '../lib/react-query/queries'

const Contact = () => {
  const { mutateAsync: sendResume, isLoading: isLoadingResume } = useContactUs()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setError('All fields are required.')
      return
    }

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    }

    try {
      await sendResume(data)
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
      })
      setFormSubmitted(true)
    } catch (error) {
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <Box bgcolor='white' color='text.primary' py={3}>
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          ml={2}
        >
          <Typography variant='h4' color='primary'>
            Contact
          </Typography>
        </Box>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    href='mailto:cadhirajostwal@gmail.com'
                    color='primary'
                  >
                    <Email />
                  </IconButton>
                  <Box ml={2}>
                    <Typography variant='subtitle1'>Email</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Contact our team via email.
                    </Typography>
                    <Typography variant='body2' color='primary'>
                      cadhirajostwal@gmail.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    href='https://www.instagram.com/cadhirajostwal'
                    color='primary'
                    target='_blank'
                  >
                    <InstagramIcon />
                  </IconButton>
                  <Box ml={2}>
                    <Typography variant='subtitle1'>Instagram</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Follow us on Instagram for updates.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    href='https://www.youtube.com/@CADhirajOstwal'
                    color='primary'
                    target='_blank'
                  >
                    <YouTubeIcon />
                  </IconButton>
                  <Box ml={2}>
                    <Typography variant='subtitle1'>YouTube</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Check out our videos on YouTube.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    href='https://www.linkedin.com/in/cadhirajostwal'
                    color='primary'
                    target='_blank'
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <Box ml={2}>
                    <Typography variant='subtitle1'>LinkedIn</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Connect with us on LinkedIn.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    href='https://x.com/cadhirajostwal'
                    color='primary'
                    target='_blank'
                  >
                    <XIcon />
                  </IconButton>
                  <Box ml={2}>
                    <Typography variant='subtitle1'>X</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Follow us on Twitter for updates.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <IconButton
                    href='https://www.facebook.com/dhiraj.ostwal'
                    color='primary'
                    target='_blank'
                  >
                    <FacebookIcon />
                  </IconButton>
                  <Box ml={2}>
                    <Typography variant='subtitle1'>Facebook</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Connect with us on Facebook.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <Home color='primary' />
                  <Box ml={2}>
                    <Typography variant='subtitle1'>Office</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Come say hello at our office HQ.
                    </Typography>
                    <Typography variant='body2' color='primary'>
                      2nd Floor, Shree Krishna, 7, Opp Kiosk Koffee, Shirole
                      Road, off Fergusson College Road, Pune, Maharashtra 411004
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center'>
                  <Phone color='primary' />
                  <Box ml={2}>
                    <Typography variant='subtitle1'>Phone</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Mon-Fri from 8am to 5pm.
                    </Typography>
                    <Typography variant='body2' color='primary'>
                      +1 (555) 000-0000
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: 'grey.100' }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='First Name'
                      name='firstname'
                      placeholder='John'
                      variant='outlined'
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Last Name'
                      name='lastname'
                      placeholder='Doe'
                      variant='outlined'
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Email Address'
                      name='email'
                      placeholder='johndoe@example.com'
                      variant='outlined'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Phone Number'
                      name='phone'
                      placeholder='+91 888996633'
                      variant='outlined'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Message'
                      name='message'
                      placeholder='Message'
                      variant='outlined'
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  {error && (
                    <Grid item xs={12}>
                      <Typography color='error'>{error}</Typography>
                    </Grid>
                  )}
                  {formSubmitted && (
                    <Grid item xs={12}>
                      <Typography color='green'>
                        Message sent successfully!
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      size='large'
                      type='submit'
                      disabled={isLoadingResume}
                    >
                      {isLoadingResume ? 'Sending...' : 'Send message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Contact
