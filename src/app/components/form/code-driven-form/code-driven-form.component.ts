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
  birthdateCtrl: FormControl;
  userForm: FormGroup;

  static isOldEnough(control: FormControl) {
    // control is a date input, so we can build the Date from the value
    const birthDatePlus18 = new Date(control.value);
    birthDatePlus18.setFullYear(birthDatePlus18.getFullYear() + 18); 
    return birthDatePlus18 < new Date() ? null : { tooYoung: true };
  }

  constructor(fb: FormBuilder) {
    this.usernameCtrl = fb.control('', Validators.compose([Validators.required, Validators
.minLength(3)]));
    this.passwordCtrl = fb.control('', Validators.required);
    this.birthdateCtrl = fb.control('', Validators.compose([Validators.required,
CodeDrivenFormComponent.isOldEnough]));

    this.userForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      birthdate: this.birthdateCtrl
    });
  }

  register() {
    console.log(this.userForm.value);
  }

  ngOnInit() {}

}
