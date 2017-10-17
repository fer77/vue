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

## 15

How communication between components is handled.

**$dispatch** will broadcasts a message up the chain to every parent component upto the Vue vm.
**$broadcast** broadcasts a message down the chain.

_$dispatch_ and _$broadcast_ have been removed. _$dispatch_ and _$broadcast_ did not solve communication between sibling components. In these cases, you can actually listen to an _$emit_ from a child with _v-on_, which allows the use of events with added explicitness.

Communication between distant descendants/ancestors, _$emit_ is not enough. Instead, the easiest way is to use a centralized event hub. This allows communication between components no matter where they are in the component tree.

[To listen to these events]:(https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced)

```javascript
// This is an event hub that will be used in every
// component to communicate between them.
var eventHub = new Vue();

// NewTodoInput
// ...
methods: {
  addTodo: function () {
    eventHub.$emit('add-todo', { text: this.newTodoText })
    this.newTodoText = ''
  }
}

// Todos
// ...
created: function () {
  eventHub.$on('add-todo', this.addTodo)
  eventHub.$on('delete-todo', this.deleteTodo)
},
methods: {
  addTodo: function (newTodo) {
    this.todos.push(newTodo)
  }
  }
```

**remember** `v-on:` can be replaced with `@`

## 16

**NOTE**
Within our Vue component the `this` object can access [directive hook arguments](https://vuejs.org/v2/guide/custom-directive.html#Hook-Functions).

**common header** everytime an ajax request is submitted send _header_

Default set of directives _v-model_ and _v-show_, Vue also allows custom directives. The primary form of code reuse and abstraction is components - however there may be cases where you need some low-level DOM access, this is where custom directives could be useful.

Creating directives:

```javascript
//Common headers
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('input[name="_token"]').value;

// Register a global custom directive called v-focus
Vue.directive('ajax', {
  bind: function() {
    // This method will be called when v-ajax is attached to an html tag.
    this.el.addEventListener('submit', this.onSubmit.bind(this));
  },
  update: function(value) {
    // This method will be called everytime the value changes.
  },
  unbind: function() {
    // Unbinds any event listeners when finished.
  },
  onSubmit: function(e) {
    // this object now refers to the form being submited. So bind this to the component (.bind(this)).
    e.preventDefault();

    // Gives us acces to the Vue model.
    this.vm
        .$http[this.getRequestType()](this.el.action)
        .then(this.onComplete.bind(this))
        .catch(this.onError.bind(this));
  },
  getRequestType: function() {
    var method = this.el.querySelector('input[name="_method"]');
    // In case method is not given, extract it from the form
    return (method ? method.value : this.el.method).toLowerCase(); // will give us delete or post or get...
  },
  onComplete: function() {
    if (this.params.complete) {
      alert(this.params.complete);
    }
  },
  onError: function(response) {
    alert(response.data.message);
  }
});
```

or if you want to register a directive locally, components also accept a directives option:

```javascript
directives: {
  ajax: {
    // directive definition
  }
}
```

Then in a template use _v-focus_ attribute on any element:

```javascript
<input v-ajax>
```

## 17

Custom Transition Classes
---
The following attributes specify custom transition classes:

- _enter-class_
- _enter-active-class_
- _enter-to-class (2.1.8+)_
- _leave-class_
- _leave-active-class_
- _leave-to-class (2.1.8+)_

This is especially useful when you want to combine Vue with an existing CSS animation library, such as Animate.css.

```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />

<div id="app">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

```javascript
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

## 18

Extract the shared state of components into its own object:

```javascript
var store = {
  username: 'Bob Belcher'
};
new Vue({
  el: '#app',
  data: store,
  components: {
    notification: {
      data: function() {
        return store;
      },
      template: '<h2>{{ username }}: <slot></slot></h2>'
    }
  }
});
```

or create a shared data section:

```javascript
//...
new Vue({
  el: '#app',
  data: {
    misc: 'data',
    shared: store
    },
//...
```

and reference it like this:

```html
<!-- //... -->
<h1>Wlecome back, {{ shared.username }}</h1>
<!-- //... -->
```

## 19

Templates can be included in your app in a template:

```javascript
Vue.component('home-page', {
  template: '<h2>Home Page</h2>'
});
```

or inline in your html:

1. set the default component as the variable and pass it through to the master page.
2. anything we nest in the about view will be displayed here.

```html
<component is="about-page" inline-template>
        <h2>About Page</h2>

        <button @click="doSomething"></button>
</component>
```

## 20

1. `app.js` import Vue and start a new Vue instance,
2. import your component,
3. build your instance and bind it to `#app`

```javascript
//...

Vue.component('HomeView', require('./components/HomeView.vue'));

const app = new Vue({
    el: '#app',
    components: {
      HomeView
    } // <component is="home-view"... or <home-view></home-view>

   //...
```

## 21

**ready** _replaced_

Use the new mounted hook instead:

```javascript
mounted() {
  setTimeout(
    () => this.show = false,
    3000
  )
}
```

Transitioning Single Elements/Components
---

Vue provides a transition wrapper component, allowing you to add entering/leaving transitions for any element or component:

```html
<template>
  <transition name="fade">
    <div
      v-bind:class="[activeClass, errorClass, successClass]"
      v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>
```

```javascript
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
```

## 22

[_Mixins_](https://vuejs.org/v2/guide/mixins.html#ad) in Vue are very much like PHP traits. Create an object, mix it into an existing Vue to create new re-usable functionality.

```javascript
const FetchesUser = {
	methods: {
		fetchUser() {
			alert('fetch the user');
		}
	}
};

new Vue ({
	el: '#app',
// Import your functionality:
	mixins: [FetchesUser],
	mounted() {
		this.fetchUser();
	}
});
```

When a mixin and the component itself contain overlapping options, they will be “merged”. For example, hook functions with the same name are merged into an array so that all of them will be called (mixin hooks will be called before the component’s own hooks):

```javascript
var mixin = {
  created: function () {
    console.log('mixin hook called')
  }
}
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('component hook called')
  }
})
// => "mixin hook called"
// => "component hook called"
```
