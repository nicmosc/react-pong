import React from 'react';
import { Rect } from 'react-konva';


const dimensions = {
  width: 13,
  height: 100,
  x: 10,
}


function calculateYPos(wHeight) {
  return (wHeight / 2) - (dimensions.height / 2);
}


function calculateXPos(wWidth, right) {
  return right ? wWidth - dimensions.width - dimensions.x : dimensions.x;
}


class Paddle extends React.Component {

  state = {
    up: false,
    down: false,
  };

  constructor(props) {
    super(props);
    this._loop = this._loop.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
  }

  componentDidMount() {
    const { windowHeight } = this.props;
    this.setState({
      y: calculateYPos(windowHeight),
    });
    console.log(this.state);
    document.addEventListener("keydown", this._handleKeyDown, false);
    document.addEventListener("keyup", this._handleKeyUp, false);
    this._loop();
  }

  render() {
    const { windowHeight, windowWidth, right } = this.props;
    const { width, height, x } = dimensions;
    const { y } = this.state;
    return (
      <Rect
        width={width}
        height={height}
        fill={"white"}
        x={calculateXPos(windowWidth, right)}
        y={y}
      />
    );
  }

  _loop() {
    if (this.state.up && this.state.y < (this.props.windowHeight - dimensions.height)) {
      this.setState({
        y: this.state.y + 10,
      });
    }
    else if (this.state.down && this.state.y > 0) {
      this.setState({
        y: this.state.y - 10,
      });
    }
    requestAnimationFrame( this._loop );
  }

  _handleKeyDown(event) {
    if (this.props.right) {
      if (event.keyCode === 40) {
        this.setState({
          up: true,
        });
      }
      else if (event.keyCode === 38) {
        this.setState({
          down: true,
        });
      }
    }
    else {
      if (event.keyCode === 65) {
        this.setState({
          up: true,
        });
      }
      else if (event.keyCode === 81) {
        this.setState({
          down: true,
        });
      }
    }
  }

  _handleKeyUp(event) {
    if (this.props.right) {
      if (event.keyCode === 40 && this.state.up) {
        this.setState({
          up: false,
        });
      }
      else if (event.keyCode === 38 && this.state.down) {
        this.setState({
          down: false,
        });
      }
    }
    else {
      if (event.keyCode === 65 && this.state.up) {
        this.setState({
          up: false,
        });
      }
      else if (event.keyCode === 81 && this.state.down) {
        this.setState({
          down: false,
        });
      }
    }
  }
}


export default Paddle;
