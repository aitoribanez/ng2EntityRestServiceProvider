import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { toast } from 'angular2-materialize';

import ApiWrapperService from '../../services/apiWrapper.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  // providers: [ApiWrapperService, ProductResolve]
})

export class ProductFormComponent implements OnInit {
  nameCtrl: FormControl;
  photoCtrl: FormControl;
  difficultyCtrl: FormControl;
  seedtimeCtrl: FormControl;
  collecttimeCtrl: FormControl;
  productForm: FormGroup;
  type: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
  private router: Router, private productService: ApiWrapperService) {

   // this.type = Object.keys(this.route.snapshot.params).length > 0 ? "edit" : "add";

   if (Object.keys(this.route.snapshot.params).length <= 0) {
     this.type = 'Add';
     this.formConfig(fb, {});
   } else if(window.location.pathname.indexOf('edit') !== -1){
     this.type = 'Edit';
     this.formConfig(fb, this.route.snapshot.data['product']);
   } else {
     this.type = 'Destroy';
     // this.formConfig(fb, {});
   }

  }

  ngOnInit() {}

 /**
 * Can go to add or edit dependens on type
 */
  call() {
    if(this.type === 'Add') { this.add(); }
    else if(this.type === 'Edit') { this.edit(); }
    else { this.destroy(this.route.snapshot.params['id']); }
  }

 /**
 * Save product on data store
 */
  add() {
    this.productService.add('products', this.productForm.value) 
      .subscribe(product => {
          toast('Product have been saved!', 5000);
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

 /**
 * Edit product on data store
 */
  edit() {
    this.productService.update(`products/${this.route.snapshot.params['id']}`, this.productForm.value) 
      .subscribe(product => {
          toast('Product have been updated!', 5000);
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

  /**
 * Destroy product on data store
 */
  destroy(id) {
    this.productService.destroy(`products/${id}`)
       .subscribe(product => {
          toast('Product have been deleted!', 5000);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

/**
 * Form configuration:
 *   - Define controls
 *   - Define group
 */
  formConfig(fb, productForm) {
      this.nameCtrl = fb.control(productForm.name || '', Validators.compose([Validators.required, Validators
.minLength(4)]));
    this.photoCtrl = fb.control(productForm.photo || '', Validators.required);
    this.difficultyCtrl = fb.control(productForm.difficulty || '', Validators.required);
    this.seedtimeCtrl = fb.control(productForm.seedtime || '', Validators.required);
    this.collecttimeCtrl = fb.control(productForm.collecttime || '', Validators.required);

    this.productForm = fb.group({
      id: UUID.UUID(),
      name: this.nameCtrl,
      photo: this.photoCtrl,
      difficulty: this.difficultyCtrl,
      seedtime: this.seedtimeCtrl,
      collecttime: this.collecttimeCtrl
    });
  }

}
