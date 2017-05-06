import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import styles from 'styles/containers/pong';


class Pong extends React.Component {

  render() {
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
      </div>
    );
  }

}


const mapStateToProps = (state) => ({
});


const mapDispatchToProps = {
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Pong);
