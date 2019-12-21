import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);
store.subscribe(state => {
  console.log(store.getState());
});

export default store;
