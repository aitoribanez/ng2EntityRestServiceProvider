import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export default class ApiWrapperService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {}

  get(url: String) {
    return this.http.get(`${environment.apiUrl}/${url}`).map(res => res.json());
  }

  /* add(url: String, data) { // product
    return this.http.post(`${environment.apiUrl}/${url}`, JSON.stringify(data.cat), this.options);
  }

  edit(url: String, data) { // product/1 OR product/asd18k -> uuid
    return this.http.put(`${environment.apiUrl}/${url}`, JSON.stringify(data), this.options);
  }

  destroy(url: String, data) { // product/1 OR product/asd18k -> uuid
    return this.http.delete(`${environment.apiUrl}/${url}`, this.options);
  } */

}
