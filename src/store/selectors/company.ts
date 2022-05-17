import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { CompanyInfo, Project } from '@/api/main-protected';

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
