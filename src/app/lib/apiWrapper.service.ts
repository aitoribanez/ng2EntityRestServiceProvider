import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export default class ApiWrapperService {
  
  constructor(private http: Http) {
    this.http = http;
  }

  get(url: String) {
    return this.http.get(`${environment.apiUrl}/${url}`)
       .toPromise()
       .then((resp) => console.log(resp.json()[1]));
  }

}
