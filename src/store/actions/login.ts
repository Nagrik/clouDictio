import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import { AsyncAction } from '@/store/actions/common';
import { loginReducer } from '@/store/reducers/login';
import { getUserInfo } from '@/store/actions/user';

export const loginActions = createActionCreators(loginReducer);

export type InitialActions =
| ReturnType<typeof loginActions.setIsLoggedIn>
| ReturnType<typeof loginActions.setIsInvalidData>
| ReturnType<typeof loginActions.setIsInvalidDataMessage>
| ReturnType<typeof loginActions.clearIsInvalidData>
| ReturnType<typeof loginActions.isInvalidDataClear>;

export const login = (email: string, password:string): AsyncAction => async (
  dispatch,
  _,
  { mainApi, mainProtectedApi },
) => {
  try {
    const { accessToken, refreshToken } = await mainApi.sendEmail({ email, password });
    dispatch(getUserInfo());
    const storage = TokensLocalStorage.getInstance();
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);

    dispatch(loginActions.setIsLoggedIn(true));

    dispatch(push('/'));
  } catch (e) {
    dispatch(loginActions.setIsInvalidData(true));
    dispatch(loginActions.setIsInvalidDataMessage(e.response.data.message));
  }
};

export const isInvalidDataClear = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(loginActions.isInvalidDataClear());
  } catch (e) {
    console.log(e);
  }
};

export const clearIsEmailInvalid = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(loginActions.clearIsInvalidData());
  } catch (e) {
    console.log(e);
  }
};

export const logout = (): AsyncAction => async (
  dispatch,
) => {
  try {
    const storage = TokensLocalStorage.getInstance();
    storage.clear();

    dispatch(loginActions.setIsLoggedIn(false));
  } catch (e) {
    console.log(e);
  }
};
