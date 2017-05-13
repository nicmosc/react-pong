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
  getWinner,
} from 'selectors';
import If from 'utils/If';

import styles from 'styles/containers/pong';


class Pong extends React.Component {

  state = {
    welcome: true,
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
    // this._handleWindowResize();
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
      winner,
      startGame,
    } = this.props;
    const { welcome } = this.state;
    return (
      <div className={styles.pong}>
        <If cond={welcome}>
          <div className={styles.welcome}>
            <div className={styles.title}>
              Welcome to <br /> Pong
            </div>
            <div className={styles.middleMessages}>
              <div>During a game press <span style={{ fontStyle: 'italic' }}>space</span> to pause</div>
              <div>Player 1 move with <span style={{ fontStyle: 'italic' }}>q-a</span>, 2 with <span style={{ fontStyle: 'italic' }}>up-down</span></div>
            </div>
            <div className={styles.message}>
              Press <span style={{ fontStyle: 'italic' }}>space</span> to start a new game now
            </div>
          </div>
        </If>
        <If cond={! welcome}>
          <div className={styles.divisor} style={{ opacity: isGameStarted ? '1' : '0.4' }}></div>
          <div className={styles.score}>
            <div className={styles.left}>
              {scores.player1}
            </div>
            <div className={styles.right}>
              {scores.player2}
            </div>
          </div>
          <If cond={isGamePaused & isGameStarted}>
            <div className={styles.message}>
              Press <span style={{ fontStyle: 'italic' }}>space</span> to continue
            </div>
          </If>
          <If cond={! isGameStarted}>
            <div className={styles.bigMessage}>
              {`Player ${winner} won`}
            </div>
            <div className={styles.message}>
              Press <span style={{ fontStyle: 'italic' }}>space</span> to start a new game
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
        </If>
      </div>
    );
  }

  _handleKeyPress(event) {
    const { togglePlayPause, startGame, isGameStarted } = this.props;
    const { welcome } = this.state;
    if (event.keyCode === 32) {
      if (welcome) {
        this.setState({
          welcome: false,
        });
        startGame();
      }
      else {
        if (! isGameStarted) {
          startGame();
        }
        else {
          togglePlayPause();
        }
      }
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
    if (scores.player1 === 10) {
      endGame(1);
      return true;
    }
    else if (scores.player2 === 10) {
      endGame(2);
      return true;
    }
  }
}


const mapStateToProps = (state) => ({
  yLeft: getLeftPaddlePosition(state),
  yRight: getRightPaddlePosition(state),
  isGamePaused: getIsGamePaused(state),
  isGameStarted: getIsGameStarted(state),
  scores: getPlayerScores(state),
  winner: getWinner(state),
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
