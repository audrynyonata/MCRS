import React, { Component } from "react";

class App extends Component {
  state = {
    data: [],
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
      .then(data => this.setState({ data: data }));
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.title}>
                  <span style={{ color: 'gray' }}> title: </span> {dat.title} <br />
                  <span style={{ color: 'gray' }}> content: </span>
                  {dat.content}
                </li>
              ))}
        </ul>
        </div>
    );
  }
}

export default App;