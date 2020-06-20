"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const _ = require("lodash");
const chalk = require("chalk");
const cowsay = require("cowsay");

function generatorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf("generator-") === 0 ? name : `generator-${name}`;
  return name;
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
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
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
  }

  install() {
    this.installDependencies();
  }
};
