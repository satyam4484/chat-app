import React from "react";
import { Dropdown } from "react-bootstrap";
import dots from "../../media/dots.png";

const DropDown = ({ children }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
        <div className="ms-auto dots">
        <img src={dots} alt="dots" />

        </div>
      </Dropdown.Toggle>

      {children}
    </Dropdown>
  );
};


export default DropDown;