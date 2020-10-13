import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  user: [],
});

export default persistReducer(persistConfig, rootReducer);
