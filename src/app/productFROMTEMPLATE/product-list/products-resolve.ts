import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import ApiWrapperService from '../../services/apiWrapper.service';

@Injectable()
export class  ProductsResolve implements Resolve<any> {
  constructor(private productService: ApiWrapperService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.get('products');
  }  
}
