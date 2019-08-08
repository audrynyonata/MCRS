import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Publish from "./components/Publish";
import Find from "./components/Find";
import Providers from "./components/Providers";
import MethodChunks from "./components/MethodChunks";
import ProviderItem from "./components/ProviderItem";
import Characteristics from "./components/Characteristics";
import NotFound from "./components/NotFound";
import history from "./history";

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
    );
  }
}

export default App;
