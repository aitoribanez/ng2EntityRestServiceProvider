import { Component, OnInit } from '@angular/core';

import ApiWrapperService from '../../services/apiWrapper.service';
import { Product } from '../../entitys/product';
import { config } from './config';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiWrapperService],
})

export class HomeComponent implements OnInit {
  title: string = 'app works!';
  products: Array<Product>;

  constructor(api: ApiWrapperService) {
    api
      .get('products')
      .subscribe(products => {
        products.map(obj => obj.collecttime = this._toString(obj.collecttime, config.es.months))
        products.map(obj => obj.seedtime = this._toString(obj.seedtime, config.es.months))

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
  private _toString(number, months) {
    return months[number - 1];
  }

}
