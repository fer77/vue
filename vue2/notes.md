## 1

**v-model** directive to create two-way data bindings on form input and textarea elements.

1. create a Vue instance:

```javascript
new Vue({});
```

2. bind it to an element in the DOM:

```javascript
new Vue({
  el:'#root'
});
```

3. specify some data:

```javascript
new Vue({
  el:'#root',
  data: {
    message: 'Hello World!'
  }
});
```

4. for inputs use the `v-model` directive:

```html
<div id="root">
  <input id="input" type="text" v-model="message">
  <p>The value of our input is {{ message }}.</p>
</div>
```

## 2

Vue _proxies_ your data so that it can be accessed (in dev tools) as:

```javascript
$vm0.message;

// can be changed here tools
$vm0.message = 'changed';
```

**single source of truth** this data object defines our truth:

```javascript
//...
data: {
  message: 'Hello World!'
}
//...
```

Our data becomes our single source of truth.

## 3

**v-for** directive can be used to render a list of items based on an array. The `v-for` directive requires the special syntax of `item in items`, where `items` is the array's data and `item` is the alias for the array element being iterated on. You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript’s syntax for iterators.

Inside `v-for` blocks we have full access to parent scope properties.

_Side Note_
---
```html
<li v-for="name in names">{{ name }}</li>
<!-- or -->
<li v-for="name in names" v-text="name"></li>
```
---

## 4

`v-on` listens to DOM events and runs some JavaScript when triggered. When used on a normal element, `v-on` listens to **native DOM events** only. When used on a custom element component, it also listens to **custom events** emitted on that child component.

**shorthand**: `@`

`v-on:click`
`v-on:keyUp`

## 5

**v-bind** dealing with string concatenation is annoying and can be error-prone. `v-bind` is used with `class` and `style` to manipulate an element’s class list, inline styles and attributes.

**shorthand**: `:`

Bind the title attribute for a tag to whatever is in the data object called title:

```html
<!-- ... -->
<button v-bind:title="title">Hello</button>
<!-- ... -->
```

Objects can be passed to toggle classes:

```html
<!-- ... -->
<button v-bind:title="{ 'isLoading' : isLoading }" @click="toggleClass">Toggle</button>
<!-- ... -->
```

## 6

In-template expressions are very convenient, but they are meant for simple operations:

```html

<!-- ... -->
  <h1 v-text="new Date()"></h1>
<!-- ... -->

```

Complex logic, you should use a computed property.

```html

<!-- ... -->
  <h1>{{ message.split('').reverse().join('') }}</h1>
<!-- ... -->
  <h1>{{ reverseText }}</h1>
<!-- ... -->

```

```javascript

//...
computed: {
  reverseText() {
    return this.message.split('').reverse().join('');
  }
}
//...

```

## 7

**components** extend basic HTML elements and encapsulate reusable code. At a high level, components are custom elements that Vue attaches behavior to.

Anything inside the `<slot>` tags is considered _fallback content_.


Components cannot use `data:` object inside a component. `data()` must be a function that returns an object:

```javascript
//...

  data: function () {
    return //...
  }

//...
```

## 8

Whenever a template is in a component, it needs to have a single root element.

## 9

A **prop** is a custom attribute for passing information from parent components. A child component needs to _explicitly_ declare the `props` it expects to receive using the `props` option:

```javascript
Vue.component('child', {
  // declare the props
  props: ['message'],
  // like data, the prop can be used inside templates and
  // is also made available in the vm as this.message
  template: '<span>{{ message }}</span>'
})
```

Then we can pass a plain string to it like so:

```html
<child message="hello!"></child>
```

## 10

A parent-child component relationship works as **props down**, **events up**. The parent passes data down to the child via **props**, and the child sends messages to the parent via **events**:

```html
  <modal v-show="showModal" @close="showModal = false"></modal>
  <button class="button is-info" @click="showModal = true">Modal</button>
```

```javascript
Vue.component('modal', {
  template: `
  <!-- //... -->
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  <!-- //... -->
  `
});

var app = new Vue({
//...
  data: {
    showModal: false
  }
});
```

## 11

Remember that _props_ are immutable.  If mutability is desired use computed properties.

## 12

Communication between components:

1. Vue root instance needs to be notified when a coupon is applied `@` (`v-on`):

```html
<!-- //... -->
<coupon @applied="onCouponApplied"></coupon>
<!-- //... -->
```

Parent component depends on an event being `$emit`[ed] from a child component:

```javascript
Vue.component('coupon', {
  template: `<input placeholder="Enter coupon code" @blur="onCouponApplied" />`,
  methods: {
    onCouponApplied() {
      this.$emit('applied');
    }
  }
});

var app = new Vue({
  //...
  data: {
    couponApplied: false
  },
  methods: {
    onCouponApplied() {
      this.couponApplied = true;
    }
  }
});
```

## 13

Any new Vue instance can listen(`$on`) and emit(`$emit`) events.

Empty Vue instance as a central event bus:

```javascript
window.Event = new class {
  constructor() {
    this.vue = new Vue();
  }
  fire(event, data = null) {
    this.vue.$emit(event, data);
  }
  listen(event, callback) {
    this.vue.$on(event, callback);
  }
}
```

## 14

`<slot>` elements have a special attribute, `name`, which is great for 'slotting' content into components. You can have multiple slots with different names. A named slot will match any element that has a corresponding slot attribute in the content fragment.

## 15

When the **inline-template** attribute is present on a child component, the component will use that content as its template, rather than treating it as distributed content. This allows more flexible templating. However, _inline-template_ makes the scope of your templates harder to reason about. It is prefered that templates be defined inside a component using the `template` option or in a `template` element in a `.vue` file.

## 16

**Webpack** and **vue-cli**

[Vue-loader](https://vue-loader.vuejs.org/en/start/setup.html)

Getting started:

- `npm install -g vue-cli`
- `vue init webpack-simple hello-vue`
- `cd hello-vue`
- `npm install`
- `npm run dev`

`webpack.config.js`:
**loaders** give us a way to apply preprocessing to anything that is required in the app.
```javascript
//...
test: /\.vue$/, //Looks for any .vue file and applies the 'vue-loader'
loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
                  }
      },
      {
        test: /\.js$/, //Looks for any .js files
        loader: 'babel-loader',
        exclude: /node_modules/ //except in here.
      },
      // other vue-loader options go here
//...
```

`package.json`
```javascript
// adds comands reletaed to the project:
  "scripts": {
    // dev boots up our server: boots up the node environment to development, boots up webpack-dev-server, and adds hot reloading (live-server).
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
```

Importing a component:
```javascript
//...
import Message from './components/Message.vue'; //1. Import component.
export default {
  name: 'app',
  components: { Message }, //2. Add it to the list of child components.
  data () {
    return {}
  }
}
//...
```

## 17

**hot reloading** is reloading the page when you edit a `*.vue` file _without reloading_ the page. It preserves the current state of your app and these swapped components!

## 18

When working on a project with blade and using vue, scape `{{}}` with an `@` or use `v-text="skills"` instead of `{{}}`.

```html
<li v-for="skill in skills">@{{ skill }}</li>
```

axios is the recomended aproach by Vue and not  Vue resource.

## 19 - 21

forms:
a class to handle errors can be created in our vue app.

```javascript
// app.js
class Errors {
  constructor() {
    this.errors = {};
  }
  has(field) {
    return this.errors.hasOwnProperty(field);
  }
  any() {
    return Object.keys(this.errors).length > 0;
  }
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }
  record(error) {
    this.errors = errors;
  }
  clear(field) {
    if {
      (field) delete this.errors[field];
      return;
    }
    this.errors = {};
  }
}
class Form {
  constructor(data) {
    this.data = data;
    for (let field in data) {
      this[field] = data[field];
    }
    this.errors = new Errors();
  }
  data() {
    let data = {}

    for (let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }
  reset() {
    for (let field in this.originalData) {
      this[field] = '';
    }

        this.errors.clear();
  }
  submit(requestType, url) {
    return new Promise((resolve, reject) => {
        axios[requestType](url, this.data())
              .then(response => {
                this.onSuccess(response.data);

                resolve(response.data);
              })
              .catch(reject => {
                this.onfail(error.response.data);

                reject(error.response.data);
              });
      });
  }
  onSuccess(data) {
    // this
    alert(data.message);

    this.reset();
  }
  onFail(errors) {
    this.errors.record(errors);
  }
}
new Vue({
  //...
  data: {
    form: new Form({
      name: '',
      description: ''
      }),
    errors: new Errors()
  },
  methods: {
    onSubmit() {
      this.form.submit('post', '/projects')
                .then(data => console.log(response))
                .catch(error => console.log(error));
    }
  }
})
```

```html
<!-- add an event keydown to the form and pass the $event to keep from adding a keydown event to all fields -->
<form @keydown="form.errors.clear($event.target.name)">
  <span class="is-danger" v-text="form.errors.get('form.name')"></span> //event.target
  <span class="is-danger" v-text="form.errors.get('form.description')"></span>
</form>
```

## 22

`node_modules/.bin/webpack`

`--hide-modules` will hide all this junk:

```javascript
//...
[1] ./~/process/browser.js 5.42 kB {0} [built]
   [2] ./~/axios/lib/defaults.js 2.32 kB {0} [built]
   [4] ./~/axios/lib/cancel/Cancel.js 385 bytes {0} [built]
   [5] ./~/axios/lib/cancel/isCancel.js 102 bytes {0} [built]
//...
```

`--watch` will watch for changes.

Move all these flags to an npm script:

`package.json`:
```javascript
//...
"scripts": {
    "webpack": "webpack --hide-modules",
    "dev": "webpack --hide-modules --watch"
  },
//...
```

**NOTE**
Vue's npm package exports the _runtime-only_ and not the _standalone_ build.

for the _standalone_ add:
```javascript
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}
```

When using babel:
- `npm install babel-loader --save-dev`
- `npm install babel-core --save-dev`
- `npm install babel-preset-es2015 --save-dev`

## 23

_laravel mix_ a configuration layer on top of webpack, that simplifies all the actions.

```javascript
// webpack.mix.js
//...
mix.js('(entry point)', '(output file)')
mix.js('resources/assets/js/app.js', 'public/js');
//...
```

To compile acouple of files down we can pass an array and they will be merged into a single bundle:

```javascript
//...
mix.js(['resources/assets/js/app.js', 'resources/assets/js/forum.js'] 'public/js');
```

To _version_ or _hash_ a file.  A unique hash will be applied top all the file names:

```javascript
//...
mix.js(['resources/assets/js/app.js', 'resources/assets/js/forum.js'] 'public/js')
    .version();
```

Other options that can be used in our `webpack.mix` file:

```javascript
//...
.copy() // to copy some files.
.minify()
```

a lot of these won't have to be used, since there are other sripts that will do most of that for us.

## 24

Vue source of truth is still an object:

```javascript
//...
data: {
      user: {
        name: 'Bob Belcher'
      }
    }
    //...
```

**shared state**

## 25

when we use `v-model=''` is the same as using `:value='' @input=`
When using a component `v-model` but its long form will:

```javascript
// This won't work
Vue.component('coupon', {
    template: `
    <input type="text" v-model="coupon">
    `
});
```

nor this:

```html
<input type="text" v-model="coupon">
```

but this will work:

```javascript
Vue.component('coupon', {
    props: ['code'],
    template: `
    <input type="text" :value="code " @input="updateCode($event.target.value)">
    `,
    methods: {
        updateCode(code) {
            this.$emit('input', code);
        }
    }
});
```

- use `v-model` to sync with the Vue root instance
- bind the `:value`
- listen/emit an `$event`

## 26

SPAs:

- Entry point `app.js`
  - `import ./bootstrap.js` pulls in
    - `import Vue from 'vue'`, `import VueRouter from 'vue-router';`, `import axios from 'axios';`, and assigns them to the `window` object.
  - Build a vue instance and bind it (assign an id) to an element.
  - `import router from './routes';` pulls in `routes.js`

```javascript
new Vue({
    el: '#app',

    router
});
```

- Set up `routes.js`
  - `import VueRouter from 'vue-router';`
    - Export an instance of the _VueRouter_ and tell `Vue.use(VueRouter);`

```javascript
// routes.js
let routes = [
  {
    path: '/',
    // simply associating endpoints to components
    component: require('./views/Home')
  },
//...
];
export default new VueRouter({
  routes
  //...
});
```

[router-link](https://router.vuejs.org/en/api/router-link.html)

`<router-link>` is a component that enables navigation in a router-enabled app and renders the same as an `<a>` tag with correct `href` by default, but can be configured with the `tag` prop. Location is specified with the `to` prop. In addition, the link automatically gets an active CSS class when the target route is active.

`exact` The default active class matching behavior is _inclusive match_. For example, `<router-link to="/a">` will get an active class applied as long as the current path starts with /a/ or is /a.

One consequence of this is that `<router-link to="/">` will be active for every route! To force the link into "exact match mode", use the `exact` prop:

```html
<!-- this link will only be active at `/` -->
  <router-link to="/" exact>
```

Configure the active CSS class applied when the link is active with `exact` match. Note the default value can also be configured globally via the `linkExactActiveClass` router constructor option.

```javascript
// routes.js
export default new VueRouter({
  //...
  linkActiveClass: 'is-active'
});
```

`tag` Sometimes we need `<router-link>` to render as diffrent tag, e.g `<li>`. Then use the `tag` prop to specify which tag to render to.

```html
<router-link to="/foo" tag="li">foo</router-link>
<!-- renders as -->
<li>foo</li>
```

[named views](https://router.vuejs.org/en/essentials/named-views.html)

`<router-view>`

## 27 - 28

**filter** (simple functions) Filters should be appended to the end of the JavaScript expression, denoted by the “pipe” symbol:

```html
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

You can define local filters in a component’s options:

```JavaScript
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

or define a filter globally:

```javascript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

## 30

1. specify the test configuration (ava in this example):

```javascript
// package.json

  //...
  "ava": {
    "require": [
      "babel-register",
      "./test/helpers/setup-browser-env.js"
    ]
  },
  //...
```

2. transpile if needed to do things like `import` es2015 code:

```javascript
// package.json

  //...
  "ava": {
    "require": [
      "babel-register",
      //...
    ]
  },
  //...
```

3. mock a browser environment if needed:

```javascript
// package.json

  //...
  "devDependencies": {
      //...
      "browser-env": "^3.2.4"
    },
  //...
```

and instantiate it like this:

```javascript
//setup-browser-env.js

import browserEnv from 'browser-env';

browserEnv();
```

and require that file for processing by _ava_:

```javascript
// package.json

  //...
  "ava": {
    "require": [
      //...
      "./test/helpers/setup-browser-env.js"
    ]
  },
  //...
```

which alows us to work with the DOM by mocking out the DOM objec.

4. require Babel:

```javascript
// package.json

//...
"babel": {
    "presets": [
      "es2015"
    ]
  },
//...
```

## 31

_compund words_ potential code smell.

## 32

_collection_ inheriting functionality.