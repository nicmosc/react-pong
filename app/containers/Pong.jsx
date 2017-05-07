import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Court from 'components/Court';
import Paddle from 'components/Paddle';
import Ball from 'components/Ball';

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
            right={true} />
          <Paddle
            windowHeight={height}
            windowWidth={width} />
          <Ball
            windowHeight={height}
            windowWidth={width} />
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
});


const mapDispatchToProps = {

};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Pong);
