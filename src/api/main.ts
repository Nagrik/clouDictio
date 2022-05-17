import HttpClient from './http-client';

export interface SendEmailBody {
  email: string,
  password: string
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

  public refresh = (body:{ refreshToken: string }) => this.instance.post('/users/login/refresh', body);

  public sendEmail = (body: SendEmailBody) => this.instance.post('/users/login', body);
}

export default Main;
