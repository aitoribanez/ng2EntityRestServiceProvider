import { Http } from '@angular/http';

import ApiWrapper from './apiWrapper';
import ApiWrapperService from './apiWrapper.service';

let apiWrapperFactory = (http: Http, model: ApiWrapper) => {
  return new ApiWrapperService(http, {url: 'products'});
};

export let apiWrapperServiceProvider = { 
  provide: ApiWrapperService,
  useFactory: apiWrapperFactory,
  deps: [Http]
}
