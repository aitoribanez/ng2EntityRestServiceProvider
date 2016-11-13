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

  constructor(private productService: ApiWrapperService) { }

  ngOnInit() {
    this.product = new Product('', 1, 1, '', 1);
  }

  guardarProducto() {
    console.log(`Guardando ${JSON.stringify(this.product)}`);
    this.productService.add('products', this.product)
      .subscribe(product => {
        toast('Product have been saved!', 5000);
       // this.router.navigate(['/']);
      }
      // error =>  this.errorMessage = <any>error
      );
  }

}
