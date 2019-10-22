import React from 'react';
import NavbarComp from './layout/NavbarComp';
import HomePage from './homepage';
import NotFound from './notFound';
import {Route,Switch} from 'react-router-dom';
const Main =()=>{
    return(
        <React.Fragment>
            <NavbarComp/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
}

export default Main;