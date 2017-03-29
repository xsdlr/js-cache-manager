const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const filesize = require('rollup-plugin-filesize');
const progress = require('rollup-plugin-progress');
const uglify = require('rollup-plugin-uglify');
const uglifyJS = require('uglify-js-harmony');
const version = process.env.VERSION || require('../package.json').version;
const moduleName = require('../package.json').name;

const banner = 
`/*
 * ${moduleName} v${version}
 * (c) xsdlr
 * Released under the MIT License.
 */
`;

const builds = {
  "full-umd": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/js-cache-manager.js'),
    format: 'umd',
    moduleName,
    banner
  },
  "prod-umd": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/js-cache-manager.min.js'),
    format: 'umd',
    sourceMap: true,
    plugins: [
      uglify({}, uglifyJS.minify)
    ],
    moduleName,
    banner
  },
  "esm": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/js-cache-manager.es.js'),
    format: 'es',
    moduleName,
    banner
  },
  "cjs": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/js-cache-manager.cjs.js'),
    format: 'cjs',
    moduleName,
    banner
  }
};

function genConfig(opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    moduleName: opts.moduleName,
    plugins: [
      replace({
        __VERSION__: version
      }),
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      progress(),
      filesize()
    ].concat(opts.plugins || [])
  }
  return config
}

exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]));
