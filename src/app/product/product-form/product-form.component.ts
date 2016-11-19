import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
// import { toast } from 'angular2-materialize';

// import ApiWrapperService from '../../services/apiWrapper.service';
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
  @Input() type: string;
  @Input() product: Product;
  @Output() guardar: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() { }

  call() {
    this.formConfig(this.fb, {});
    console.log('type', this.type);
    if (this.type === 'new') {
      // this.type = 'Add';
      this.newProduct();
    } else if (this.type === 'edit') {
      // this.type = 'Edit';
      this.editProduct();
    }
  }

  newProduct() {
    console.log('PRDUCTt', this.product);
    this.guardar.emit(this.product);
  }

  editProduct() {
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
