import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductComponent, ProductListComponent, ProductFormComponent],
  exports: [ProductModule]
})
export class ProductModule { }
