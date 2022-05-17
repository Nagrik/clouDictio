import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { User } from '@/api/main-protected';

const selectUser = (state: State) => state.userReducer;

export const selectUserInfo: Selector<State, User | null> = createSelector(
  selectUser,
  ({ userInfo }) => userInfo,
);
