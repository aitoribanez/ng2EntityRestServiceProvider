import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

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

  constructor(fb: FormBuilder, private productService: ApiWrapperService) {
    this.nameCtrl = fb.control('', Validators.compose([Validators.required, Validators
.minLength(4)]));
    this.photoCtrl = fb.control('', Validators.required);
    this.difficultyCtrl = fb.control('', Validators.required);
    this.seedtimeCtrl = fb.control('', Validators.required);
    this.collecttimeCtrl = fb.control('', Validators.required);

    this.productForm = fb.group({
      id: UUID.UUID(),
      name: this.nameCtrl,
      photo: this.photoCtrl,
      difficulty: this.difficultyCtrl,
      seedtime: this.seedtimeCtrl,
      collecttime: this.collecttimeCtrl
    });
  }

  ngOnInit() {
  }

  add() {
    console.log(this.productForm.value);

    this.productService.add('products', this.productForm.value)
      .subscribe(
        product => console.log(product)
        // error =>  this.errorMessage = <any>error
      );
  }

}
