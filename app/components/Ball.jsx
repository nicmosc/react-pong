import React from 'react';
import { Rect } from 'react-konva';

import { constants as paddleDimensions } from './Paddle';

const size = 15;


function calculateInitialPos(hw) {
  return (hw / 2) - size / 2;
}


class Ball extends React.Component {

  state = {
    ySpeed: 10,
    xSpeed: 10,
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
      x: calculateInitialPos(windowWidth),
      y: calculateInitialPos(windowHeight),
    });
  }

  componentDidMount() {
    this._loop();
  }

  render() {
    const { x, y } = this.state;
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
    const { gameRunning } = this.props;
    const { x, y, xSpeed, ySpeed, stop } = this.state;
    if (! stop && x && y && gameRunning) {
      this.setState({
        x: x + xSpeed,
        y: y + ySpeed,
      });
    }
  }

  _handleBallScore() {
    const { windowWidth } = this.props;
    const { x } = this.state;
    if (x >= windowWidth || x < -size) {
      this._stop();
    }
  }

  _handlePaddleCollisionDetection() {
    const { windowWidth, windowHeight, rightPaddlePosition, leftPaddlePosition } = this.props;
    const { x, y, xSpeed, xBounced, yBounced } = this.state;
    // RIGHT PADDLE
    if (x + size + 10 >= windowWidth - paddleDimensions.width - paddleDimensions.x
      && y + size - 10 >= rightPaddlePosition
      && y + 10 <= rightPaddlePosition + paddleDimensions.height && ! xBounced) {
      this.setState({
        xSpeed: -xSpeed,
        xBounced: true,
      });
    }
    // LEFT PADDLE
    if (x - 10 <= paddleDimensions.width + paddleDimensions.x
        && y + size >= leftPaddlePosition
        && y <= leftPaddlePosition + paddleDimensions.height && ! xBounced) {
      this.setState({
        xSpeed: -xSpeed,
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

  _stop() {
    const { windowWidth, windowHeight } = this.props;
    this.setState({
      x: calculateInitialPos(windowWidth),
      xSpeed: 10,
      xBounced: false,
      y: calculateInitialPos(windowHeight),
      ySpeed: 10,
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
