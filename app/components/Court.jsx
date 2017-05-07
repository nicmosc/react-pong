import React from 'react';
import { Stage, Layer } from 'react-konva';

import styles from 'styles/components/court';


class Court extends React.Component {

  state = {
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._handleWindowResize();
    window.addEventListener("resize", this._handleWindowResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleWindowResize.bind(this));
  }

  render() {
    const { children } = this.props;
    const { height, width } = this.state;
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

  _handleWindowResize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }
}


export default Court;
