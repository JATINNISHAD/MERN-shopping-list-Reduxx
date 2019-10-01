import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';

export const shoppingContext = createContext();

export const ShopContextProvider=({children})=>{
    
    const [items,setItems] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const [token,setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const [user,setUser] = useState(null);
    const [msg,setMsg] = useState({});
    const [status,setStatus] = useState(null);
    const [id,setId] = useState(null);

    //items
    const getItems=()=>{
        setIsLoading(true);
        axios.get('/api/items')
        .then(res=>setItems(res.data));
        setIsLoading(false);
    }
    
    const addItem=(item)=>{
        axios.post('/api/items',item,tokenConfig(token))
        .then((res)=>setItems([res.data,...items]));
    }

    const deleteItem=id=>{
        axios.delete(`/api/items/${id}`,tokenConfig(token))
        .then(res=>setItems(items.filter(item=>item._id !== id)));
    }
    
    //authentication


    const USER_LOADING=()=>{
        setIsLoading(true);
    }

    const USER_LOADED=(userinfo)=>{
        setIsAuthenticated(true);
        setUser(userinfo);   
        setIsLoading(false);
    }

    //REGISTER SUCCESS,LOGIN SUCCESS 
    const REGISTER_LOGIN_SUCCESS=(tokval)=>{
        localStorage.setItem('token',tokval);
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    const AUTH_LOGINOUT_REGISTER_ERROR=()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false)
    }

    //GET ERRORS
    const GET_ERRORS=(msg,status,id=null)=>{
        setMsg(msg);
        setStatus(status);
        setId(id);
    }

    //CLEAR ERRORS
    const CLEAR_ERRORS=()=>{
        setMsg({});
        setStatus(null);
        setId(null);
    }

    //LOAD USER
    const loadUser=()=>{
        USER_LOADING();
        axios.get('/api/auth/user',tokenConfig(token))
        .then(res=>{
            USER_LOADED(res.data);
        })
        .catch(err=>{
            GET_ERRORS(err.response.data,err.response.status);
            AUTH_LOGINOUT_REGISTER_ERROR();
        })
    }

    //REGISTER USER
    const register=(name,email,password)=>{
        const config={
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        const body = JSON.stringify({name,email,password});
        axios.post('/api/users',body,config)
        .then(res=>{
            REGISTER_LOGIN_SUCCESS(res.data.token);
            USER_LOADED(res.data.user)
        })
        .catch(err=>{
            GET_ERRORS(err.response.data,err.response.status,'REGISTER_FAIL')
        })
    }

    //LOGIN USER
    const Login = (email,password)=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({email,password});
        axios.post('/api/auth',body,config)
        .then(res=>{
            REGISTER_LOGIN_SUCCESS(res.data.token);
            USER_LOADED(res.data.user)
        })
        .catch(err=>{
            GET_ERRORS(err.response.data,err.response.status,'LOGIN_FAIL');
            AUTH_LOGINOUT_REGISTER_ERROR();
        });
    }

    // LOGOUT
    const logout=()=>{
        AUTH_LOGINOUT_REGISTER_ERROR();
    }

    //TOKEN CONFIG
    const tokenConfig = (token)=>{
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        };
        if(token){
            config.headers['x-auth-token'] = token;
        }
        return config;
    };
    
    useEffect(()=>{
        getItems();
    },[]);

    useEffect(()=>{
        loadUser();
    },[]);
    
    return(
        <shoppingContext.Provider value={{
            isLoading,
            user,
            msg,
            status,
            id,
            items,
            setItems,
            isAuthenticated,
            CLEAR_ERRORS,
            addItem,
            deleteItem,
            USER_LOADING,
            USER_LOADED,
            REGISTER_LOGIN_SUCCESS,
            AUTH_LOGINOUT_REGISTER_ERROR,
            CLEAR_ERRORS,
            GET_ERRORS,
            register,
            Login,
            logout
        }}>
            {children}
        </shoppingContext.Provider>
    );
}
