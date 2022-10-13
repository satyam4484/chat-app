import React from 'react'
import {Stack,NavDropdown} from "react-bootstrap";
const Header = ({user}) => {
  return (
    <Stack direction="horizontal" className='mt-3' gap={3}>
      <div class="avatar">
        <img src={user.profileImage} alt="avatar" width="100%" />
      </div>
      {/* <div> */}
        <h5 className='ms-auto'>{user.name}</h5>
        <NavDropdown
        id="nav-dropdown-dark-example"
        title={user.name}
        align="end"
        menuVariant="dark"
        className="ms-auto me-md-5"
      >
        {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
        
      </NavDropdown>
      {/* </div> */}
    </Stack>
  )
}

export default Header