import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { toast } from 'angular2-materialize';

import ApiWrapperService from '../../services/apiWrapper.service';
import { Product } from '../datos.model';

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
  @Input() product: Product;
  @Output() guardar: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {

    // this.type = Object.keys(this.route.snapshot.params).length > 0 ? "edit" : "add";

    /* if (Object.keys(this.route.snapshot.params).length <= 0) {
      this.type = 'Add';
      this.formConfig(fb, {});
    } else if (window.location.pathname.indexOf('edit') !== -1) {
      this.type = 'Edit';
      this.formConfig(fb, this.route.snapshot.data['product']);
    } else {
      this.type = 'Destroy';
      // this.formConfig(fb, {});
    } */

  }

  ngOnInit() {}

  newProduct() {
    console.log('PRDUCTt', this.product);
    this.guardar.emit(this.product);
    this.type = 'new';
  }

  editProduct() {
    this.type = 'edit';
     console.log('PRDUCTto a editar', this.product);
     this.edit.emit(this.product);
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
