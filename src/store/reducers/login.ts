import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface InitState {
  isLoggedIn:boolean,
  isInvalidData: boolean,
  isInvalidDataMessage: string | null,
  isLoading:boolean,
  isEmailSent:boolean
}

const initialState: InitState = {
  isLoggedIn: false,
  isInvalidData: false,
  isInvalidDataMessage: null,
  isLoading: false,
  isEmailSent: false,
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

  setIsEmailSent(isEmailSent: boolean) {
    this.draftState.isEmailSent = isEmailSent;
  }

  clearIsEmailSent() {
    this.draftState.isEmailSent = false;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }
}

export default createReducerFunction(loginReducer, initialState);
