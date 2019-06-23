import React, { Component } from "react";
import MethodChunkList from "./components/MethodChunkList"
import AddMethodChunk from "./components/AddMethodChunk"

class App extends Component {
  state = {
    methodChunks: [],
    intervalIsSet: false
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:4000/method-chunks')
      .then(res => res.json())
      .then(data => this.setState({ methodChunks: data }));
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { methodChunks } = this.state;
    return (
      <div>
        <AddMethodChunk/>
        {methodChunks.length <= 0
          ? 'NO DB ENTRIES YET'
          : <MethodChunkList methodChunks={methodChunks}/>
        }
      </div>
    );
  }
}

export default App;