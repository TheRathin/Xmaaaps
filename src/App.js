import React, { Component } from 'react';
import './App.css';

//Loading part
import NavigationBar from './part/NavigationBar'
import Footer from './part/Footer'

//Loading components
import AppBody from './AppBody'

class App extends Component {
  render() {
    return (
     <div>
      <NavigationBar/>
      <AppBody/>
      <Footer/>
      </div>
    )
  }
}

export default App
