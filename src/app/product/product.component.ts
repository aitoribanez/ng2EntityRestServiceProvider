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
  // products$: Observable<Product[]>;

  constructor(private productService: ApiWrapperService) { }

  ngOnInit() {
    this.product = new Product('', 1, 1, '', 1);
    this.productService.get('products').subscribe(products => this.products = products.reverse());
    // this.products$ = this.productService.getProducts$();
    // this.products$.subscribe(d => this.products = d );
  }

  guardarProducto() {
    console.log(`Guardando ${JSON.stringify(this.product)}`);
    this.productService.add('products', this.product) // devuelve un Observable<Response>
      .map((product) => product.json()) // devuelve un objeto
      .subscribe(product => {
        this.products.unshift(product);
        toast('Product have been saved!', 5000);

        // this.router.navigate(['/']);
      },
      error => console.log('componnent.guardarProducto() error'));
  }

}
