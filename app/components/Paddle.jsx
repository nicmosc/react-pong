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
  render() {
    const { windowHeight, windowWidth, right } = this.props;
    const { width, height, x } = dimensions;
    return (
      <Rect
        width={width}
        height={height}
        fill={"white"}
        x={calculateXPos(windowWidth, right)}
        y={calculateYPos(windowHeight)}
      />
    );
  }
}


export default Paddle;
