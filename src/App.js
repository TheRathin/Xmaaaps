import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UploadLocation from './part/UploadLocation'
import './App.css'

import NavigationBar from './part/style/NavigationBar'
import About from './page/About'
import Feedback from './page/Feedback'
import Whoops404 from './part/Whoops404'
import Footer from './part/style/Footer'


//Loading components
import AppBody from './AppBody'

class App extends Component {
  render() {
    return (
    <Router>
     <div>
      <NavigationBar/>
      <Switch>
        <Route exact path="/" component={AppBody}/>
        <Route path="/upload" component={UploadLocation}/>
        <Route path="/about" component={About}/>
        <Route path="/feedback" component={Feedback} />
        <Route component={Whoops404} />
      </Switch>
      <Footer/>
      </div>
    </Router>
    )
  }
}

export default App
