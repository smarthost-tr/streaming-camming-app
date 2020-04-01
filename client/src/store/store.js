import allReducers from "../reducers/root.js";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from 'redux-promise';


const persistConfig = {
 key: 'primary',
 storage: storage
};

const pReducer = persistReducer(persistConfig, allReducers);

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(pReducer, composeEnhancers(applyMiddleware(reduxThunk, promiseMiddleware)));

export const persistor = persistStore(store);

store.subscribe(() => {
	console.log("Store is now: ", store.getState());
})

