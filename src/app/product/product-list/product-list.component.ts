import { toast } from 'angular2-materialize';
import { Observable } from 'rxjs';
import { Component, OnInit, Injectable, Input, Output } from '@angular/core';
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
  @Input('products') products: ProductModel[];
 // @Output() uuid$: Observable<string>;

  constructor(private productService: ApiWrapperService) { }

  ngOnInit() {
    this.productService.destroyProduct$().subscribe(uuid => {
      uuid = uuid.split('/')[1];
      let index = this.products.findIndex(product => product.uuid.toString() === uuid);
      this.products.splice(index, 1);
    });

    /* this.products.map(obj => {
      obj.collecttime = this._toString(obj.collecttime, config.es.months);
      obj.seedtime = this._toString(obj.seedtime, config.es.months);
    }) */
  }

  destroyProduct(id) {
    this.productService.destroy(`products/${id}`);
    toast('Product have been deleted!', 5000);

    // this.router.navigate(['/']);
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
