# generator-simple-js [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Generates the basic structure for a simple development environment using [Gulp](https://gulpjs.com/) and [browserSync](https://www.browsersync.io/). Also, may or may not include [Bootstrap](https://getbootstrap.com/) and [SASS](https://sass-lang.com/).

## Installation

First, install [Yeoman](http://yeoman.io) and generator-simple-js using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/) and [Gulp.js](https://gulpjs.com/)).

```bash
npm install -g gulp
npm install -g yo
npm install -g generator-simple-js
```

Then generate your new project:

```bash
yo simple-js
```

## What do you get?

Scaffold the next project directory structure:

```
.
├── gulpfile.js
├── package.json
└── src
    ├── assets
    ├── css
    ├── index.html
    ├── js
    └── scss
        └── styles.scss
```

## What's next?

Once the project has been created you need to go to the project folder by typing in the terminal `cd project-folder`. Inside, you'll need to run the next command:

```bash
gulp
```

That command by itself will add the required CSS and JS files to the proper folders and also will launch the project in your default browser, so you can comfortably start coding and each change made in any JS, CSS/SASS, HTML file, the browser will reload with the new changes.

If you want to add more capabilities to your project, feel free to check on [Gulp.js](https://gulpjs.com/) documentation.

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## Contributing

I'm pretty new to the Open Source community, so, every contribution will be more than helpful to me and to the project, too.

I've created a template for pull requests, but if someone out there has any suggestion on improve template for the template (😆), please help on it, too.

## License

MIT © [Alonso Vazquez](https://alonsovzqz.github.io/)

[npm-image]: https://badge.fury.io/js/generator-simple-js.svg
[npm-url]: https://npmjs.org/package/generator-simple-js
[travis-image]: https://travis-ci.com/alonsovzqz/generator-simple-js.svg?branch=master
[travis-url]: https://travis-ci.com/alonsovzqz/generator-simple-js
[daviddm-image]: https://david-dm.org/alonsovzqz/generator-simple-js.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/alonsovzqz/generator-simple-js
