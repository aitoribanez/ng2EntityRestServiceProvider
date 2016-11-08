import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ApiWrapperService from '../../../services/apiWrapper.service';
import { Product } from '../../../entitys/product';
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
  products: Array<any>;
  productFormComponent: ProductFormComponent;

  constructor(productService: ApiWrapperService, private route: ActivatedRoute,
  productFormComponent: ProductFormComponent) {
    this.productFormComponent = productFormComponent;

    let products = this.route.snapshot.data['products'];

    products.map(obj => { 
      obj.collecttime = this._toString(obj.collecttime, config.es.months);
      obj.seedtime = this._toString(obj.seedtime, config.es.months);
    })

    this.products = products.reverse();
  }

  delete(id) {
    this.productFormComponent.destroy(id);

   // let product =  this.products.filter(product => product.id == id)[0];
  // let index = this.products.indexOf(product);
    let index = this.products.findIndex(product => product.id === id);
    this.products.splice(index, 1);
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
