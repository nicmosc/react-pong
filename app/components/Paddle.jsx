import React from 'react';
import { Rect } from 'react-konva';


class Paddle extends React.Component {
  render() {
    return (
      <Rect
        width={100}
        height={100}
        fill={"red"}
      />
    );
  }
}


export default Paddle;
