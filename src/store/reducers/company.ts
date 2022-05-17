import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { CompanyInfo, Project, User } from '@/api/main-protected';
import Companies from '@/Components/Companies';

export interface InitState {
  allAdminCompanies:Project[] | null,
  createCompanyError: string | null,
  companyInfo: CompanyInfo | null,
}

const initialState: InitState = {
  allAdminCompanies: null,
  createCompanyError: null,
  companyInfo: null,
};

export class companyReducer extends ImmerReducer<InitState> {
  setAllAdminCompanies(allAdminCompanies: Project[]) {
    this.draftState.allAdminCompanies = allAdminCompanies;
  }

  createCompanyError(createCompanyError: string) {
    this.draftState.createCompanyError = createCompanyError;
  }

  companyInfo(companyInfo: CompanyInfo) {
    this.draftState.companyInfo = companyInfo;
  }

  clearCompanyError() {
    this.draftState.createCompanyError = null;
  }
}

export default createReducerFunction(companyReducer, initialState);
