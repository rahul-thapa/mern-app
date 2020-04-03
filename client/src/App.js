import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// Redux
import {Provider} from "react-redux"
import store from './store'

/// Components
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from "./components/ItemModal"
import {Container} from "reactstrap"

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar/>
          <Container>
            <ItemModal/>
            <ShoppingList/>
          </Container>
        </div>
      </Provider>
    )
  }
}


export default App;
