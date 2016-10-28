import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

class User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-code-driven-form',
  templateUrl: './code-driven-form.component.html',
  styleUrls: ['./code-driven-form.component.css']
})
export class CodeDrivenFormComponent implements OnInit {
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  userForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.usernameCtrl = fb.control('', Validators.compose([Validators.required, Validators
.minLength(3)]));
    this.passwordCtrl = fb.control('', Validators.required);
 
    this.userForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });
  }

  register() {
    console.log(this.userForm.value);
  }

  ngOnInit() {}

}
