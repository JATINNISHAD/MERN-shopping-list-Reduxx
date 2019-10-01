import React,{useContext,useState,useEffect} from 'react';
import {shoppingContext} from '../../shoppingContext';
import PropTypes from 'prop-types';
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,NavLink,Alert} from 'reactstrap';

const RegisterModal=()=>{
    const {register,msg} = useContext(shoppingContext)
    const [iname,setName] =useState('');
    const [togval,setTogval] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    
    const handleToggle=()=>{
        setTogval(!togval);
    };
   
    const handleForm=(e)=>{
        e.preventDefault();
        register(iname,email,password);
        handleToggle();
        setName('');
        setEmail('');
        setPassword('');
    }
     
    return(
        <React.Fragment>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>
            <Modal isOpen={togval} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {/* {
                        msg?(<Alert color="danger">{msg}</Alert>):null
                    } */}
                    <Form  onSubmit={handleForm} >
                        <FormGroup>
                            <Label for="iname">Name</Label>
                            <Input type="text" name="iname" 
                                value={iname} id="iname" 
                                placeholder="Enter Name" 
                                onChange={e=>setName(e.target.value)}
                            />
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" 
                                value={email} id="email" 
                                placeholder="Enter Email" 
                                onChange={e=>setEmail(e.target.value)}
                            />
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" 
                                value={password} id="password" 
                                placeholder="Enter Password" 
                                onChange={e=>setPassword(e.target.value)}
                            />
                            <Button color="dark" 
                                className="mx-auto" 
                                style={{margin:"2rem"}} 
                                block
                            >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

export default RegisterModal;