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
| ReturnType<typeof loginActions.setIsEmailSent>
| ReturnType<typeof loginActions.isInvalidDataClear>
| ReturnType<typeof loginActions.clearIsEmailSent>;

export const login = (email: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi, mainProtectedApi },
) => {
  try {
    // dispatch(getUserInfo());
    dispatch(loginActions.setIsLoading(true));
    await mainApi.sendEmail({ email });
    dispatch(loginActions.setIsEmailSent(true));
  } catch (e) {
    dispatch(loginActions.setIsEmailSent(false));
    dispatch(loginActions.setIsLoading(false));
    dispatch(loginActions.setIsInvalidDataMessage(e.response.data.message));
  } finally {
    dispatch(loginActions.setIsLoading(false));
  }
};

export const sendValidate = (email: string, otp:string): AsyncAction => async (
  dispatch,
  _,
  { mainApi, mainProtectedApi },
) => {
  try {
    const { accessToken, refreshToken } = await mainApi.sendValidate({ email, otp });
    const storage = TokensLocalStorage.getInstance();
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
    dispatch(getUserInfo());
    dispatch(loginActions.setIsLoggedIn(true));

    dispatch(push('/'));
  } catch (e) {
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

export const clearIsEmailSent = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(loginActions.clearIsEmailSent());
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
