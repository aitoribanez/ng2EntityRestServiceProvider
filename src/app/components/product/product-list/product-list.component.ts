import { Component, OnInit } from '@angular/core';

import ApiWrapperService from '../../../services/apiWrapper.service';
import { Product } from '../../../entitys/product';
import { config } from './config';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ApiWrapperService]
})

export class ProductListComponent implements OnInit {
  title: string = 'app works!';
  public products: Array<Product>;

  constructor(productService: ApiWrapperService) {
    
    productService
      .get('products')
      .subscribe(products => {
        products.map(obj => { 
          obj.collecttime = this._toString(obj.collecttime, config.es.months);
          obj.seedtime = this._toString(obj.seedtime, config.es.months);
        })

        this.products = products
      });  
  }

  ngOnInit() {
  }

 /**
 * Number to String using an array. (jsdoc)
 * @constructor
 * @param {number} number.
 * @param {months} array.
 */
  private _toString(number: number, months: Array<String>): String {
    return months[number - 1];
  }

}
