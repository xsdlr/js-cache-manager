import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  moduleName: 'js-cache-manager',
  targets: [
    { dest: 'dist/js-cache-manager.cjs.js', format: 'cjs' },
    { dest: 'dist/js-cache-manager.umd.js', format: 'umd' },
    { dest: 'dist/js-cache-manager.es.js', format: 'es' },
  ]
};
