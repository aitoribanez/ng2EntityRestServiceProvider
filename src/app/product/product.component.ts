import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

  // text: string;
  results: string[] = [];
  msgs: any[] = [];

  constructor(private productService: ApiWrapperService) { }

  search(event) {
    console.log('event', event.query);
    this.productService.get('products')
      .flatMap((results: Array<Product>) => results)
      .map(products => products.name)
      // .do(products => console.log('ANTES', products))
      .subscribe(products => { console.log('products', products); this.results.push(products); });
  }

  select(event) {
    console.log('event', event);
  }

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
    this.msgs.push({ severity: 'success', summary: 'Product', detail: `new added ${this.product.name}` });
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
    this.msgs.push({ severity: 'success', summary: 'Product', detail: `edited ${this.product.name}` });
  }

  destroyProduct() {
    console.log('borrando en bbdd', this.product.uuid);
    this.productService.destroy(`products/${this.product.uuid}`);
    this.msgs.push({ severity: 'success', summary: 'Product', detail: `deleted ${this.product.name}` });
  }
}
