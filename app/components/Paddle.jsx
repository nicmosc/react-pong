import React from 'react';
import { Rect } from 'react-konva';


export const constants = {
  width: 13,
  height: 100,
  x: 10,
  speed: 10,
}


function calculateYPos(wHeight) {
  return (wHeight / 2) - (constants.height / 2);
}


function calculateXPos(wWidth, right) {
  return right ? wWidth - constants.width - constants.x : constants.x;
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
    const { windowHeight, y, update } = this.props;
    update(calculateYPos(windowHeight));
    document.addEventListener("keydown", this._handleKeyDown, false);
    document.addEventListener("keyup", this._handleKeyUp, false);
    this._loop();
  }

  render() {
    const { windowHeight, windowWidth, right, y } = this.props;
    const { width, height, x } = constants;
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
    const { up, down } = this.state;
    const { windowHeight, update, y, gameRunning } = this.props;
    if (gameRunning) {
      if (up && y < (windowHeight - constants.height)) {
        update(y + constants.speed);
      }
      else if (down && y > 0) {
        update(y - constants.speed);
      }
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
    const { up, down } = this.state;
    if (this.props.right) {
      if (event.keyCode === 40 && up) {
        this.setState({
          up: false,
        });
      }
      else if (event.keyCode === 38 && down) {
        this.setState({
          down: false,
        });
      }
    }
    else {
      if (event.keyCode === 65 && up) {
        this.setState({
          up: false,
        });
      }
      else if (event.keyCode === 81 && down) {
        this.setState({
          down: false,
        });
      }
    }
  }
}


export default Paddle;
