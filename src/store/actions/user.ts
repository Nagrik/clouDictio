import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import { AsyncAction } from '@/store/actions/common';
import { userReducer } from '@/store/reducers/user';
import { loginActions } from '@/store/actions/login';

export const userActions = createActionCreators(userReducer);

export type userActionsType =
    | ReturnType<typeof userActions.setUserInfo>
    | ReturnType<typeof loginActions.setIsLoading>;

export const getUserInfo = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const response = await mainProtectedApi.getUserInfo();
    dispatch(userActions.setUserInfo(response));
    dispatch(loginActions.setIsLoggedIn(true));
    dispatch(loginActions.setIsLoading(false));
  } catch (e) {
    console.log(e);
  }
};
