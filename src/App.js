import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLink from './components/ImageLink/ImageLink';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
      imageUrl: '',
      box: {}
    }
  }

  faceLocation = (data) => {
    const face =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftColumn: face.left_col * width,
      topRow: face.top_row * height,
      rightColumn: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.faceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
