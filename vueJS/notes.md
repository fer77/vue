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
