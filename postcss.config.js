module.exports ={
  "map": false,
  "from": "src/index.css",
  "to": "dist/style.css",
  "plugins": {
    'postcss-import': {},
    'postcss-cssnext': {warnForDuplicates: false},
    'lost': {},
    'cssnano': {preset: 'advanced'},
    'css-mqpacker':{}
  }
}
