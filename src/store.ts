import {createStore, compose, applyMiddleware} from "redux";
import {apiMiddleware} from "redux-api-middleware";
import thunk from "redux-thunk";
import solarNets from './reducers'

const store = createStore(solarNets, compose(
  applyMiddleware(thunk, apiMiddleware),
  window["devToolsExtension"] ? window["devToolsExtension"]() : f => f
));

export default store
