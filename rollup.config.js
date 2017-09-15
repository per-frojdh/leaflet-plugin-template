import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import progress from 'rollup-plugin-progress'
import filesize from 'rollup-plugin-filesize'

const pkg = require('./package.json')
const { camelCase } = require('lodash')

const libraryName = 'leaflet-lib'
// const isProduction = process.env.BUILD && process.env.BUILD === 'production'

const plugins = (minify) => {
  const list = [
    commonjs({
      sourceMap: false,
      include: 'node_modules/**',
    }),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      jsnext: true,
      main: true
    }),

    // Extras
    progress({
      clearLine: false,
    }),
    filesize(),
  ]

  if (minify) {
    list.unshift(
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      uglify()
    )
  }
  return list;
}



// Custom warning assert, to avoid warnings regarding a warning that rollup
// will announce due to way TypeScript outputs javascript.
// Will only disregard a certain type of warning.
const onWarning = function(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return
  }
  console.error(warning.message)
}

export default [{
  entry: `src/index.js`,
  dest: pkg.browser,
  format: 'umd',
  moduleName: 'L.MyPlugin',
  external: ['leaflet'],
  globals: {
    'leaflet': 'L'
  },
  plugins: plugins(false),
  onwarn: onWarning
}, {
  entry: `src/index.js`,
  dest: pkg.minified,
  format: 'umd',
  moduleName: 'L.MyPlugin',
  external: ['leaflet'],
  globals: {
    'leaflet': 'L'
  },
  plugins: plugins(true),
  onwarn: onWarning
}]
