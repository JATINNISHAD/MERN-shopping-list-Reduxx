import React,{useContext,useState} from 'react';
import {shoppingContext} from '../../shoppingContext';
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';

const ModalComp=()=>{
    const [iname,setIname] =useState('');
    const {addItem} = useContext(shoppingContext);
    const [togval,setTogval] = useState(false);
    

    const handleToggle=()=>{
        setTogval(!togval);
    };
   
    const onChange=(e)=>{
        setIname(e.target.value);
    }
    const handleForm=(e)=>{
        e.preventDefault();
        const newItem = {name:iname};
        addItem(newItem)
        setIname('');
        setTogval(!togval);
        
    }
     
    return(
        <React.Fragment>
            <Button color="dark" onClick={handleToggle}>Add Item</Button>
            <hr/>
            <Modal isOpen={togval} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Add To List</ModalHeader>
                <ModalBody>
                    <Form  onSubmit={handleForm} >
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" value={iname} id="item" placeholder="Add your Item" onChange={onChange}/>
                            <Button color="dark" className="mx-auto" style={{margin:"2rem"}} block>Add</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

export default ModalComp;