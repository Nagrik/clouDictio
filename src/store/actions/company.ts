import { createActionCreators } from 'immer-reducer';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import { AsyncAction } from '@/store/actions/common';
import { userReducer } from '@/store/reducers/user';
import { companyReducer } from '@/store/reducers/company';

export const companyActions = createActionCreators(companyReducer);

export type companyActionsType =
    | ReturnType<typeof companyActions.setAllAdminCompanies>
    | ReturnType<typeof companyActions.createCompanyError>
    | ReturnType<typeof companyActions.clearCompanyError>
    | ReturnType<typeof companyActions.companyInfo>;

export const createCompany = (name:string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const body = {
      name,
    };
    await mainProtectedApi.createCompany(body);
    dispatch(getAdminCompanies());
  } catch (e) {
    dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const getAdminCompanies = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const response = await mainProtectedApi.getAdminCompanies();
    dispatch(companyActions.setAllAdminCompanies(response));
  } catch (e) {
    console.log(e);
  }
};

export const clearCreateCompanyError = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.clearCompanyError());
  } catch (e) {
    console.log(e);
  }
};

export const getCompanyInfo = (companyId:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const response = await mainProtectedApi.getCompanyInfo(companyId);
    dispatch(companyActions.companyInfo(response));
  } catch (e) {
    console.log(e);
  }
};

export const createAdmin = (companyId:number, email:string, name:string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const body = {
      email,
      name,
    };
    const response = await mainProtectedApi.createAdmin(companyId, body);
    dispatch(companyActions.companyInfo(response));
    dispatch(getCompanyInfo(companyId));
  } catch (e) {
    dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};
