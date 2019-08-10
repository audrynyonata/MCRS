import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Find from "./components/Find";
import FindResult from "./components/FindResult";
import Providers from "./components/Providers";
import MethodChunks from "./components/MethodChunks";
import MethodChunkForm from "./components/MethodChunkForm";
import Projects from "./components/Projects";
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
            <Route path="/publish" component={MethodChunkForm} />
            <Route exact path="/find" component={Find} />
            <Route exact path="/find/:provider/:project" component={FindResult} />
            <Route exact path="/providers" component={Providers} />
            <Route path="/providers/:id" component={ProviderItem} />
            <Route exact path="/method-chunks/" component={MethodChunks} />
            <Route path="/method-chunks/:id/edit" component={MethodChunkForm} />
            <Route path="/characteristics/" component={Characteristics} />
            <Route path="/projects/" component={Projects} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
