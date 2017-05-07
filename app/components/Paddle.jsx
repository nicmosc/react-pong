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
    key: null,
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
    document.addEventListener("keydown", this._handleKeyDown, false);
    document.addEventListener("keyup", this._handleKeyUp, false);
    this._loop();
  }

  componentWillUnmount() {
    this._stopLoop();
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
    if (this.state.key === 'up') {
      this.setState({
        y: this.state.y + 10,
      });
    }
    if (this.state.key === 'down') {
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
          key: 'up',
        });
      }
      else if (event.keyCode === 38) {
        this.setState({
          key: 'down',
        });
      }
    }
    else {
      if (event.keyCode === 65) {
        this.setState({
          key: 'up',
        });
      }
      else if (event.keyCode === 81) {
        this.setState({
          key: 'down',
        });
      }
    }
  }

  _handleKeyUp(event) {
    if (this.props.right) {
      if ((event.keyCode === 40 || event.keyCode === 38) && this.state.key) {
        this.setState({
          key: null,
        });
      }
    }
    else {
      if ((event.keyCode === 65 || event.keyCode === 81) && this.state.key) {
        this.setState({
          key: null,
        });
      }
    }
  }

  _stopLoop() {
    cancelAnimationFrame( this._frameId );
  }
}


export default Paddle;
