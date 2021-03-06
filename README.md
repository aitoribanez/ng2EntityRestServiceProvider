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
- Un humano proporciona un fichero JSON con los datos de las entidades y sus campos.
- La app crea la API y CRUD usando materializecss y el fichero JSON proporcionado.

## Entity scaffolding. Use.

Run `ng generate:entity entity product` to generate a new product entity having a JSON file
as *product.json* with content like *node_modules/angular-cli-generate-entity/product.json* file. 

## Avances dados para poder hacer el comando de la manera que angular-cli lo hace

- El command de generate (que es el que he usado para la investigacion) esta en
*/node_modules/angular-cli/commands/generate.js*. He copiado ese fichero en la misma
direccion con nombre *entity.js*, cambiado el *name* que aparece en ese fichero 
por *entity* y en */node_modules/angular-cli/addon/index.js* en 
*includedCommands* he añadido esta linea *'entity': require('../commands/entity').default*,
Con estos tres cambios, ya tendriamos el comando de *ng generate component product* 
funcionando en *ng generate entity product*. Genera los ficheros en base a lo que hay en 
*/node_modules/angular/blueprints/entity/files*

- Si queremos añadir una nueva variable para poder imprimirla o usarla en la vista.
He seguido mirando como seria para el comando *ng generate. El "controlador" de la 
generacion de contenido para el comando *ng entity* esta en */node_modules/angular-cli/blueprints/component/index.js*. 
El array que devuelve el metodo *local*, son las variables que viajan a la vista. En nuestro ejemplo:

```
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
```

*custom* se ha añadido para la prueba. En *node_modules/angular-cli/blueprints/component/files/__name__.component.ts*
por ejemplo añadidos * <%= custom %>*. La siguiente vez que ejecutemos el comando, *ng entity entity product*
veremos los cambios.

### Como hacer que el command con su blueprint este lo mas fuera posible de node_modules/angular_cli.

Tanto la ruta de los blueprints como la de los commands se puede modificar desde node_modules/angular_cli/addon/index.js.
La ruta para los blueprint (que por desgracia solo puede ser una) esta en blueprintsPath y la de los commands por cada
comando se le define su ruta en includedCommands.

El inconveniente es que al *blueprint* solo admitir una ruta se han tenido que mover la carpeta node_modules/angular_cli/blueprint y
node_modules/angular_cli/utils a src/commands.

La solución, después de probar con enlaces simbolicos que daba mas que nuevos errores, un simple cp valía. Se ha
añadido comando nuevo de npm => *npm run updateNgBlueprint*

### Añadir plantillas(archivos) nuevas al blueprint

Copiar la plantilla que se quiera usar dentro de blueprint/entity/files

### Pasos a seguir para que el comando ng entity entity product funcione en un proyecto nuevo

De momento como angular-cli no viene pensado para crear personalizados, hay que tocar el propio paquete
de angular-cli de la siguiente manera:

~~1. *npm run updateNgBlueprint*: Actualiza los blueprint que tenemos en 'local' (src/commands/blueprints)
2. Ir a *node_modules/angular-cli/addon/index.js*, modificar *blueprintsPath*  por *return path.join(__dirname, '../blueprints');*
*return path.join(__dirname, '../../../src/commands/blueprints');* (linea 16)
3. En *node_modules/angular-cli/addon/index.js* tambien, añadir en *includedCommands*, 
*'entity': require('../../../src/commands/commands/entity').default*~~

(Esta solución no vale porque da un error de que no encuentra el módulo ast-utils de src/utilities/ast-utils.js.
No habido manera de solventarlo de una forma donde los blueprint esten en src/commands)

~~1. Copiar *src/commands/blueprints/entity* a *node_modules/angular-cli/blueprints*
2. En *node_modules/angular-cli/addon/index.js*, añadir en *includedCommands*, 
*'entity': require('../../../src/commands/commands/entity').default*~~

(Encontrada una manera más simple)

~~1. Copiar *src/commands/blueprints/entity* a *node_modules/angular-cli/blueprints*
2. En *node_modules/angular-cli/commands/generate.js*, al array *aliasMap*, añadir un nuevo elemento~~
con *en* como clave y *entity* como valor.

(Encontrada la forma correcta de hacerlo)

Clonado https://github.com/IgorMinar/angular-cli-github-pages y modificando al gusto el comando
https://github.com/aitoribanez/angular-cli-generate-entity para poder instalarlo directamente
desde github/npm con *npm install --save-dev aitoribanez/angular-cli-generate-entity*! :-)

- Clonar https://github.com/IgorMinar/angular-cli-github-pages que es un addon para angular-cli.
- Cambiar el nombre comando en *index.js* dentro del metodo includedCommands()
- Seguir modificando *lib/commands/entity.js* 

## Typings

ES6-shim: Dentro de el esta el typing para el findIndex() -> typings install dt~es6-shim --save --global

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
