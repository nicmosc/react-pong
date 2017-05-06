import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Pong from 'containers/Pong';

import setupStore from 'store';

import 'styles/app.less';


function enableHMR(fn) {
  fn();

  if (module.hot) {
    module.hot.accept('containers/Pong', () => { fn() })
  }
}


const store = setupStore();


enableHMR(() => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Pong />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
});
