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