import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Court from 'components/Court';
import Paddle from 'components/Paddle';
import Ball from 'components/Ball';
import {
  updateRightPaddle,
  updateLeftPaddle,
} from 'actions';
import {
  getRightPaddlePosition,
  getLeftPaddlePosition,
} from 'selectors';

import styles from 'styles/containers/pong';


class Pong extends React.Component {

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
    const width = window.innerWidth;
    const height = window.innerHeight;
    const {
      yRight,
      yLeft,
      updateRightPaddle,
      updateLeftPaddle,
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
            right={true} />
          <Paddle
            windowHeight={height}
            windowWidth={width}
            y={yLeft}
            update={updateLeftPaddle} />
          <Ball
            windowHeight={height}
            windowWidth={width}
            leftPaddlePosition={yLeft}
            rightPaddlePosition={yRight} />
        </Court>
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


const mapStateToProps = (state) => ({
  yLeft: getLeftPaddlePosition(state),
  yRight: getRightPaddlePosition(state),
});


const mapDispatchToProps = {
  updateRightPaddle,
  updateLeftPaddle,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Pong);
