import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './script/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
  },
  plugins: [resolve(), commonjs({include: 'node_modules/**'})],
};
