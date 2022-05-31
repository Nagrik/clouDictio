import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { CompanyInfo, DeveloperInfo, Project } from '@/api/main-protected';

const selectCompany = (state: State) => state.companyReducer;

export const selectAllAdminCompanies: Selector<State, Project[] | null> = createSelector(
  selectCompany,
  ({ allAdminCompanies }) => allAdminCompanies,
);

export const selectCreateCompanyError: Selector<State, string | null> = createSelector(
  selectCompany,
  ({ createCompanyError }) => createCompanyError,
);

export const selectCompanyInfo: Selector<State, CompanyInfo | null> = createSelector(
  selectCompany,
  ({ companyInfo }) => companyInfo,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectCompany,
  ({ isLoading }) => isLoading,
);

export const selectIsCloseModal: Selector<State, boolean> = createSelector(
  selectCompany,
  ({ isCloseModal }) => isCloseModal,
);

export const selectIsSuccess: Selector<State, boolean> = createSelector(
  selectCompany,
  ({ isSuccess }) => isSuccess,
);

export const selectIsSuccessCSV: Selector<State, boolean> = createSelector(
  selectCompany,
  ({ isSuccessCSV }) => isSuccessCSV,
);

export const selectCSVInfo: Selector<State, any | null> = createSelector(
  selectCompany,
  ({ csvInfo }) => csvInfo,
);

export const selectDeveloperInfo: Selector<State, DeveloperInfo | null> = createSelector(
  selectCompany,
  ({ developerInfo }) => developerInfo,
);
