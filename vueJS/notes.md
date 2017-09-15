## 1

View:
```javascript
<div id="app">
  <h1>{{ message }}</h1>
</div>
```

Model:
```javascript
var data == {
  message: 'Hello World'
};
```

Vue model that binds the view and model:
```javascript
new Vue({
  el: '#app',
  data: data
});
```


## 2

**v-model** binds to a value.
**v-show** the element is always rendered regardless of initial condition, with just simple CSS-based toggling.
**v-if** ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

For any properties on a _data model_ initialize them even if set to an empty string.

```javascript
new Vue({
  //...
  data: {
    message: ''
  }
  //...
});
```


## 3

Event handling
---

_Methods_ need to be nested within a _methods_ object:

```javascript
new Vue({
  //...
  methods: {
    someFunction: function(e) {
      alert('some alert');
    }
  }
  //...
});
```

**event modifier** modifiers are directive postfixes denoted by a dot.

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`

Although this can easily be done inside methods, it is better if the methods handle only data logic rather than having dealing with DOM event details.

## 4

**Components** _Components_ extend basic HTML elements to encapsulate reusable code. _Components_ are custom elements that Vue’s compiler attaches behavior to. In some cases, they may also appear as a native HTML element extended with the special `is` attribute.

_rule_ If a piece of functionality or behavior is repeated in the application it is a good idea to create a dedicated component.

**Global component** can be used inside a vue instance inside html.

1. create a global component and name it.
```javascript
Vue.component('counter', {
  template: '#counter-template'
});
```

2. specify a template.
```HTML
//In 'index.html':
<counter></counter>

//In a seperate file:
<template id="counter-template">
  <h1>{{ subject }}</h1>
  <button @click="count += 1">Count: {{ count }}</button>
</template>
```

3. _important_ create root vue instance, otherwise it won't show on the page.
```javascript
new Vue({
  el: '#app',
//...
});
```

**Properties** You can data-bind to computed properties in templates just like a normal property. Reference properties the same way as if defined in our data object ({{ someProperty }}), so it will update any bindings. And properties need to be explicit.

```javascript
Vue.component('counter', {
//...
  props: ['subject'],
//...
});
```
