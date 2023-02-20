import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
// import { createWrapper } from "next-redux-wrapper";
// import rootReducer from "./reducers/reducer";

const reducer =combineReducers({
    products:productReducer,
    cart:cartReducer
})

// initial states here
let initalState = {};

// middleware
const middleware = [thunk];

// creating store
const store = legacy_createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store
// assigning store to next wrapper
// const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);