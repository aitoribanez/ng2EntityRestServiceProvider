import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import ApiWrapperService from '../../../services/apiWrapper.service';

@Injectable()
export class ProductResolve implements Resolve<any> {
  constructor(private productService: ApiWrapperService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.edit(`products/${route.params['id']}`);
  }

  
}