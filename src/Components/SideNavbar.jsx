import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SideNavbar.css'
import routes from '../Utils/Route'

function CustomSideNavbar() {
  return (
    <div className='custom-side-navbar'>
      <Nav defaultActiveKey='/dashboard' className='flex-column'>
        {routes.map((route, index) => (
          <Nav.Link as={Link} to={route.path} key={index} className='nav-link'>
            <img
              width='32'
              height='32'
              src={route.icon}
              style={{
                filter:
                  'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg)',
              }}
              alt='icon'
              className='nav-img'
            />
            <span className='custom-link-text'>{route.name}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  )
}

export default CustomSideNavbar
