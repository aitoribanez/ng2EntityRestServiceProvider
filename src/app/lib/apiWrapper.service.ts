import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import ApiWrapper from './apiWrapper';
import { environment } from '../../environments/environment';

@Injectable()
export default class ApiWrapperService {
  
  constructor(private http: Http, private model: ApiWrapper) {
    this.http = http;
    this.model = model;
  }

  get() {
    return this.http.get(`${environment.apiUrl}/${this.model.url}`)
       .toPromise()
       .then((resp) => console.log(resp.json()[1]));
  }

}
