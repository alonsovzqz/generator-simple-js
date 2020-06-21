"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const _ = require("lodash");
const extend = require("deep-extend");
const mkdirp = require("mkdirp");
const chalk = require("chalk");
const cowsay = require("cowsay");

function generatorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf("generator-") === 0 ? name : `generator-${name}`;
  return name;
}

function generatePkgDependenciesFile(options) {
  const pkgObj = {
    dependencies: {
      "gulp-cli": "^2.3.0"
    },
    devDependencies: {
      gulp: "^4.0.2",
      "browser-sync": "^2.26.7"
    }
  };

  if (options.addBootstrap) {
    pkgObj.devDependencies["bootstrap"] = "^4.5.0";
  }

  switch (options.stylesPreprocessor) {
    case "LESS":
      pkgObj.dependencies["less"] = "~3.11.3";
      pkgObj.devDependencies["gulp-less"] = "^4.0.1";
      break;
    case "SASS":
    case "SCSS":
      pkgObj.dependencies["sass"] = "~1.26.8";
      pkgObj.devDependencies["gulp-sass"] = "^4.1.0";
      break;
  }

  return pkgObj;
}

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }
  prompting() {
    this.log(
      cowsay.say({
        text: `Welcome to the pioneering ${chalk.red(
          "generator-simple-js"
        )} generator!`
      })
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "What's the name of the project?",
        default: generatorName(path.basename(process.cwd()))
      },
      {
        type: "confirm",
        name: "addBootstrap",
        message: "Would you like to use Bootstrap?",
        default: true
      },
      {
        type: "list",
        name: "stylesPreprocessor",
        choices: ["CSS", "SASS", "SCSS", "LESS"],
        default: 0
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        `Your project must be inside a folder named ${this.props.projectName}\nI'll create that folder for you`
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

    this.composeWith(require.resolve("generator-node/generators/app"), {
      boilerplate: false,
      name: this.props.projectName,
      git: false,
      travis: false,
      skipInstall: true,
      readme: ""
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
    const dependenciesPkg = generatePkgDependenciesFile(this.props);

    extend(pkg, dependenciesPkg);
    pkg.keywords = pkg.keywords || [];

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);

    this.fs.copyTpl(
      this.templatePath("src/index.html"),
      this.destinationPath("src/index.html"),
      {
        projectName: this.props.projectName,
        isPrecompiled:
          this.props.stylesPreprocessor === "SASS" ||
          this.props.stylesPreprocessor === "SCSS" ||
          this.props.stylesPreprocessor === "LESS",
        includeBootstrap: this.props.addBootstrap
      }
    );
  }

  install() {
    this.installDependencies();
  }
};
