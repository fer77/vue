## 1

Getting started:

- `npm init -y`
- `npm install vue-test-utils --save-dev`
- `npm install vue`
- `npm install mocha mocha-webpack --save-dev`
- `npm install expect --save-dev`
- `npm install vue-template-compiler --save-dev`
- `npm install --save-dev jsdom jsdom-global`
- `npm install vue-loader --save-dev`

## 2

`webpack.config.js`

intersept any `.vue` file and run through `vue-loader`

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
}
```