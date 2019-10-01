import React,{useContext,useState} from 'react';
import {shoppingContext} from '../../shoppingContext';
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,NavLink,Alert} from 'reactstrap';

const LoginModal=()=>{
    const [togval,setTogval] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const {Login,msg} = useContext(shoppingContext); 

    const handleToggle=()=>{
        setTogval(!togval);
    };
    const handleForm=(e)=>{
        e.preventDefault();
        Login(email,password);
        handleToggle();
        setEmail('');
        setPassword('');
    }
     
    return(
        <React.Fragment>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>
            <Modal isOpen={togval} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {/* {
                        msg?(<Alert color="danger">{msg}</Alert>):null
                    } */}
                    <Form  onSubmit={handleForm} >
                        <FormGroup>
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
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

export default LoginModal;