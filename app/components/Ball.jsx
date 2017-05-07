import React from 'react';
import { Rect } from 'react-konva';


const dimensions = {
  size: 15,
}


function calculateInitialPos(hw) {
  return (hw / 2) - dimensions.size;
}


class Ball extends React.Component {

  state = {
    ySpeed: 10,
    xSpeed: 10,
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
    const { x, y, xSpeed, ySpeed } = this.state;

    this.setState({
      x: x + xSpeed,
      y: y + ySpeed,
    });
    requestAnimationFrame(this._loop);
  }
}


export default Ball;
