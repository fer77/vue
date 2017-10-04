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

## 5

**computed property** In-template expressions are very convenient, but meant for simple operations you want to include in your template more than once.

_computed properties_ are reactive.

```javascript
new Vue({
    //...
    computed: {
        skill: function() {
          return 'Advanced';
        }
    }
    //...
});
```

**watch** While _computed properties_ are appropriate in most cases, there are times when a custom watcher is necessary to react to data changes. The use of _watchers_ is most useful when you want to perform asynchronous or expensive operations in response to changing data.

## 6

[v-for](https://vuejs.org/v2/guide/list.html#v-for-on-a-lt-template-gt)

**:** Vue's short hand for binding.

```html
<!-- ... -->
  <div v-for="plan in plans">
    <plan :plan="plan"></plan>
  </div>
  <!-- ... -->
```

## 7

## 8

Creating custome components.

```javascript
Vue.component('tasks', {
  template: '#tasks-template'
});
```

## 9 

## 10

## 11

## 12

**explecitly declare your components**.

## 13

Styles for each _Vue_ component can be added within the component's file itself like so:

```html
 <style lang="sass"></style>
 ```

 A style language can be declared and then added it with _npm_.

## 14

**Filters**

Filters should be appended to the end of the JS expression, denoted by the “pipe” symbol:

```javascript
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

**NOTE**
all filters have been removed. It’s now recommended to use libraries for solving problems in each domain (e.g. date-fns to format dates and accounting for currencies), or write your own.