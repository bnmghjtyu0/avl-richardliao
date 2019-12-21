import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavbarContainer = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [googleUser] = React.useState(() =>
    JSON.parse(localStorage.getItem('googleUser'))
  )
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  console.log(googleUser)
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Link to="/" className="text-dark">App</Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem className="ml-2">
            <Link to="/about">About</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {googleUser &&
            <NavItem className="ml-2 d-flex align-items-center">
              <img className="img-fluid mr-1" style={{ width: 18 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" />
              {googleUser.name}
            </NavItem>
          }

        </Nav>


        <button
          className="btn btn-sm"
          onClick={() => {
            dispatch({ type: "LOGOUT" });

            history.push("/login");
          }}
        >
          登出
        </button>
      </Collapse>
    </Navbar>
  );
};

export default NavbarContainer;
