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
  }

  componentDidMount() {
    const { windowHeight, windowWidth } = this.props;
    this.setState({
      x: calculateInitialPos(windowHeight),
      y: calculateInitialPos(windowWidth),
    });
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
}


export default Ball;
