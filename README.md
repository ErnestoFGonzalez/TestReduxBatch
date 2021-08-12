# TestReduxBatch

I've been having problems with the `batch` method re-exported from `react-redux`. After suspecting it might be the nested state persistors I created this repo to test it out. Turns out everything works fine.

The layout is as follows:

```
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {PersistGate} from 'redux-persist/integration/react';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSInfo from 'react-native-sensitive-info';

import authReducer, {AuthState} from './authSlice';
import reposReducer, {ReposState} from './reposSlice';

export type State = {
  auth: AuthState,
  repos: ReposState,
};

const sensitiveStorage = createSensitiveStorage({});

const authPersistConfig = {
  // Persistor will store reducer state using "persist:auth" key.
  key: 'auth',
  // Use `sensitiveStorage` to store auth reducer state,
  // which includes sensitive data such as the authentication token.
  storage: sensitiveStorage,
  stateReconciler: autoMergeLevel2,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const appReducer = combineReducers({
  auth: authPersistedReducer,
  repos: reposReducer,
});

const rootReducer = (state, action) => {
  // Allows to remove all persisted state (both auth and root)
  // And resets state if dispatched action is `"auth/logOut"`.
  if (action.type === 'auth/logOut') {
    AsyncStorage.removeItem('persist:root');
    RNSInfo.deleteItem('persist:auth', {});
    state = undefined;
  }

  return appReducer(state, action);
};

const rootPersistConfig = {
  // Persistor will store reducer state using "persist:root" key.
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  // auth state will not be persisted.
  blacklist: ['auth'],
};

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = createStore(rootPersistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
```
