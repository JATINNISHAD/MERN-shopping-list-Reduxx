import React,{Component} from 'react';
import {Container,ListGroupItem,Button,ListGroup} from 'reactstrap';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

import ItemModal from './layout/ModalComp';
import {connect} from 'react-redux';
import {getItems,deleteItem} from '../actions/itemActions';


class HomePage extends Component{
    
    static propTypes = {
        getItems:PropTypes.func.isRequired,
        item:PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = id =>{
        this.props.deleteItem(id);
    };
    

    render(){
        const { items } = this.props.item;
        return(
            <React.Fragment>
                <Container>
                    <ItemModal/>
                    <ListGroup>
                        <TransitionGroup className="shopping-list" >
                            {items.map(({_id,name})=>(
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {this.props.isAuthenticated?
                                        (<Button className="remove-btn mx-2"color="danger"size="sm"
                                        onClick={this.onDeleteClick.bind(this,_id)}
                                    >
                                        &times;
                                    </Button>):null}
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

const mapStateToProps = state =>({
    item:state.item,
    isAuthenticated:state.auth.isAuthenticated
});


export default connect(
    mapStateToProps,
    {getItems,deleteItem}
)(HomePage);