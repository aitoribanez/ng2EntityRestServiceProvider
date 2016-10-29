import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private fb: FormBuilder, private router: Router, 
  private flash: FlashMessagesService, private productService: ApiWrapperService) {
    
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

  ngOnInit() {}

  add() {
    this.productService.add('products', this.productForm.value)
      .subscribe(
        product => {
          this.flash.show('Product have been saved!', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

}
