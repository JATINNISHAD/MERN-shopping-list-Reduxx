import React,{useContext} from 'react';
import {shoppingContext} from '../shoppingContext';
import {Container,ListGroupItem,Button,ListGroup} from 'reactstrap';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import ModalComp from './layout/ModalComp';

const HomePage = ()=>{
    const {items,deleteItem,isLoading,isAuthenticated} = useContext(shoppingContext);
    if(isLoading){
        return(
            <div className="jumbotron text-center">
                <h1>fetching data....</h1>
            </div>
        );
    }else{
        return(
            <React.Fragment>
                <Container>
                    {(isAuthenticated?<ModalComp/>:null)}
                    <ListGroup>
                        <TransitionGroup className="shopping-list" >
                            {console.log(items)}
                            {items.map(({_id,name})=>(
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {(isAuthenticated)?
                                        <Button className="remove-btn mx-2"color="danger"size="sm"
                                        onClick={()=>deleteItem(_id)}
                                    >
                                        &times;
                                    </Button>:null}
                                        {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                </Container>
            </React.Fragment>
        );
    }
}

export default HomePage;