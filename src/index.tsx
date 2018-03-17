import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { itemReducer } from './reducers';
import { StoreState } from './types';

const initialState = {
  byId: ['0', '1', '2'],
  byHash: {
    0: { id: '0', title: '0' },
    1: { id: '1', title: '1' },
    2: { id: '2', title: '2' }
  },
  indents: { '0': 0, '1': 0, '2': 1 },
  currentId: '0'
}
// const store = createStore<StoreState>(itemReducer, initialState);
let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
const store: any = devtools(createStore)(itemReducer, initialState as StoreState)

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
