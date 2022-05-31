import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Main from '@/api/main';
import store from '@/store';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string | undefined, contentType = 'application/json') {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      },
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleSuccessResponse, this.handleResponseError);
  };

  private handleSuccessResponse = (response: any) => response.data.data;

  private handleResponseError = async (e: any): Promise<any> => {
    const status = e.response ? e.response.status : null;
    const tokens = TokensLocalStorage.getInstance();
    const main = Main.getInstance();
    const currentRefreshToken = tokens.getRefreshToken();

    // store.dispatch<any>(setErrorMessage(e.response.data));

    if (status === 401 && currentRefreshToken) {
      try {
        const { accessToken, refreshToken } = await main
          .refresh({ refreshToken: currentRefreshToken });
        tokens.setAccessToken(accessToken);
        tokens.setRefreshToken(refreshToken);
        e.config.headers.Authorization = `Bearer ${accessToken}`;
        const { data } = await axios.request(e.config);
        return data.data;
      } catch (_) {
        tokens.clear();
        return Promise.reject(e);
      }
    }
    return Promise.reject(e);
  };
}

export default HttpClient;
