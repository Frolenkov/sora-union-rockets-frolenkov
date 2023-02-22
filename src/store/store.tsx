import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rocketSlice from "./rocket/rocketSlice";
import { githubAPI } from "./github/github.api";

const rootReducer = combineReducers({
  rocket: rocketSlice,
  [githubAPI.reducerPath]: githubAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubAPI.middleware)
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
