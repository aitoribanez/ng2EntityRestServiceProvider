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
  type: string;
  product: Product;
  products: Product[] = [];
  products$: Observable<Product[]>;
  productEdit$: Observable<Product>;
  productDestroy$: Observable<string>;

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

    this.productEdit$ = this.productService.updateProduct$();
    this.productEdit$.subscribe(product => {
      console.log('cambiando en UI', product);
      let index = this.products.findIndex(product => product.uuid.toString() === this.product.uuid);
      this.products.splice(index, 1, product);
      this.product = this._productFromScratch();
    });

    this.productDestroy$ = this.productService.destroyProduct$();
    this.productDestroy$.subscribe(uuid => {
      console.log('cambiando en UI', uuid);
      uuid = uuid.split('/')[1];
      let index = this.products.findIndex(product => product.uuid.toString() === uuid);
      this.products.splice(index, 1);
    });
  }

  _productFromScratch() {
    this.type = 'new';
    return new Product(UUID.UUID(), '', 1, 1, '', 1);
  }

  newProduct() {
    console.log('Guardando', this.product);
    this.productService.add('products', this.product);
    toast('Product have been saved!', 5000);
  }

  getProduct() {
    this.type = 'edit';
    console.log('type', this.type);
    console.log('cambiando en bbdd', this);
    this.productService.get(`products/${this.product.uuid}`).subscribe(
      product => this.product = product
    );
  }

  editProduct() {
    console.log('editando en bbdd', this.product.uuid);
    this.productService.update(`products/${this.product.uuid}`, this.product);
    toast('Product have been updated!', 5000);
  }

  destroyProduct() {
    console.log('borrando en bbdd', this.product.uuid);
    this.productService.destroy(`products/${this.product.uuid}`);
    toast('Product have been deleted!', 5000);
  }
}
