import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { toast } from 'angular2-materialize';

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
    this.product = new Product('', 1, 1, '', 1);
    this.productService.get('products').subscribe(products => this.products = products.reverse());
    // da la foto del estado de this.products
    this.products$ = this.productService.getProducts$();
    // cuando un cambio en this.products entra aqui
    this.products$.subscribe(product => {
      product['data'] = product;
      this.products.unshift(product['data'])
    });
  }

  guardarProducto() {
    console.log("Guardando", this.products);
    this.productService.add('products', this.product);

    toast('Product have been saved!', 5000);

    // this.router.navigate(['/']);
  }

}
