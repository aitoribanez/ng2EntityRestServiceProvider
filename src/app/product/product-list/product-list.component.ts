import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ApiWrapperService from '../../services/apiWrapper.service';
import { Product, ProductModel } from '../datos.model';
import { config } from './config';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // providers: [ApiWrapperService, ProductsResolve, ProductFormComponent]
})

@Injectable()
export class ProductListComponent implements OnInit {
  title: string = 'app works!';
  @Input('products') products: ProductModel[];

  constructor() { }

  ngOnInit() {
    console.log('init', this.products);

    /* this.products.map(obj => {
      obj.collecttime = this._toString(obj.collecttime, config.es.months);
      obj.seedtime = this._toString(obj.seedtime, config.es.months);
    }) */
  }

  /**
 * Number to String using an array. (jsdoc)
 * @constructor
 * @param {number} number.
 * @param {months} array.
 */
  /* private _toString(number: number, months: Array<String>): String {
    return months[number - 1];
  } */

}
