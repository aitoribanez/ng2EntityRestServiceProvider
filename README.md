# MacetoHuertoApp

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.18.

REST service for entitys on angular2. 

At least, an inyectable service for GET REST request using observables and promises.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## CAMBIOS

angular-cli viene en la version 1.0.0-beta.17. Asi, al hacer un 
ng new my-super-app da el siguiente error:


npm ERR! git rev-list -n1 7e55907cd54a2e91b96d25a660acc6a2a6453f54: 
fatal: bad object 7e55907cd54a2e91b96d25a660acc6a2a6453f54

Se ha tenido que bajar la version de angular-cli a la version 1.0.0-beta.15
para evitar dicho error. EL error es apartir de la version 1.0.0-beta.16

Issue creada por si les ayuda y nos aporta algo de informacion:

https://github.com/angular/angular-cli/issues/2788

Fixed apartir de la version 1.0.0-beta.18
