import HttpClientProtected from './http-client-protected';

export type User = {
  id: number,
  name:string,
  email: string,
  deleteCsv: boolean;
  uploadCsv: boolean;
  downloadCsv: boolean;
  role: 'customer' | 'user'
};
export interface CreateCompany {
  name:string
}
export interface CreateAdmin {
  name:string,
  email: string,
  updoadCSV: boolean,
  downloadCSV: boolean,
  deleteCSV: boolean
}
export interface Project {
  id: number,
  name:string,
  pathToDictionary:string,
  pathToCsv: string
}

export interface CompanyInfo {
  users: User[],
  project:Project,
}

export interface DeveloperInfo {
  id:number
  name: string
  email:string
  role:string
}

export default class MainProtected extends HttpClientProtected {
  private static instanceCached: MainProtected;

  private constructor() {
    super(process.env.BASE_URL);
  }

  static getInstance = () => {
    if (!MainProtected.instanceCached) {
      MainProtected.instanceCached = new MainProtected();
    }

    return MainProtected.instanceCached;
  };

  //
  // public getBotInfo = (id: string, organizationId: string) => this.instance.get<BotInfo>(`/bots/${id}`,
  //   {
  //     params: {
  //       organizationId,
  //     },
  //   });

  // public getIntervals = () => this.instance.get('/jobs/intervals', {
  //   headers: {
  //     secret: 'secret',
  //   },
  // });

  public getUserInfo = () => this.instance.get<User>('/users');

  public createCompany = (body: CreateCompany) => this.instance.post('/project', body);

  public getAdminCompanies = () => this.instance.get<Project[]>('/users/info');

  public getCompanyInfo = (projectId: number) => this.instance.get<CompanyInfo>(`/project/${projectId}`);

  public createAdmin = (projectId: number, body: { downloadCsv: boolean; deleteCsv: boolean; name: string; email: string; uploadCsv: boolean }) => this.instance.post(`/project/${projectId}/add-user`, body);

  public changeAdminInfo = (projectId: number, userId:number, body: { downloadCsv: boolean; deleteCsv: boolean; uploadCsv: boolean }) => this.instance.put(`/project/${projectId}/user/${userId}`, body);

  public getCSV = (projectId: number) => this.instance.get(`/project/${projectId}/dictionary`);

  public getDeveloper = (developerId: number) => this.instance.get<DeveloperInfo>(`/users/${developerId}`);

  public deleteCSV = (projectId: number) => this.instance.delete(`/project/${projectId}/delete-csv`);

  public deleteDeveloper = (projectId:number, developerId: number) => this.instance.delete(`/project/${projectId}/remove-user/${developerId}`);

  public downloadCSV = (projectId:number) => this.instance.get(`/project/${projectId}/download-csv`);
}
