import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';


// import styles from 'styles/containers/application';


class Application extends React.Component {

  render() {
    return (
      <div>hi</div>
    );
  }

}


const mapStateToProps = (state) => ({
});


const mapDispatchToProps = {
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Application);
