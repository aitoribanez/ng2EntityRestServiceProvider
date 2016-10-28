import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// import { Employee }    from '../models/employee';
import ApiWrapperService from '../../../services/apiWrapper.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [ApiWrapperService]
})

export class ProductFormComponent implements OnInit {

  constructor(private productService: ApiWrapperService) { }

  // public model: Employee = {name: '', id: 1 };
  public errorMessage: string;
   complexForm: FormGroup;

  construct(formBuilder: FormBuilder) {
    this.complexForm = formBuilder.group({
      'firstName' : '',
      'lastName': '',
      'gender' : ['Female'],
      'hiking' : false,
      'running' : false,
      'swimming' : false
    })

  }

  ngOnInit() {
  }

  add(event) {
    console.log("add")
    event.preventDefault();
    
    let example =  {
      id: 100,
      name: 'Sakatu',
      photo: 'img/1.jpg',
      difficulty: 1,
      seedtime: 2,
      collecttime: 3 
    }

    this.productService.add('products', example)
      .subscribe(
        product => console.log(product),
        error =>  this.errorMessage = <any>error
      );
    // window.history.back();
  }

}
