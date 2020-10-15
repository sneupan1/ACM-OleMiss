import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

import alertReducer from "./alert/alert.reducer";
import userReducer from "./user/user.reducer";

const saveSubsetFilter = createFilter("user", ["token"]);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  transforms: [saveSubsetFilter],
};

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
});

export default persistReducer(persistConfig, rootReducer);
