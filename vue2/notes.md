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