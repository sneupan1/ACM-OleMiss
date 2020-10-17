import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

import alertReducer from "./alert/alert.reducer";
import userReducer from "./user/user.reducer";
import profileReducer from "./profile/profile.reducer";

const saveSubsetFilter = createFilter("user", ["token", "role"]);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  transforms: [saveSubsetFilter],
};

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  profile: profileReducer,
});

export default persistReducer(persistConfig, rootReducer);
