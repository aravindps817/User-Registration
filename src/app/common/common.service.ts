import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CommonService {
  baseUrl = '';
  currentUserDetails: any;

  constructor(private _http: HttpClient,) { }

  /**
   * returns a config file from assets and assign to application variables
   */
  async getAppConfig() {
    return new Promise(async (resolve, reject) => {
      const CONFIG_DATA: any = await this.readConfigFile();
      this.baseUrl = CONFIG_DATA.baseUrl;
      resolve(true);
    });
  }


  readConfigFile() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Cache-Control', 'no-store');
    headers = headers.append('Pragma', 'no-cache');
    return this._http.get(environment.deployUrl + 'assets/app-config.json', { headers }).toPromise();
  }
}


const isFunction = (fn: any) => typeof fn === 'function';

export const subscriptionHandler = (subscriptions: Array<any>) => {
  subscriptions.forEach(sub => sub && isFunction(sub.unsubscribe) && sub.unsubscribe());
};
