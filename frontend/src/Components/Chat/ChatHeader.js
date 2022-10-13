import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Stack,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { useGlobalContext } from "../../context";
import dots from "../../media/dots.png";

const ChatHeader = () => {
  const { user, logoutUser } = useGlobalContext();
  const friends = user.friends;
  return (
    <Stack direction="horizontal" gap={3}>
      <div class="avatar">
        <img src={user.profileImage} alt="avatar" width="100%" />
      </div>

      <NavDropdown
        id="nav-dropdown-dark-example"
        title={user.username}
        align="end"
        menuVariant="dark"
        className="ms-auto me-md-5"
      >
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Item href="/" onClick={() => logoutUser()}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
      {/* <div className="ms-auto dots">
                        <img src={dots} alt="dots"/>

                    </div> */}
      {/* <div className="bg-light border">Third item</div> */}
    </Stack>
  );
};

export default ChatHeader;
