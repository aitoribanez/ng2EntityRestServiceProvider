import { Product } from './../product/datos.model';
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
  private productEdit$: Subject<ProductModel> = new Subject<ProductModel>();
  private productDestroy$: Subject<string> = new Subject<string>();
  private fileChange$: Subject<any> = new Subject<any>();

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
      this.products$.next(ps.json());
    },
      error => console.log('productService.add() error'));
  }

  update(url: string, data) {
    let product = this.http.put(this.getApiUrl(url), JSON.stringify(data), this.options)
      .map(res => res.json());
    console.log('try to update', data);
    product.subscribe(
      () => { console.log('updated', data); this.productEdit$.next(data); }
    )
  }

  updateProduct$(): Observable<ProductModel> {
    return this.productEdit$.asObservable();
  }

  destroy(url: string) {
    console.log('destroying', url);
    // TODO: Deberia de devolver el objeto Product.
    let product = this.http.delete(this.getApiUrl(url), this.options);
    product.subscribe(unused => {
      console.log('apunto de borrar', url);
      //  pr.uuid = 'asd';
      //  console.log("destroy", p.json());
      this.productDestroy$.next(url);
    },
      error => console.log('productService.destroy() error'));
  }

  
  destroyProduct$(): Observable<string> {
    return this.productDestroy$.asObservable();
  }

  fileChanger$() {
    return this.fileChange$.asObservable();
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
