import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export default class ApiWrapperService {
  private baseUrl: string = environment.apiUrl;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {}

  //get all products
  get(url: string):Observable<any> {
    return this.http.get(this.getApiUrl(url)).map(res => res.json());
  }

  // get one product
  one(url: string):Observable<any> {
    return this.http.get(this.getApiUrl(url)).map(res => res.json());
  }

  add(url: string, data):Observable<any> {
    return this.http.post(this.getApiUrl(url), JSON.stringify(data), this.options);
  }

  update(url: string, data):Observable<any> {  
    return this.http.put(this.getApiUrl(url), JSON.stringify(data), this.options);
  }

  destroy(url: string) {
    return this.http.delete(this.getApiUrl(url), this.options);
  }

 /**
 * Add baseUrl to sended url
 * @constructor
 * @param {url} string.
 */
  private getApiUrl (url: string): string {
    return this.baseUrl + url;
  }
}
