import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signOutAction } from '../actions/authActions';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

class Menu extends Component {

    click = () => {
        this.props.signOutAction();
      }
    
    render() {

        const menudeslog = () => (
            <Nav className="mr-auto">
                <Nav.Link>
                    <Link to="/login">
                        Sign In
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/cadastro">
                        Sign Up
                    </Link>
                </Nav.Link>
            </Nav>
        )

        const menuLog = () => (
            <Nav className="mr-auto">
                <NavDropdown title="Lists" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        <Link to="/dashboard">
                            Minhas Listas
                        </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to="/lista">
                            Create List
                        </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link>
                    <Button onClick={() => this.click()}>Logout</Button>
                </Nav.Link>
            </Nav>
        )
        
        const {authenticated} = this.props.auth
       
        return(

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Minha Lista</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        
                    {authenticated ? menuLog() : menudeslog()}
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>

        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, {signOutAction})(Menu);
