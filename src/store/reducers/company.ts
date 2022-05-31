import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import {
  CompanyInfo, DeveloperInfo, Project, User,
} from '@/api/main-protected';
import Companies from '@/Components/Companies';

export interface InitState {
  allAdminCompanies:Project[] | null,
  createCompanyError: string | null,
  companyInfo: CompanyInfo | null,
  csvInfo: any,
  developerInfo:DeveloperInfo | null,
  isLoading: boolean,
  isSuccess: boolean,
  isSuccessCSV: boolean,
  isCloseModal :boolean,
  progress:any
}

const initialState: InitState = {
  allAdminCompanies: null,
  createCompanyError: null,
  companyInfo: null,
  csvInfo: null,
  developerInfo: null,
  isLoading: false,
  isSuccess: false,
  isSuccessCSV: false,
  isCloseModal: false,
  progress: null,
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

  clearCompanyInfo() {
    this.draftState.companyInfo = null;
  }

  isCloseModal(isCloseModal: boolean) {
    this.draftState.isCloseModal = isCloseModal;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsSuccess(isSuccess: boolean) {
    this.draftState.isSuccess = isSuccess;
  }

  setProgress(progress: any) {
    this.draftState.progress = progress;
  }

  setIsSuccessCSV(isSuccess: boolean) {
    this.draftState.isSuccessCSV = isSuccess;
  }

  clearDeveloperInfo() {
    this.draftState.developerInfo = null;
  }

  clearCompanyError() {
    this.draftState.createCompanyError = null;
  }

  setCSVInfo(csvInfo:any) {
    this.draftState.csvInfo = csvInfo;
  }

  setDeveloperInfo(developerInfo:DeveloperInfo) {
    this.draftState.developerInfo = developerInfo;
  }
}

export default createReducerFunction(companyReducer, initialState);
