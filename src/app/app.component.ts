import { Component } from '@angular/core';

import ApiWrapperService from './lib/apiWrapper.service';
import { Product } from './entitys/product'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiWrapperService],
})

export class AppComponent {
  title: string = 'app works!';
  products: Array<Product>;

  constructor(api: ApiWrapperService) {
    api
      .get('products')
      .then(products => { 
        console.log(products);
        this.products = products
      });  
  }
  
}