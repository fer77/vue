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

## 3

`.only` triggers only that part of the test:

```javascript
//...
it.only('decrements the count when an decrement button is clicked', () => {
        //...
```

[https://vue-test-utils.vuejs.org/en/api/wrapper/hasStyle.html](hasStyle)


the `.hasStyle('display', 'none')` method accepts any css property/value and assert wether thats `.toBe(true)` or `.toBe(false)`.

[https://vue-test-utils.vuejs.org/en/api/wrapper/setData.html](setData)

if we don't want the UI to set the count, then set it automatically:

```javascript
//...
     wrapper.setData({ count: 1 })
//...
```