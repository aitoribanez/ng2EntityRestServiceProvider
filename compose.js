'use strict';

// var util = require('util');
var spawn = require('child_process').spawn;

var entityName = process.argv[2];
var form = spawn('ng', ['entity', 'entity', entityName + '-form']);
var list = spawn('ng', ['entity', 'entity', entityName + '-list']);

form.stdout.on('data', function (data) {
  console.log('FORM: ' + data);
});

list.stdout.on('data', function (data) {
  console.log('LIST: ' + data);
});
