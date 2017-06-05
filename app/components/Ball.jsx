import React from 'react';
import { Rect } from 'react-konva';

import { constants as paddleDimensions } from './Paddle';

const size = 15;
const baseSpeed = { x: 17, y: 0 };
const maxSpeed = { x: 27, y: 14 };


function calculateInitialXPos(w) {
  return (w / 2) - size / 2;
}


function calculateInitialYPos(h) {
  return (h / 3) - size / 2;
}


function calculateBounceSpeed(collisionPoint) {
  const middle = paddleDimensions.height / 2;
  return maxSpeed.y * ((collisionPoint - middle) * 2 / 100);
}


class Ball extends React.Component {

  state = {
    xSpeed: baseSpeed.x,
    ySpeed: baseSpeed.y + 5,
    xBounced: false,
    yBounced: false,
    stop: false,
  };

  constructor(props) {
    super(props);
    this._loop = this._loop.bind(this);
    this._restart = this._restart.bind(this);
    this._resetBallBounce = this._resetBallBounce.bind(this);
    this._handleBorderBounce = this._handleBorderBounce.bind(this);
    this._handlePaddleCollisionDetection = this._handlePaddleCollisionDetection.bind(this);
  }

  componentWillMount() {
    const { windowHeight, windowWidth } = this.props;
    this.setState({
      x: calculateInitialXPos(windowWidth),
      y: calculateInitialYPos(windowHeight),
    });
  }

  componentDidMount() {
    this._loop();
  }

  render() {
    const { x, y, stop } = this.state;
    return (
      <Rect
        width={size}
        height={size}
        fill="white"
        x={x}
        y={y} />
    );
  }


  _loop() {
    this._handleBallScore();

    this._resetBallBounce();

    this._handleBorderBounce();

    this._handlePaddleCollisionDetection();

    this._handleMovement();

    requestAnimationFrame(this._loop);
  }

  _handleMovement() {
    const { gameRunning, gameStarted } = this.props;
    const { x, y, xSpeed, ySpeed, stop } = this.state;
    if (! stop && x && y && gameRunning && gameStarted) {
      this.setState({
        x: x + xSpeed,
        y: y + ySpeed,
      });
    }
  }

  _handleBallScore() {
    const { windowWidth, increaseScore, handleGameEnd } = this.props;
    const { x } = this.state;
    if (x >= windowWidth) {
      increaseScore(1);
      handleGameEnd();
      this._stop(-1);
    }
    else if (x < -size) {
      increaseScore(2);
      handleGameEnd();
      this._stop(1);
    }
  }

  _handlePaddleCollisionDetection() {
    const { windowWidth, windowHeight, rightPaddlePosition, leftPaddlePosition } = this.props;
    const { x, y, xSpeed, xBounced, yBounced } = this.state;
    // RIGHT PADDLE
    if (x + size + 5 >= windowWidth - paddleDimensions.width - paddleDimensions.x
      && y + size - 5 >= rightPaddlePosition
      && y + 5 <= rightPaddlePosition + paddleDimensions.height && ! xBounced) {
      const newYSpeed = calculateBounceSpeed(y - rightPaddlePosition);
      this.setState({
        xSpeed: -xSpeed,
        ySpeed: newYSpeed,
        xBounced: true,
      });
    }
    // LEFT PADDLE
    if (x - 5 <= paddleDimensions.width + paddleDimensions.x
        && y + size >= leftPaddlePosition
        && y <= leftPaddlePosition + paddleDimensions.height && ! xBounced) {
      const newYSpeed = calculateBounceSpeed(y - leftPaddlePosition);
      this.setState({
        xSpeed: -xSpeed,
        ySpeed: newYSpeed,
        xBounced: true,
      });
    }
  }

  _handleBorderBounce() {
    const { windowWidth, windowHeight } = this.props;
    const { x, y, xSpeed, ySpeed, xBounced, yBounced } = this.state;
    if ((y + size >= windowHeight && ! yBounced) || (y <= 0 && ! yBounced)) {
      this.setState({
        ySpeed: -ySpeed,
        yBounced: true,
      });
    }
  }

  _resetBallBounce() {
    const { windowWidth, windowHeight } = this.props;
    const { x, y, xSpeed, ySpeed, xBounced, yBounced } = this.state;
    // horizontal
    if ((x < windowWidth / 2 && xSpeed < 0 && xBounced) || (x > windowWidth / 2 && xSpeed > 0 && xBounced)) {
      this.setState({
        xBounced: false,
      });
    }
    // vertical
    if ((y < windowHeight / 2 && ySpeed < 0 && yBounced) || (y > windowHeight / 2 && ySpeed > 0 && yBounced)) {
      this.setState({
        yBounced: false,
      });
    }
  }

  _stop(side) {
    const { windowWidth, windowHeight, gameStarted } = this.props;
    this.setState({
      x: calculateInitialXPos(windowWidth),
      xSpeed: baseSpeed.x * side,
      xBounced: false,
      y: calculateInitialYPos(windowHeight),
      ySpeed: baseSpeed.y + 5,
      yBounced: false,
      stop: true,
    });
    setTimeout(this._restart, 300);
  }

  _restart() {
    this.setState({
      stop: false,
    });
  }
}


export default Ball;
