import { Component } from '@angular/core';
import ApiWrapperService from './lib/apiWrapper.service';

import { apiWrapperServiceProvider } from './lib/apiWrapper.service.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [apiWrapperServiceProvider],
})

export class AppComponent {
  title: string = 'app works!';

  constructor(api: ApiWrapperService) {
    console.log(api.get());
  }
  
}