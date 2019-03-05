import React, { Component } from 'react';
import Search from "./Components/Search";

class App extends Component {
  render() {
    return (
      <div>
        <h1 id="header">Book Finder<i className="fa fa-book"></i></h1>
        <h3 id="googleapi">Powered By Google Books API</h3>
        <br/>
        <Search/>
      </div>
    );
  }
}

export default App;
