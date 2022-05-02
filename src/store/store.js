import AsyncStorage from "@react-native-community/async-storage";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";

import { combineReducers } from "redux";
import reducers from "./reducers";

let rootReducer = (state, action) => {
  return combineReducers(reducers)(state, action);
};

const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ["core"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));

const persistor = persistStore(store);

export { store, persistor };
