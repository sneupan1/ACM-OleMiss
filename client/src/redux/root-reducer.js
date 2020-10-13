import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import alertReducer from "./alert/alert.reducer";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  user: [],
  alert: alertReducer,
});

export default persistReducer(persistConfig, rootReducer);
