import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Court from 'components/Court';
import Paddle from 'components/Paddle';
import Ball from 'components/Ball';
import {
  updateRightPaddle,
  updateLeftPaddle,
  togglePlayPause,
} from 'actions';
import {
  getRightPaddlePosition,
  getLeftPaddlePosition,
  getIsGamePaused,
} from 'selectors';

import styles from 'styles/containers/pong';


class Pong extends React.Component {

  state = {
  };

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keypress", this._handleKeyPress, false);
  }

  componentWillMount() {
    this._handleWindowResize();
    window.addEventListener("resize", this._handleWindowResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleWindowResize.bind(this));
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const {
      yRight,
      yLeft,
      updateRightPaddle,
      updateLeftPaddle,
      isGamePaused,
      togglePlayPause,
    } = this.props;
    return (
      <div className={styles.pong}>
        <div className={styles.divisor}></div>
        <div className={styles.score}>
          <div className={styles.left}>
            10
          </div>
          <div className={styles.right}>
            5
          </div>
        </div>
        <Court
          width={width}
          height={height} >
          <Paddle
            windowHeight={height}
            windowWidth={width}
            y={yRight}
            update={updateRightPaddle}
            right={true}
            gameRunning={! isGamePaused} />
          <Paddle
            windowHeight={height}
            windowWidth={width}
            y={yLeft}
            update={updateLeftPaddle}
            gameRunning={! isGamePaused} />
          <Ball
            windowHeight={height}
            windowWidth={width}
            leftPaddlePosition={yLeft}
            rightPaddlePosition={yRight}
            gameRunning={! isGamePaused} />
        </Court>
      </div>
    );
  }

  _handleKeyPress(event) {
    const { togglePlayPause } = this.props;
    if (event.keyCode === 32) {
      togglePlayPause();
    }
  }

  _handleWindowResize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

}


const mapStateToProps = (state) => ({
  yLeft: getLeftPaddlePosition(state),
  yRight: getRightPaddlePosition(state),
  isGamePaused: getIsGamePaused(state),
});


const mapDispatchToProps = {
  updateRightPaddle,
  updateLeftPaddle,
  togglePlayPause,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Pong);
