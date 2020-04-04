import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import { authentication } from "../../actions/index.js";
import { store } from "../../store/store.js";




const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Jerk N' Squirt</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <Link className="nav-link" to="/">Homepage</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/purchase/tokens">Purchase Tokens</Link>
            </NavItem>

    
         	{props.authenticated ? <NavItem>
              <Link className="nav-link" to="/streams/create">Broadcast Yourself</Link>
            </NavItem> : null}
            <NavItem className="link">
              <Link className="nav-link" to="/profiles">Profiles/Buy-Content</Link>
            </NavItem>
          </Nav>
          	{props.authenticated ? null : <NavItem className="link">
              <Link className="btn btn-outline-info" to="/login">Sign-in</Link>
            </NavItem>}
            
            {props.authenticated ? <NavItem className="link">
              <button onClick={() => {
              	props.authentication({});
              }} className="btn btn-outline-danger" to="/register">Sign-Out</button>
            </NavItem> : <NavItem className="link">
              <Link className="btn btn-outline-success" to="/register">Sign Up</Link>
            </NavItem>}
            {props.authenticated ? <NavItem className="link">
              <Link className="btn btn-outline pink_button" to="/signup/camming/one">Become A Cammer!</Link>
            </NavItem> : null}

            {props.authenticated ? <NavbarText>{store.getState().auth.data.username}, You have (88) tokens</NavbarText> : null}
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
	console.log("State :", state);
	return {
		authenticated: state.auth.data.email
	}
}

export default connect(mapStateToProps, { authentication })(Navigation);