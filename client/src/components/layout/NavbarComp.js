import React,{useState} from 'react';
import {Collapse,Nav,Navbar,NavbarBrand,NavLink,NavbarToggler,NavItem,Container} from 'reactstrap';
import {Link} from 'react-router-dom';

const NavbarComp =()=>{
    const [toggle,setToggle]=useState(false);
    const handleToggle=()=>{
        setToggle(!toggle);
    }

    return(
        <React.Fragment>
            
            <Navbar color="dark" dark expand="sm" className="mb-5" >
                <Container>
                    <NavbarBrand href="/" >shopping List</NavbarBrand>
                    <NavbarToggler onClick={handleToggle}/>
                    <Collapse isOpen={toggle} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/" className="nav-link" >
                                Home
                                </Link>
                            </NavItem>
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