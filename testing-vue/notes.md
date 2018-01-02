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

## 4

Test doesn't test implementation, only that the test gets what it espects.  All this can be tested without opening the browser.

`wrapper.contains` will expect an element name or its tag name.

```javascript
//...
expect(wrapper.contains('ul')).toBe(false);
//...
```

`expect().toContain` checks for text to exist in an element.

```javascript
//...
expect(wrapper.find('ul').text()).toContain('Go to store');
//...
```

## 5

Do not test implementation details.

`.toBeTruthy()` not the boolean, but a value that evaluates to `true` or `false`.

## 6

[https://vue-test-utils.vuejs.org/en/guides/testing-SFCs-with-mocha-webpack.html](workflow):

- `npm install --save-dev vue-test-utils mocha mocha-webpack`
- `npm install --save-dev jsdom jsdom-global`
- `npm install --save-dev expect`

setup a test script with the paths to setup the test and perform the tests:

`"test": "mocha-webpack --webpack-config=node_modules/laravel-mix/setup/webpack.config.js --require test/js/setup.js tests/js/**/*.spec.js"`

add files to test and write some tests:

- import files:

```javascript
// example.spec.js
import { mount } from 'vue-test-utils';
import expect from 'expect';
import Example from '../../resources/assets/js/components/ExampleComponent.vue';
//...
```

-describe your tests:

```javascript
// example.spec.js
describe('Example', () => {
    it('says that it is an example component', () => {
        let wrapper = mount(Example);

        expect(wrapper.html()).toContain('Example Component');
    });
});
//...
```

## 7

think of `props` as inmutable. this can be done by initializing the prop and setting its default value equal to what is passed in from the prop. something like:

```javascript
export default {
        props: ['dataQuestion'],

        data() {
            return {
                question: this.dataQuestion,
                editing: false
            };
        }
    }
```

has same effect as

```html
<!-- gets assigned to the data property -->
 <question data-question="{}"></question>
```

## 8

[https://github.com/axios/moxios](Moxios), a first-party library for mocking Axios requests.

set up:

- `import moxios from 'moxios'`
- import and pass your custom axios instance to this method
    `moxios.install()`
- then uninstall
    `moxios.uninstall()`

```javascript
// Question.spec.js

import moxios from 'moxios'

beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install()
    })

afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
})

// Match against an exact URL value
    //...
        moxios.stubRequest('/say/hello', {
            status: 200,
            responseText: 'hello'
        })
    //...
    // wait for the request to complete:
        moxios.wait(function () {
            // then we can perform our assertions here.
            done()
        })
    //...
```

use the `done()` when there are asynchronous calls in a test. This will "manually" tell our test suite (Mocha) when our test is done.

_Sinon_ and _test double_ are better options, because they are more generic.

## 9

in Vue _computed properties_ are cached.

## 10

`async`