import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface InitState {
  isLoggedIn:boolean,
  isInvalidData: boolean,
  isInvalidDataMessage: string | null,
  isLoading:boolean,
}

const initialState: InitState = {
  isLoggedIn: false,
  isInvalidData: false,
  isInvalidDataMessage: null,
  isLoading: true,
};

export class loginReducer extends ImmerReducer<InitState> {
  setIsLoggedIn(isLoggedIn: boolean) {
    this.draftState.isLoggedIn = isLoggedIn;
  }

  setIsInvalidData(isInvalidData: boolean) {
    this.draftState.isInvalidData = isInvalidData;
  }

  setIsInvalidDataMessage(isInvalidDataMessage: string) {
    this.draftState.isInvalidDataMessage = isInvalidDataMessage;
  }

  clearIsInvalidData() {
    this.draftState.isInvalidData = false;
  }

  isInvalidDataClear() {
    this.draftState.isInvalidData = false;
    this.draftState.isInvalidDataMessage = null;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }
}

export default createReducerFunction(loginReducer, initialState);
