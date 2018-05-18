import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLink from './components/ImageLink/ImageLink';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
 apiKey: 'ec6cbdadc3b14481a4fd94d91b9c7ae5'
});

const particleOptions = {
  particles: {
  number: {
    value: 150,
    density: {
      enable: true,
      value_area: 800
    }
  },
  line_linked: {
    enable: true,
    distance: 150,
    color: "#ffffff",
    opacity: 0.4,
    width: 1
  },
  "shape": {
    "type": "circle",
    "stroke": {
      "width": 0,
      "color": "#000000"
    }
  }
 }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmitButton = () => {
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
