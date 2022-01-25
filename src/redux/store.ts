import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./reducers/app";

const rootReducer = combineReducers({
  app: appReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

const persistor = persistStore(store);

export default store;
export { store, persistor };
