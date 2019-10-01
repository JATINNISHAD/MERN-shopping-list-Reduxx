import React,{useState,useContext} from 'react';
import {Collapse,Nav,Navbar,NavbarBrand,NavLink,NavbarToggler,NavItem,Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/login';
import Logout from '../auth/Logout';
import {shoppingContext} from '../../shoppingContext';
const NavbarComp =()=>{

    const [toggle,setToggle]=useState(false);
    
    const {isAuthenticated,user} = useContext(shoppingContext);
    const handleToggle=()=>{
        setToggle(!toggle);
    };
    const authLinks = (
        <React.Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{user?`Welcome ${user.name}`:''}</strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout/>
            </NavItem>
        </React.Fragment>
    );
    const guestLinks = (
        <React.Fragment>
            <NavItem>
                <RegisterModal/>
            </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>
        </React.Fragment>
    );

    return(
        <React.Fragment>
            
            <Navbar color="dark" dark expand="sm" className="mb-5" >
                <Container>
                    <NavbarBrand href="/" >shopping List</NavbarBrand>
                    <NavbarToggler onClick={handleToggle}/>
                    <Collapse isOpen={toggle} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated?authLinks:guestLinks}
                            <NavItem>
                                <NavLink href="https://www.github.com/jatinnishad" target="_blank" >Github</NavLink>
                            </NavItem> 
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default NavbarComp;