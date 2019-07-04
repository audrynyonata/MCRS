import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Publish from './pages/Publish'
import Find from './pages/Find'
import Providers from './pages/Providers'
import MethodChunks from './pages/MethodChunks'
import ProviderItem from './pages/ProviderItem'
import Characteristics from './pages/Characteristics'
import NotFound from './pages/NotFound'
import history from './history';

class App extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/publish" component={Publish} />
            <Route path="/find" component={Find} />
            <Route exact path="/providers" component={Providers} />
            <Route path="/providers/:id" component={ProviderItem} />
            <Route path="/method-chunks/" component={MethodChunks} />
            <Route path="/characteristics/" component={Characteristics} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App