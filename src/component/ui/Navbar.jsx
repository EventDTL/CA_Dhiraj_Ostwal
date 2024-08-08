import React, { useState ,useRef,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import ServiceData from '../../pages/services/ServiceData'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MenuIcon from '@mui/icons-material/Menu'
import InstagramIcon from '@mui/icons-material/Instagram'
import MailIcon from '@mui/icons-material/Mail'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import logo from './assets/CALOGO.png'
import './navbar.css'
import { useGetAllServices } from '../../lib/react-query/queries'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const dropdownRef = useRef(null);

    const {
    data: servicesData,
    isLoading: isLoadingService,
    error,
    refetch,
  } = useGetAllServices()


  const [open, setOpen] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const [showInsightsDropdown, setShowInsightsDropdown] = useState(false)
  const theme = useTheme()

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const toggleServicesDropdown = () => {
    setShowServicesDropdown((prev) => !prev)
    if (showInsightsDropdown) {
      setShowInsightsDropdown(false)
    }
  }

  const toggleInsightsDropdown = () => {
    setShowInsightsDropdown((prev) => !prev)
    if (showServicesDropdown) {
      setShowServicesDropdown(false)
    }   
  }

 const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowServicesDropdown(false);
      setShowInsightsDropdown(false);
    }
  };

  const handleScroll = () => {
    setShowServicesDropdown(false);
    setShowInsightsDropdown(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowServicesDropdown(false);
    setShowInsightsDropdown(false);
  }, [location]);

  const [openServices, setOpenServices] = React.useState(false)
  const [openInsights, setOpenInsights] = React.useState(false)

  const handleToggleServices = () => {
    setOpenServices(!openServices)
  }

  const handleToggleInsights = () => {
    setOpenInsights(!openInsights)
  }

  const DrawerList = (
    <Box sx={{ width: '50vw' }} role='presentation'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            paddingRight: '40px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              height: '5rem',
              paddingLeft: '40px',
              '@media (max-width:600px)': {
                paddingLeft: '20px',
              },
            }}
            onClick={handleToggleServices}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  '@media (max-width:600px)': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            >
              Services
            </ListItemText>
            <ListItemIcon>
              <KeyboardArrowDownIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Collapse in={openServices} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/taxservices`)}
              >
                <ListItemText primary="Tax Services" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/comforReg`)}
              >
                <ListItemText primary="Company Formation and Registration" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/auditServices`)}
              >
                <ListItemText primary="Audit Services" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/drafAgree`)}
              >
                <ListItemText primary="Drafting and Agreement" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/appLiti`)}
              >
                <ListItemText primary="Appeals and Litigations" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/advi`)}
              >
                <ListItemText primary="Advisory Services" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => navigate(`/services/other`)}
              >
                <ListItemText primary="Other Services" />
              </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              height: '5rem',
              paddingLeft: '40px',
              '@media (max-width:600px)': {
                paddingLeft: '20px',
              },
            }}
            onClick={handleToggleInsights}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  '@media (max-width:600px)': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            >
              Insights
            </ListItemText>
            <ListItemIcon>
              <KeyboardArrowDownIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Collapse in={openInsights} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton
              sx={{
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}
              onClick={() => navigate('/insights/Achievements')}
            >
              <ListItemText primary='Achievements' />
            </ListItemButton>
            <ListItemButton
              sx={{
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}
              onClick={() => navigate('/insights/Profile')}
            >
              <ListItemText primary='Profile' />
            </ListItemButton>
            <ListItemButton
              sx={{
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}
              onClick={() => navigate('/insights/News&Blogs')}
            >
              <ListItemText primary='News' />
            </ListItemButton>

          </List>
        </Collapse>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              height: '5rem',
              paddingLeft: '40px',
              '@media (max-width:600px)': {
                paddingLeft: '20px',
              },
            }}
            onClick={() => navigate('/career')}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  '@media (max-width:600px)': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            >
              Career
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              height: '5rem',
              paddingLeft: '40px',
              '@media (max-width:600px)': {
                paddingLeft: '20px',
              },
            }}
            onClick={() => navigate('/gallary')}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  '@media (max-width:600px)': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            >
              Gallary
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              height: '5rem',
              paddingLeft: '40px',
              '@media (max-width:600px)': {
                paddingLeft: '20px',
              },
            }}
            onClick={() => navigate('/contact')}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  '@media (max-width:600px)': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            >
              Contact
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  
  if (isLoadingService) {
    return <div style={{ color: 'white' }}>Loading...</div>
  }
  return (
    <div className='nav2'>
      <div className='nav2-left'>
        <img src={logo} alt='logo' className='nav2-logo' />
      </div>
      <div className='nav2-right'>
        <div className='nav2-icons'>
          <IconButton
            href='https://www.facebook.com/cadhirajostwal'
            target='_blank'
            aria-label='Facebook'
            sx={{ color: 'black' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href='https://www.linkedin.com/in/event-dtl-191997314/'
            target='_blank'
            aria-label='LinkedIn'
            sx={{ color: 'black' }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            href='https://www.instagram.com/cadhirajostwal/'
            target='_blank'
            aria-label='Instagram'
            sx={{ color: 'black' }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href='https://www.youtube.com'
            target='_blank'
            aria-label='YouTube'
            sx={{ color: 'black' }}
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            href='mailto:info@example.com'
            aria-label='Email'
            sx={{ color: 'black' }}
          >
            <MailIcon />
          </IconButton>
        </div>
        <div className='nav2-cont'>
          <button className='nav2-title' onClick={() => navigate('/')}>
            Home
          </button>
          <button className='nav2-title' onClick={toggleServicesDropdown}>
            <span
              className='ser'
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              Services
              {showServicesDropdown ? (
                <KeyboardArrowUpIcon sx={{ paddingLeft: '2px' }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ paddingLeft: '2px' }} />
              )}
            </span>
          </button>
          {showServicesDropdown && (
            <div className='dropdownService'>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/taxservices`);
                    toggleServicesDropdown();
                 }}
                >
                  Tax Services
                </button>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/comforReg`);
                    toggleServicesDropdown();
                 }}
                >
                  Company Formation and Registration
                </button>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/auditServices`);
                    toggleServicesDropdown();
                 }}
                >
                  Audit Services
                </button>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/drafAgree`);
                    toggleServicesDropdown();
                 }}
                >
                  Drafting and Agreements
                </button>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/appLiti`);
                    toggleServicesDropdown();
                 }}
                >
                  Appeals and Litigations
                </button>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/advi`);
                    toggleServicesDropdown();
                 }}
                >
                  Advisory Services
                </button>
                <button
                  className='dropdown-item'
                    onClick={() => {
                    navigate(`/services/other`);
                    toggleServicesDropdown();
                 }}
                >
                  Other Services
                </button>
            </div>
          )}
          <button className='nav2-title' onClick={toggleInsightsDropdown}>
            <span
              className='ins'
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              Insights
              {showInsightsDropdown ? (
                <KeyboardArrowUpIcon sx={{ paddingLeft: '2px' }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ paddingLeft: '2px' }} />
              )}
            </span>
          </button>
          {showInsightsDropdown && (
            <div className='dropdownInsights'>
              <button
                className='dropdown-item'
                onClick={() =>{ navigate('/MainAchieve');toggleInsightsDropdown();}}
              >
                Achievements
              </button>
              <button
                className='dropdown-item'
                onClick={() =>{ navigate('/Profile '); toggleInsightsDropdown();}}
              >
                Profile
              </button>
              <button
                className='dropdown-item'
                onClick={() =>{ navigate('/NewsBlogs'); toggleInsightsDropdown();}}
              >
                News
              </button>
               <button
                className='dropdown-item'
                onClick={() => navigate('/reviews')}
              >
                Reviews
              </button> 
            </div>
          )}
          <button className='nav2-title' onClick={() => navigate('/career')}>
            Career
          </button>
          <button className='nav2-title' onClick={() => navigate('/Gallary')}>
            Gallary
          </button>
          <button className='nav2-title' onClick={() => navigate('/contact')}>
            Contact
          </button>
            <button
            className='nav2-title'
            onClick={() => navigate('/sign-in')}
          >
            Signin
          </button>
        </div>
        <div className='menu'>
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: 'black', fontSize: '3rem' }} />
          </Button>
        </div>
        <Drawer
          sx={{ marginTop: '4rem', height: `calc(100% - 4rem)` }}
          anchor='right'
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
      </div>
    </div>
  )
}

export default Navbar