import { Component, OnInit } from '@angular/core';

class User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-template-driven-form-2way',
  templateUrl: './template-driven-form-2way.component.html',
  styleUrls: ['./template-driven-form-2way.component.css']
})
export class TemplateDrivenForm2wayComponent implements OnInit {
  user = new User();

  constructor() { }

  ngOnInit() {
  }

  
  register() {
    console.log(this.user);
  }

}
