import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    () => null,
    compose(
        applyMiddleware(thunk),
        (window && window.devToolsExtension) ? window.devToolsExtension() : (f: any) => f
    )
);

export default store
