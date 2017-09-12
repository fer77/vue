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
