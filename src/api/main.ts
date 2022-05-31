import HttpClient from './http-client';

export interface SendEmailBody {
  email: string,
}
export interface SendValidateBody {
  email: string,
  otp: string
}

class Main extends HttpClient {
  private static instanceCached: Main;

  private constructor() {
    super(process.env.BASE_URL);
  }

  static getInstance = () => {
    if (!Main.instanceCached) {
      Main.instanceCached = new Main();
    }

    return Main.instanceCached;
  };

  public refresh = (body:{ refreshToken: string }) => this.instance.post('/login/refresh', body);

  public sendEmail = (body: SendEmailBody) => this.instance.post('/login', body);

  public sendValidate = (body: SendValidateBody) => this.instance.post('/login/validate', body);
}

export default Main;
