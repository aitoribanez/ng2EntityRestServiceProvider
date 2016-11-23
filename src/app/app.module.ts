import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterializeDirective } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AboutComponent } from './components/about/about.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { TemplateDrivenFormComponent } from './components/form/template-driven-form/template-driven-form.component';
import { TemplateDrivenForm2wayComponent } from './components/form/template-driven-form-2way/template-driven-form-2way.component';
import { CodeDrivenFormComponent } from './components/form/code-driven-form/code-driven-form.component';
import { ProductResolve } from './product/product-form/product-resolve';
import { ProductsResolve } from './product/product-list/products-resolve';
import ApiWrapperService from './services/apiWrapper.service';
import { ProductComponent } from './product/product.component';

const routing = RouterModule.forRoot([
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    // { path: 'newProductWay', component: ProductComponent, resolve: { products: ProductsResolve } },
    { path: 'product', component: ProductComponent, resolve: { products: ProductsResolve } },
    // { path: 'product/new', component: ProductFormComponent },
    // { path: 'product/edit/:id', component: ProductFormComponent, resolve: { product: ProductResolve } },
    // { path: 'product/destroy/:id', component: ProductDestroyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'templatedriven1way', component: TemplateDrivenFormComponent },
    { path: 'templatedriven2way', component: TemplateDrivenForm2wayComponent },
    { path: 'codedriven', component: CodeDrivenFormComponent }
])

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductComponent,
    TemplateDrivenFormComponent,
    TemplateDrivenForm2wayComponent,
    CodeDrivenFormComponent,
    MaterializeDirective,
    ProductComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    routing
  ],
  providers: [
    ProductResolve,
    ProductsResolve,
    ApiWrapperService,
    ProductFormComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
