# Vue实例

## 数据和方法

当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。
当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。


```js
import Vue from 'vue'

// 我们的源数据对象
var data = { a: 1 };

var vm = new Vue({
  data:data
});

```
通过vue实例对象的属性a与我们指定的源数据data对象作比较，看属性值是否一样

```js
console.log(vm.a===data.a);//true,说明源数据对象的属性都给了vue实例

//如果源数据data属性与我们创建的vue对象vm的的属性指向的是同一个对象的话，测试下是否会同时被修改
vm.a = 2;

//通过修改vue对象vm的属性a的值为2，来检测源数据对象data属性a的值也会被修改，我们做如下验证
console.log(data.a);//2，发现修改了实例的属性，也会同时使我们源数据的属性，同时被修改

//反之亦然
data.a = 3;
console.log(vm.a);//3,发现无论修改源数据对象的值还是vue实例对象的值，2个对象的属性值都会被同时更新

```


当这些数据改变时，视图会进行重渲染。
值得注意的是只有当实例被创建时就已经存在于 data 中的 property 才是响应式的。
也就是说如果你添加一个新的 property，比如：

```js
vm.b = 'hi';//只有当实例被创建时就已经存在于 data 中的 property 才是响应式的
```

这里唯一的例外是使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化。
```js
var obj = {
  foo: 'bar'
};

Object.freeze(obj);//冻结一个对象。一个被冻结的对象再也不能被修改

new Vue({
  el: '#app',
  data: obj
});
```

配置html，通过修改data里面的foo属性，看是否能正常修改

```html
    <div id="app">
      <p>{{ foo }}</p>
      <!-- 这里的 `foo` 不会更新！ -->
      <button v-on:click="foo = 'baz'">点击修改foo的值</button>
    </div>
```

<br/>
在线例子
<br/>
<br/>
<iframe height="265" style="width: 100%;" scrolling="no" title="2.vue实例-数据与方法1" src="https://codepen.io/chentong106140/embed/gOMbWog?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chentong106140/pen/gOMbWog'>2.vue实例-数据与方法1</a> by chentong106140
  (<a href='https://codepen.io/chentong106140'>@chentong106140</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

浏览器测试截图如下

<img :src="$withBase('/2.vue实例/QQ图片20200929165422.png')" />
<br/><br/><br/><br/>

***
**除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。**

它们都有前缀 $，以便与用户定义的 property 区分开来。例如：
```js
var data2 = { a: 1 };
var vm2 = new Vue({
  el: '#app2',
  data: data
});

console.log(vm2.$data === data2); // => true
console.log(vm2.$el === document.getElementById('app2')); // => true

// $watch 是一个实例方法
vm2.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
  console.log("发现属性a被修改了",newValue,oldValue);
});

```

我们点击如下按钮，进行修改属性a的值后，看看是否能进入的vm2.$watch()对调中

```html
    <div id="app2">
      <p>{{ a }}</p>
      <!-- 这里的 `foo` 不会更新！ -->
      <button v-on:click="a = 100">点击修改foo的值</button>
    </div>
```

<br/>
在线例子
<br/>
<br/>

<iframe height="265" style="width: 100%;" scrolling="no" title="2.vue实例-数据与方法2" src="https://codepen.io/chentong106140/embed/VwjYzYd?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chentong106140/pen/VwjYzYd'>2.vue实例-数据与方法2</a> by chentong106140
  (<a href='https://codepen.io/chentong106140'>@chentong106140</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

浏览器测试截图如下

<img :src="$withBase('/2.vue实例/QQ图片20200929171041.png')" />

<br/><br/><br/><br/>

***
## 实例生命周期钩子

每个 Vue 实例在被创建时都要经过一系列的初始化过程——
例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。
同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

比如 created 钩子可以用来在一个实例被创建之后执行代码:

```js
new Vue({
    el:"#app3",
    data:{a:1},
    created:function() {//这里不能使用箭头函数，因为函数内没有this对象，this对象会指向上层作用域的this
      // `this` 指向 vm 实例
      console.log('a is: ' + this.a);//函数内this都指向的是vue实例对象vm
    }
});
```
::: tip 注意点
- <font color=#FF0000 size=3 >不要在选项 property 或回调上使用箭头函数，比如</font>
- created: () => console.log(this.a) 或 
- vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 
- 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 
- Uncaught TypeError: Cannot read property of undefined 或 
- Uncaught TypeError: this.myMethod is not a function 之类的错误。
:::

<br/><br/><br/><br/>

***
## 生命周期图示
下图展示了实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。
<img :src="$withBase('/2.vue实例/lifecycle.png')" />











