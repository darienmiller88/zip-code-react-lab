import React, { Component } from 'react';
import './App.css';

function Zipcode(props) {
  return (
      <div className = "zipcode">
        <h3>{props.result}</h3>
      </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="user-input">
      <label>
        <b>
          City:
        </b>
      </label>
      <input type="text" name="search" onChange={(e) => {props.setCity(e.target.value)}} placeholder="Enter City"></input>
      <button onClick={ () => props.retrieveCity() }>Search</button>
    </div>
  );
}


class App extends Component {

  state = {
    results: [],
    city: "",
  }

  retrieveCity = async () => {
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`);
    if (response.ok) {
      const json = await response.json();
      this.setState({
        results : json,
      });
      console.log(this.result)
    } else {
      console.log("Error");
    }
  }

  //Function to set city
  setCity = (cityEntered) => {
    this.setState({
      city : cityEntered,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>

        <CitySearchField setCity = {this.setCity} retrieveCity = {this.retrieveCity} city = {this.city}/>
        <div>
          {
            this.state.results.map(e => <Zipcode result={e}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;