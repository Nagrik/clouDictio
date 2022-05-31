import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

const selectLogin = (state: State) => state.loginReducer;

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isLoggedIn }) => isLoggedIn,
);

export const selectIsInvalidData: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isInvalidData }) => isInvalidData,
);

export const selectInvalidDataMessage: Selector<State, string | null> = createSelector(
  selectLogin,
  ({ isInvalidDataMessage }) => isInvalidDataMessage,
);

export const selectIsEmailSent: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isEmailSent }) => isEmailSent,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isLoading }) => isLoading,
);
