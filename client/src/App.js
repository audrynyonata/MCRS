import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MethodChunk from './components/MethodChunk'
import Header from './components/Header'
import Home from './pages/Home'
import Find from './pages/Find'
import Characteristic from './pages/Characteristic'
import NotFound from './pages/NotFound'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/find" component={Find} />
            <Route path="/method-chunks/:id" component={MethodChunk} />
            <Route path="/characteristics/" component={Characteristic} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App