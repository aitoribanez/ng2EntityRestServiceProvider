# MacetoHuertoApp

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.18.

REST service for entitys on angular2. 

At least, an inyectable service for GET REST request using observables and promises.
Response is printed primarily on the screen.

## Prerequisites
1. Install [**N**ode.js](https://nodejs.org)
2. Install Angular CLI: `npm i angular-cli -g`
3. From project root folder install all the dependencies: `npm i`

## IDEA
Un humano proporciona fichero JSON con los datos de las entidades y sus campos.
La app crea la API y CRUD usando materializecss usando el fichero JSON proporcionado.

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

## Avances dados para poder hacer el comando de la manera que angular-cli lo hace

- El command de generate (que es el que he usado para la investigacion) esta en
*/node_modules/angular-cli/commands/generate.js*. He copiado ese fichero en la misma
direccion con nombre *entity.js*, cambiado el *name* que aparece en ese fichero 
por *entity* y en */node_modules/angular-cli/addon/index.js* en 
*includedCommands* he añadido esta linea *'entity': require('../commands/entity').default*,
Con estos tres cambios, ya tendriamos el comando de *ng generate component product* 
funcionando en *ng generate entity entity product*. Genera los ficheros en base a lo que hay en 
*/node_modules/angular/blueprints/entity/files*

- Si queremos añadir una nueva variable para poder imprimirla o usarla en la vista.
He seguido mirando como seria para el comando *ng generate. El "controlador" de la 
generacion de contenido para el comando *ng entity* esta en */node_modules/angular-cli/blueprints/component/index.js*. 
El array que devuelve el metodo *local*, son las variables que viajan a la vista. En nuestro ejemplo:

return {
      dynamicPath: this.dynamicPath.dir.replace(this.dynamicPath.appRoot, ''),
      flat: options.flat,
      spec: options.spec,
      inlineTemplate: options.inlineTemplate,
      inlineStyle: options.inlineStyle,
      route: options.route,
      isAppComponent: !!options.isAppComponent,
      selector: this.selector,
      styleExt: this.styleExt,
      custom: 'CUSTOM STRING'
    };

*custom* se ha añadido para la prueba. En *node_modules/angular-cli/blueprints/component/files/__name__.component.ts*
por ejemplo añadidos * <%= custom %>*.

## RELEASES

v0.3.0 -> CRUD funcionando manualmente para una entity (products)
