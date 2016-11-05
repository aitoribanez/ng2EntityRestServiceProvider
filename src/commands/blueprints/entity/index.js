var path = require('path');
var chalk = require('chalk');
var Blueprint = require('ember-cli/lib/models/blueprint');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var findParentModule = require('../../utilities/find-parent-module').default;
var getFiles = Blueprint.prototype.files;
var stringUtils = require('ember-cli-string-utils');
var astUtils = require('../../utilities/ast-utils');
var NodeHost = require('@angular-cli/ast-tools').NodeHost;
module.exports = {
    description: '',
    availableOptions: [
        { name: 'flat', type: Boolean, default: false },
        { name: 'inline-template', type: Boolean, aliases: ['it'] },
        { name: 'inline-style', type: Boolean, aliases: ['is'] },
        { name: 'prefix', type: Boolean, default: true },
        { name: 'spec', type: Boolean }
    ],
    beforeInstall: function () {
        try {
            this.pathToModule = findParentModule(this.project, this.dynamicPath.dir);
        }
        catch (e) {
            throw "Error locating module for declaration\n\t" + e;
        }
    },
    normalizeEntityName: function (entityName) {
        var parsedPath = dynamicPathParser(this.project, entityName);
        this.dynamicPath = parsedPath;
        var defaultPrefix = '';
        if (this.project.ngConfig &&
            this.project.ngConfig.apps[0] &&
            this.project.ngConfig.apps[0].prefix) {
            defaultPrefix = this.project.ngConfig.apps[0].prefix + '-';
        }
        var prefix = this.options.prefix ? defaultPrefix : '';
        this.selector = stringUtils.dasherize(prefix + parsedPath.name);
        if (this.selector.indexOf('-') === -1) {
            this._writeStatusToUI(chalk.yellow, 'WARNING', 'selectors should contain a dash');
        }
        return parsedPath.name;
    },
    locals: function (options) {
        this.styleExt = 'css';
        if (this.project.ngConfig &&
            this.project.ngConfig.defaults &&
            this.project.ngConfig.defaults.styleExt) {
            this.styleExt = this.project.ngConfig.defaults.styleExt;
        }
        options.inlineStyle = options.inlineStyle !== undefined ?
            options.inlineStyle :
            this.project.ngConfigObj.get('defaults.inline.style');
        options.inlineTemplate = options.inlineTemplate !== undefined ?
            options.inlineTemplate :
            this.project.ngConfigObj.get('defaults.inline.template');
        options.spec = options.spec !== undefined ?
            options.spec :
            this.project.ngConfigObj.get('defaults.spec.component');
        console.log("options", options.args[1]);
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
            // predefined
            entityName: options.args[1],
            entityNameCapitalize: this._ucfirst(options.args[1])
        };
    },
    _ucfirst: function(string) {
        console.log("str", string)
      return string.charAt(0).toUpperCase() + string.substr(1);
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && this.options.inlineTemplate) {
            fileList = fileList.filter(function (p) { return p.indexOf('.html') < 0; });
        }
        if (this.options && this.options.inlineStyle) {
            fileList = fileList.filter(function (p) { return p.indexOf('.__styleext__') < 0; });
        }
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.component.spec.ts') < 0; });
        }
        return fileList;
    },
    fileMapTokens: function (options) {
        var _this = this;
        // Return custom template variables here.
        return {
            __path__: function () {
                var dir = _this.dynamicPath.dir;
                if (!options.locals.flat) {
                    dir += path.sep + options.dasherizedModuleName;
                }
                var srcDir = _this.project.ngConfig.apps[0].root;
                _this.appDir = dir.substr(dir.indexOf(srcDir) + srcDir.length);
                _this.generatePath = dir;
                return dir;
            },
            __styleext__: function () {
                return _this.styleExt;
            }
        };
    },
    afterInstall: function (options) {
        if (options.dryRun) {
            return;
        }
        var returns = [];
        var className = stringUtils.classify(options.entity.name + "Component");
        var fileName = stringUtils.dasherize(options.entity.name + ".component");
        var componentDir = path.relative(path.dirname(this.pathToModule), this.generatePath);
        var importPath = componentDir ? "./" + componentDir + "/" + fileName : "./" + fileName;
        if (!options['skip-import']) {
            returns.push(astUtils.addDeclarationToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(NodeHost); }));
        }
        return Promise.all(returns);
    }
};
