import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window;
    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
        enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(reducers, initialState, composedEnhancers);

export default store;