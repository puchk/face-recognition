import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLink from './components/ImageLink/ImageLink';
import Particles from 'react-particles-js';

import './App.css';

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
  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
