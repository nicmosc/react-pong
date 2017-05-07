import React from 'react';
import { Rect } from 'react-konva';


const dimensions = {
  size: 15,
}


function calculateInitialPos(hw) {
  return (hw / 2) - dimensions.size / 2;
}


class Ball extends React.Component {

  state = {
    ySpeed: 10,
    xSpeed: 10,
    xBounced: false,
    yBounced: false,
  };

  constructor(props) {
    super(props);
    this._loop = this._loop.bind(this);
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
        width={dimensions.size}
        height={dimensions.size}
        fill="white"
        x={x}
        y={y} />
    );
  }

  _loop() {
    const { windowWidth, windowHeight } = this.props;
    const { x, y, xSpeed, ySpeed, xBounced, yBounced } = this.state;

    // HORIZONTAL
    if ((x >= windowWidth - 100 && ! xBounced)
        || (x <= 0 + 100 && ! xBounced)) {
      this.setState({
        xSpeed: -xSpeed,
        xBounced: true,
      });
    }

    if ((x < windowWidth / 2 && xSpeed < 0 && xBounced)
        || (x > windowWidth / 2 && xSpeed > 0 && xBounced)) {
      this.setState({
        xBounced: false,
      });
    }


    // VERTICAL

    // if (y >= windowHeight) {
    //   this.setState({
    //     ySpeed: -ySpeed,
    //   });
    // }


    // MOVEMENT
    this.setState({
      x: x + xSpeed,
      // y: y + ySpeed,
    });

    requestAnimationFrame(this._loop);
  }
}


export default Ball;
