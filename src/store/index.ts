import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import Main from '@/api/main';
import MainProtected from '@/api/main-protected';

import { InitialActions } from '@/store/actions/login';
import { userActionsType } from '@/store/actions/user';
import { companyActionsType } from '@/store/actions/company';
import MainProtectedFormData from '@/api/main-protected-formData';
import loginReducer from './reducers/login';
import userReducer from './reducers/user';
import companyReducer from './reducers/company';

export const history = createBrowserHistory();

export const api = {
  mainApi: Main.getInstance(),
  mainProtectedApi: MainProtected.getInstance(),
  mainProtectedFormData: MainProtectedFormData.getInstance(),
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
  userReducer,
  companyReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(api)),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
    | InitialActions
    | userActionsType
    | companyActionsType;

export default createStore(rootReducer, enhancer);
