import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { User } from '@/api/main-protected';

export interface InitState {
  userInfo: User | null
}

const initialState: InitState = {
  userInfo: null,
};

export class userReducer extends ImmerReducer<InitState> {
  setUserInfo(userInfo: User) {
    this.draftState.userInfo = userInfo;
  }
}

export default createReducerFunction(userReducer, initialState);
