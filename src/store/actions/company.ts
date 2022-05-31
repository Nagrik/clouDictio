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
    | ReturnType<typeof companyActions.companyInfo>
    | ReturnType<typeof companyActions.setCSVInfo>
    | ReturnType<typeof companyActions.setDeveloperInfo>
    | ReturnType<typeof companyActions.clearCompanyInfo>
    | ReturnType<typeof companyActions.clearDeveloperInfo>
    | ReturnType<typeof companyActions.setIsLoading>
    | ReturnType<typeof companyActions.setIsSuccess>
    | ReturnType<typeof companyActions.isCloseModal>
    | ReturnType<typeof companyActions.setIsSuccessCSV>
    | ReturnType<typeof companyActions.setProgress>;

export const createCompany = (name:string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const body = {
      name,
    };
    dispatch(companyActions.setIsLoading(true));
    await mainProtectedApi.createCompany(body);
    dispatch(getAdminCompanies());
    dispatch(companyActions.setIsLoading(false));
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
    dispatch(companyActions.setIsLoading(true));
    const response = await mainProtectedApi.getAdminCompanies();
    dispatch(companyActions.setAllAdminCompanies(response));
    dispatch(companyActions.setIsLoading(false));
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

export const clearCompanyInfo = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.clearCompanyInfo());
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
    dispatch(companyActions.setIsLoading(true));
    const response = await mainProtectedApi.getCompanyInfo(companyId);
    dispatch(companyActions.companyInfo(response));
    dispatch(companyActions.isCloseModal(true));
    dispatch(companyActions.setIsLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(companyActions.isCloseModal(false));
  }
};

export const setIsLoading = (isLoading: boolean): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.setIsLoading(isLoading));
  } catch (e) {
    console.log(e);
  }
};

export const postCSVFile = (companyId:number, file: any): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedFormData },
) => {
  try {
    dispatch(companyActions.setIsLoading(true));
    const response = await mainProtectedFormData.postCSVFile(companyId, file);
    dispatch(getCSV(companyId));
    dispatch(getCompanyInfo(companyId));
    dispatch(companyActions.setIsSuccessCSV(true));
    dispatch(companyActions.isCloseModal(true));
  } catch (e) {
    dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const getCSV = (companyId:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const response = await mainProtectedApi.getCSV(companyId);
    dispatch(companyActions.setCSVInfo(response));
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const setProgress = (progress:any): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.setProgress(progress));
    console.log(progress);
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const getDeveloperInfo = (developerId:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.setIsLoading(true));
    const response = await mainProtectedApi.getDeveloper(developerId);
    dispatch(companyActions.setDeveloperInfo(response));
    dispatch(companyActions.setIsLoading(false));
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const clearDeveloperInfo = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.clearDeveloperInfo());
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const deleteDeveloper = (projectId:number, developerId:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.deleteDeveloper(projectId, developerId);
    dispatch(getCompanyInfo(projectId));
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const deleteCSVAction = (projectId:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.setIsLoading(true));
    await mainProtectedApi.deleteCSV(projectId);
    dispatch(getCSV(projectId));
    setTimeout(() => {
      dispatch(companyActions.setIsLoading(false));
    }, 1000);
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const downloadCSVAction = (projectId:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.downloadCSV(projectId);
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const setIsSuccess = (isSuccess: boolean): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(companyActions.setIsSuccess(isSuccess));
  } catch (e) {
    // dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const createAdmin = (
  companyId:number,
  email:string, name:string,
  uploadCsv: boolean,
  downloadCsv: boolean,
  deleteCsv: boolean,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const body = {
      email,
      name,
      uploadCsv,
      downloadCsv,
      deleteCsv,
    };
    dispatch(companyActions.setIsLoading(true));
    await mainProtectedApi.createAdmin(companyId, body);
    dispatch(getCompanyInfo(companyId));
    setTimeout(() => {
      dispatch(companyActions.setIsSuccess(true));
    }, 1000);
  } catch (e) {
    dispatch(companyActions.createCompanyError(e.response.data.message));
  }
};

export const changeAdminInfo = (
  companyId:number,
  uploadCsv: boolean,
  downloadCsv: boolean,
  deleteCsv: boolean,
  userId: number,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const body = {

      uploadCsv,
      downloadCsv,
      deleteCsv,
    };
    dispatch(companyActions.setIsLoading(true));
    await mainProtectedApi.changeAdminInfo(companyId, userId, body);
    dispatch(getCompanyInfo(companyId));
    dispatch(companyActions.setIsLoading(false));
    dispatch(companyActions.setIsSuccess(true));
  } catch (e) {
    dispatch(companyActions.createCompanyError(e.response.data.message));
  } finally {
    dispatch(companyActions.setIsLoading(false));
  }
};
