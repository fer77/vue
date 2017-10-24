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

`v-on` registers an event listener. When used on a normal element, it listens to **native DOM events** only. When used on a custom element component, it also listens to **custom events** emitted on that child component.

**shorthand**: `@`

`v-on:click`
`v-on:keyUp`
