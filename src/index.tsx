import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { itemReducer } from './reducers';
import { StoreState } from './types';
import {Session} from './model'
// import {Test} from './test.js'

const session = new Session()

const initialState = {
  session: session,
  itemList: session.itemSelector(),
  currentId: session.itemSelector()[0].id
}
// const store = createStore<StoreState>(itemReducer, initialState);
let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
const store: any = devtools(createStore)(itemReducer, initialState as StoreState)

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
    <Provider store={store}>
      <Hello />
    </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
