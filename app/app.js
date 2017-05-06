import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Application from 'containers/Application';

import setupStore from 'store';

// import 'styles/app.less';


function enableHMR(fn) {
  fn();

  if (module.hot) {
    module.hot.accept('containers/Application', () => { fn() })
  }
}


const store = setupStore();


enableHMR(() => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Application />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
});
