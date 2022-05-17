import HttpClientProtected from './http-client-protected';

export type User = {
  id: number,
  name:string,
  email: string,
  role:string,
};
export interface CreateCompany {
  name:string
}
export interface CreateAdmin {
  name:string,
  email: string,
}
export interface Project {
  id: number,
  name:string,
  pathToDictionary:string
}

export interface CompanyInfo {
  users: User[],
  project:Project,
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

  public createCompany = (body: CreateCompany) => this.instance.post('/users/project', body);

  public getAdminCompanies = () => this.instance.get<Project[]>('/users/info');

  public getCompanyInfo = (companyId: number) => this.instance.get<CompanyInfo>(`/users/project/${companyId}`);

  public createAdmin = (companyId: number, body: CreateAdmin) => this.instance.post(`/users/project/${companyId}`, body);
}
