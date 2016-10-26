import { Component, OnInit } from '@angular/core';

import ApiWrapperService from '../../lib/apiWrapper.service';
import { Product } from '../../entitys/product'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiWrapperService],
})

export class HomeComponent implements OnInit {
  title: string = 'app works!';
  products: Array<Product>;

  constructor(api: ApiWrapperService) {
    api
      .get('products')
      .subscribe(products => { 
        console.log(products);
        this.products = products
      });  
  }

  ngOnInit() {
  }

}
