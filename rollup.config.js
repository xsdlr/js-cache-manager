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
        { dest: 'dist/bundle.cjs.js', format: 'cjs' },
        { dest: 'dist/bundle.umd.js', format: 'umd' },
        { dest: 'dist/bundle.es.js', format: 'es' },
    ]
};
