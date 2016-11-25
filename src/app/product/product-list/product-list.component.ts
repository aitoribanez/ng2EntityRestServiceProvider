// import { toast } from 'angular2-materialize';
// import { Observable } from 'rxjs';
import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// import ApiWrapperService from '../../services/apiWrapper.service';
import { ProductModel } from '../datos.model';
import { config } from './config';
// import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // providers: [ApiWrapperService, ProductsResolve, ProductFormComponent]
})

@Injectable()
export class ProductListComponent implements OnInit {
  @Input('products') products: ProductModel[];
  @Input('product') product: ProductModel;
  @Output() get: EventEmitter<string> = new EventEmitter<string>();
  @Output() destroy: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    /* this.products.map(obj => {
      obj.collecttime = this._toString(obj.collecttime, config.es.months);
      obj.seedtime = this._toString(obj.seedtime, config.es.months);
    }) */
  }

  destroyProduct(id) {
    this.product.uuid = id;
    console.log('emitting destroy', id);
    this.destroy.emit(id)
    // this.router.navigate(['/']);
  }

  getProduct(id) {
    this.product.uuid = id;
    console.log('emiting', id);
    this.get.emit(id);
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
