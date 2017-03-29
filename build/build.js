const fs = require('fs');
const path = require('path');
const rollup = require('rollup');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

const builds = require('./config').getAllBuilds();
builds.forEach((build) => buildEntry(build));

function buildEntry(config) {
  rollup
    .rollup(config)
    .then((bundle) => {
      bundle.write(config);
    });
}
