import { Component } from '@angular/core';
import ApiWrapperService from './lib/apiWrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiWrapperService],
})

export class AppComponent {
  title: string = 'app works!';

  constructor(api: ApiWrapperService) {
    console.log(api.get('products'));
  }
  
}