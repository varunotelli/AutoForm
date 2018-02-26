import React, { Component } from 'react';
import './App.css';
import ZForm from './components/ZForm';
import ZResponse from './components/ZResponse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link:""
    }
    this.setLink = this.setLink.bind(this);
  }

  setLink(val) {
    console.log("setLInk called")
    this.setState({
      link:val
    })
  }

  render() {
    return (
      <div className="App">
        {(this.state.link.length > 10)? (<ZResponse passedLink={this.state.link}/>):(<ZForm passLink={this.setLink} />)}
      </div>
    );
  }
}

export default App;
