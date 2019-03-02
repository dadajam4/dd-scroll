import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default ({ format }) => {
  const isES = format === 'es';
  const isIIFE = format === 'iife';
  const external = isES ? ['dd-event', 'dd-visibility'] : [];
  const nodeResolveTargets = ['bezier-easing'];
  if (!isES) nodeResolveTargets.push('dd-event', 'dd-visibility');

  const plugins = [
    typescript(),
    nodeResolve({
      only: nodeResolveTargets,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ];
  if (isIIFE) {
    plugins.push(uglify());
  }

  return {
    input: 'src/scroller.ts',
    external,
    output: {
      name: 'DDScroller',
      exports: 'named', // default
      // exports: 'default', // named
    },
    plugins,
  };
};
