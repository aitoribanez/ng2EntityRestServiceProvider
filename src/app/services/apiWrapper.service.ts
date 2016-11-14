import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { ProductModel } from '../product/datos.model';

@Injectable()
export default class ApiWrapperService {
  private baseUrl: string = environment.apiUrl;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  // comunicación de eventos mediante observables
  private products$: Subject<ProductModel[]> = new Subject<ProductModel[]>();

  constructor(private http: Http) { }

  // get all products
  get(url: string): Observable<any> {
    return this.http.get(this.getApiUrl(url)).map(res => res.json());
  }

  getProducts$(): Observable<ProductModel[]> {
    return this.products$.asObservable();
  }

  // get one product
  one(url: string): Observable<any> {
    return this.http.get(this.getApiUrl(url)).map(res => res.json());
  }

  add(url: string, data) {
    let products = this.http.post(this.getApiUrl(url), JSON.stringify(data), this.options)
    products.subscribe(ps => {
      // dejo que siga corriendo por los strings de datos pasandole los
      // los datos pasados por json
      this.products$.next(ps.json())
    },
    error => console.log('productService.add() error'));
  }

  update(url: string, data): Observable<any> {
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
  private getApiUrl(url: string): string {
    return this.baseUrl + url;
  }
}
