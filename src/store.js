import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import licensePlateReducer from "./pages/Tables/licensePlate.reducer";
import authReducer from "./pages/auth/auth.reducer";


const persistConfig = {
    key: 'root',
    storage: storageSession,  // muốn lưu vào local storage thì thay storageSession thành storage
    whitelist: ['auth'] // muốn chỉ lưu thg nào thì bỏ vào whitelist
};

const rootReducer = combineReducers({
    auth: authReducer,
    licensePlate: licensePlateReducer,
}); 

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store)