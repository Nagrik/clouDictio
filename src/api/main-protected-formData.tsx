import { CompanyInfo } from '@/api/main-protected';
import { useDispatch } from 'react-redux';
import { setProgress } from '@/store/actions/company';
import React from 'react';
import HttpClientProtected from './http-client-protected';

export default class MainProtectedFormData extends HttpClientProtected {
  private static instanceCached: MainProtectedFormData;

  private constructor() {
    super(process.env.BASE_URL, 'multipart/form-data');
  }

  static getInstance = () => {
    if (!MainProtectedFormData.instanceCached) {
      MainProtectedFormData.instanceCached = new MainProtectedFormData();
    }

    return MainProtectedFormData.instanceCached;
  };

  public postCSVFile = (companyId: number, file:any) => this.instance.post<CompanyInfo>(`/project/${companyId}/upload-csv`, file);
}
