import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';

export const shoppingContext = createContext();

export const ShopContextProvider=({children})=>{
    const [items,setItems] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    
    const getItems=()=>{
        setIsLoading(true);
        axios.get('/api/items')
        .then(res=>setItems(res.data));
        setIsLoading(false);
    }
    const addItem=(item)=>{
        axios.post('/api/items',item)
        .then((res)=>setItems([res.data,...items]));
    }


    const deleteItem=id=>{
        axios.delete(`/api/items/${id}`)
        .then(res=>setItems(items.filter(item=>item._id !== id)));
    }
    //setItems(items.filter(item=>item._id !== res.data._id))
    
    useEffect(()=>{
        getItems();
    },[]);
    return(
        <shoppingContext.Provider value={{
            items,
            setItems,
            addItem,
            deleteItem,
            isLoading,
        }
        }>
            {children}
        </shoppingContext.Provider>
    );
}