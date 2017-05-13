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
  increasePlayerScore,
  startGame,
  endGame,
} from 'actions';
import {
  getRightPaddlePosition,
  getLeftPaddlePosition,
  getIsGamePaused,
  getPlayerScores,
  getIsGameStarted,
} from 'selectors';
import If from 'utils/If';

import styles from 'styles/containers/pong';


class Pong extends React.Component {

  state = {
  };

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleGameEnd = this._handleGameEnd.bind(this);
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
      increasePlayerScore,
      scores,
      isGameStarted,
    } = this.props;
    return (
      <div className={styles.pong}>
        <div className={styles.divisor}></div>
        <div className={styles.score}>
          <div className={styles.left}>
            {scores.player1}
          </div>
          <div className={styles.right}>
            {scores.player2}
          </div>
        </div>
        <If cond={isGamePaused}>
          <div className={styles.pauseMessage}>
            Press SPACE to continue
          </div>
        </If>
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
            gameRunning={! isGamePaused}
            increaseScore={increasePlayerScore}
            handleGameEnd={this._handleGameEnd}
            gameStarted={isGameStarted} />
        </Court>
      </div>
    );
  }

  _handleKeyPress(event) {
    const { togglePlayPause } = this.props;
    if (event.keyCode === 32) {
      console.log('pausing');
      togglePlayPause();
    }
  }

  _handleWindowResize() {
    const { togglePlayPause } = this.props;
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    togglePlayPause(true);
  }

  _handleGameEnd() {
    const { scores, endGame } = this.props;
    if (scores.player1 === 10 || scores.player2 === 10) {
      endGame();
    }
  }
}


const mapStateToProps = (state) => ({
  yLeft: getLeftPaddlePosition(state),
  yRight: getRightPaddlePosition(state),
  isGamePaused: getIsGamePaused(state),
  isGameStarted: getIsGameStarted(state),
  scores: getPlayerScores(state),
});


const mapDispatchToProps = {
  updateRightPaddle,
  updateLeftPaddle,
  togglePlayPause,
  increasePlayerScore,
  startGame,
  endGame,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Pong);
