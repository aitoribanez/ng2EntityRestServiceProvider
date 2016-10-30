import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { toast } from 'angular2-materialize'

import ApiWrapperService from '../../../services/apiWrapper.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [ApiWrapperService]
})

export class ProductFormComponent implements OnInit {
  nameCtrl: FormControl;
  photoCtrl: FormControl;
  difficultyCtrl: FormControl;
  seedtimeCtrl: FormControl;
  collecttimeCtrl: FormControl;
  productForm: FormGroup;
  type: string;
  params: Object;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
  private router: Router, private productService: ApiWrapperService) {

   this.route.params.forEach((params: Params) => {
     this.type = Object.keys(params).length > 0 ? "edit" : "add";
     this.params = params;
   })

   if (this.type != 'add') {
     this.productService.edit(`products/${this.params['id']}`)
       .subscribe(product => { this._formConfig(fb, product) })
     // to dont get an error saying that form filed hasnt FormControl-ed added
     this._formConfig(fb, {})
     
   }  else {

     this._formConfig(fb, {})

   }
  }

  ngOnInit() {}

 /**
 * Can go to add or edit dependens on type
 */
  call() {
    this.type !== 'add' ? this.edit() : this.add();
  }

 /**
 * Save product on data store
 */
  add() {
    this.productService.add('products', this.productForm.value) 
      .subscribe(product => {
          toast('Product have been saved!', 5000)
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

 /**
 * Edit product on data store
 */
  edit() {
    this.productService.update(`products/${this.params['id']}`, this.productForm.value) 
      .subscribe(product => {
          toast('Product have been updated!', 5000)
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

  /**
 * Form configuration:
 *   - Define controls
 *   - Define group
 */
  _formConfig(fb, productForm) {
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
