import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLink from './components/ImageLink/ImageLink';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log)
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

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className='particles'/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLink onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : (
              this.state.route === 'signin'
                ? <SignIn onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
