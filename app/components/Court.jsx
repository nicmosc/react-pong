import React from 'react';
import { Stage, Layer } from 'react-konva';

import styles from 'styles/components/court';


class Court extends React.Component {

  render() {
    const { children, height, width } = this.props;
    return (
      <div className={styles.court}>
        <Stage height={height} width={width}>
          <Layer>
            {children}
          </Layer>
        </Stage>
      </div>
    );
  }


}


export default Court;
