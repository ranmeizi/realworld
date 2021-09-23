import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers/app'

const rootReducer = combineReducers({
    app: appReducer
})

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        (window && window.devToolsExtension) ? window.devToolsExtension() : (f: any) => f
    )
);

export default store
