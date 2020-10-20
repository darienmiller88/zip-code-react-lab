import React, { Component } from 'react';
import './App.css';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

function City(props) {
  return (
    <Card className = "city">
      <CardHeader>{props.result.City}, {props.result.State}</CardHeader>
      <CardBody>
        <CardText>
          <ul>
            <li>State: {props.result.State}</li>
            <li>Location: ({props.result.Lat}, {props.result.Long})</li>
            <li>Population (estimated): {props.result.EstimatedPopulation}</li>
            <li>Total Wages: ${props.result.TotalWages}</li>
          </ul>     
        </CardText>
      </CardBody>
    </Card>
  );
}

function ZipSearchField(props) {
  return (
    <div className="user-input">
      <label>
        <b>
          Zip Code:
        </b>
      </label>
      <input type="text" name="search" onChange={(e) => {props.setZip(e.target.value)}} placeholder="Enter Zipcode"></input>
      <button onClick={ () => props.retrieveZipCode() }>Search</button>
    </div>
  );
}


class App extends Component {

  state = {
    results: [],
    zip: ""
  }

  retrieveZipCode = async () => {
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`);
    if (response.ok) {
      const json = await response.json();
      this.setState({
        results : json,
      });
    } else {
      console.log("Error");
    }
  }

  //Function to set zipcode
  setZip = (zipcode) => {
    this.setState({
      zip : zipcode,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>

        <ZipSearchField setZip = {this.setZip} retrieveZipCode = {this.retrieveZipCode}/>
        <div>
          {
            this.state.results.map(e => <City result={e}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;