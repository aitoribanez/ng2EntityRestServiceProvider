import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
// import { toast } from 'angular2-materialize';
import { config } from '../config';
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
  error: string;
  @Input() type: string;
  @Input() product: Product;
  @Output() guardar: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @ViewChild('form') form;

  filesToUpload: Array<File> = [];
  months: any = [];

  constructor(private fb: FormBuilder, private http: Http) {}

  ngOnInit() {
    config.es.months.map((month, x) => this.months.push({ label: month, value: x + 1 }));
    // this.months.push({label: 'New York', value:{id: 1, name: 'New York', code: 'NY'}});
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    // for (let i = 0; i < files.length; i++) {
    formData.append('uploads[]', files[0], files[0]['name']);
    // }

    this.http.post('http://localhost:3001/upload', formData)
      .map(files => files.json())
      .subscribe(
        files => console.log('files', files),
        err => { 
          this.error = err._body.split('<br>')[0], 
          this.form.nativeElement.reset() },
        () => this.form.nativeElement.reset()
      )
  }
  
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.product.photo = fileInput.target.files[0]['name'];
  }

  call() {
    this.formConfig(this.fb, {});
    console.log('type', this.type);

    this.upload();
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
