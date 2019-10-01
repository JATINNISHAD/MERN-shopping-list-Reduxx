import React,{useContext} from 'react';
import {NavLink} from 'reactstrap';
import {shoppingContext} from '../../shoppingContext';

const Logout = ()=>{
    const {logout} = useContext(shoppingContext);
    return(
        <React.Fragment>
            <NavLink onClick={logout} href="#">
                Logout
            </NavLink>
        </React.Fragment>
    );
}
export default Logout;