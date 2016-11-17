import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { toast } from 'angular2-materialize';
import { UUID } from 'angular2-uuid';

import ApiWrapperService from '../services/apiWrapper.service';
import { Product } from '../product/datos.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(private productService: ApiWrapperService) { }

  ngOnInit() {
    this.product = this._productFromScratch();

    this.productService.get('products').subscribe(products => this.products = products.reverse());
    // da la foto del estado de this.products
    this.products$ = this.productService.getProducts$();
    // cuando un cambio en this.products entra aqui
    this.products$.subscribe(product => {
      product['data'] = product;
      this.products.unshift(product['data']);
      this.product = this._productFromScratch();
    });
  }

  _productFromScratch() {
    return new Product(UUID.UUID(), '', 1, 1, '', 1);
  }

  newProduct() {
    // delete this.product.uuid;
    console.log('Guardando', this.product);
    this.productService.add('products', this.product);

    toast('Product have been saved!', 5000);

    // this.router.navigate(['/']);
  }

  getProduct() {
    console.log('cambiando en bbdd', this.product.uuid);
    this.productService.get(`products/${this.product.uuid}`).subscribe(
      (product) => { console.log('product to dit', product); this.product = product; }
    );
  }
}
