import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddMethodChunk from './components/AddMethodChunk'
import MethodChunk from './components/MethodChunk'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/ok" component={AddMethodChunk}/>
            <Route path="/method-chunks/:id" component={MethodChunk}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App