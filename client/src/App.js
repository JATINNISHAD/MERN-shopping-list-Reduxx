import React,{Component} from 'react';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <React.Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <Main/>
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
  
}

export default App;
