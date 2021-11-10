# 几种继承方式的实现以及优缺点对比🌞
主要是为了深入了解下 JavaScript 的语言特性，学习了[继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) 和 [JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16) 后，整理一下以期变成自己的 😆  
~~之前看到别人的 markdown  五颜六色的还蛮有意思~~

## 原型链继承
原型链继承是将父类实例当作子类构造函数的 prototype 属性。  
```js
function Parent() {
	this.name = "lalala";
	this.colors = ["red", "green", "blue"];
}

function Child() {}

Child.prototype = new Parent();

let child1 = new Child();
let child2 = new Child();

console.log(child1.colors); // [ 'red', 'green', 'blue' ]
child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
console.log(child2.colors); // [ 'red', 'green', 'blue', 'pink' ]
```
❌缺点：  
1. 创建子类实例的时候不能够传入参数，父类有什么，子类就用什么
2. 所有子类实例共享同一个父类 prototype，牵一发动全身

## 构造函数继承
构造函数继承主要是在子类的构造函数中调用父类的 call 方法。

```js
function Parent(name) {
	this.name = name;
	this.colors = ["red", "green", "blue"];
}

Parent.prototype.getName = function () {
	console.log(this.name);
};

function Child(name, age) {
	Parent.call(this, name);
	this.age = age;
}

let child1 = new Child("lalala", 28);
console.log(child1.name); // lalala
console.log(child1.age); // 28
console.log(child1.colors); // [ 'red', 'green', 'blue' ]

child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
child1.getName(); // error: child1.getName() is not a function

let child2 = new Child("lululu", 16);
console.log(child2.name); // lululu
console.log(child2.age); // 16
console.log(child2.colors); // [ 'red', 'green', 'blue' ]
```
✔️优点：  
1. 所有子类实例不再共享同一父类构造函数的 prototype
2. 因为在子类中调用父类的 call 方法，所以可以传参  

❌缺点：  
1. 父类 prototype 上的方法不能继承到子类上
2. 子类实例的所有方法都要在构造函数中定义，每次创建个实例就要创建一遍方法，亏啊😥

## 组合继承
为了又要继承父类属性、父类 prototype 方法，又要每个子类不共享 prototype 属性，就召唤出**组合继承！**
```js
function Parent(name) {
	this.name = name;
	this.colors = ["red", "green", "blue"];
}

Parent.prototype.getName = function () {
	console.log(this.name);
};

function Child(name, age) {
	Parent.call(this, name);
	this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

let child1 = new Child("lalala", 28);
console.log(child1.name); // lalala
console.log(child1.age); // 28
console.log(child1.colors); // [ 'red', 'green', 'blue' ]

child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
child1.getName(); // lalala

let child2 = new Child("lululu", 16);
console.log(child2.name); // lululu
console.log(child2.age); // 16
console.log(child2.colors); // [ 'red', 'green', 'blue' ]
```
✔️优点:  
子类可使用父类以及父类 prototype 的属性和方法，且子类实例不共享同一 prototype，修改一个不影响另一个  
❌缺点：  
当创建一个子类实例的时候，父类方法要执行两次，一次是子类构造函数内部 call，一次是子类调整 prototype 属性，即产生额外的性能开销。

## 原型式继承
使用 Object.create() 方法进行继承，其原理是暂时创建一个新的构造函数，并将构造函数的 prototype 设为待继承的对象，再返回新构造函数的实例，最初是道格拉斯老爷子首创，并在 ES5 添加标准方法 Object.create()。  
```js
function objectCreate(obj) {
  function Fn() {};
  Fn.prototype = obj;
  return new Fn()
}
```

```js
let Parent = {
	name: "lalala",
	colors: ["red", "green", "blue"],
	getName: function () {
		console.log(this.name);
	},
};

let child1 = Object.create(Parent);
let child2 = Object.create(Parent);

child1.name = "lululu";
child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
child1.getName(); // lululu

child2.name = "tututu";
console.log(child2.colors); // [ 'red', 'green', 'blue', 'pink' ]
child2.getName(); // tututu
```

## 寄生式继承
也是道格拉斯老爷子首创，额外使用一个新的函数，再函数内调用 Object.create() 方法生成实例，并且可以对实例追加新的方法。

```js
let Parent = {
	name: "lalala",
	colors: ["red", "green", "blue"],
	getName: function () {
		console.log(this.name);
	},
};

function clone(original) {
	const clone = Object.create(original);
	clone.getColors = function () {
		console.log(this.colors);
	};
	return clone;
}

let child1 = clone(Parent);
child1.name = "yayaya";
child1.colors.push("black");
child1.getName(); // yayaya
child1.getColors(); // [ 'red', 'green', 'blue', 'black' ]
```

## 寄生组合继承
💥 传说中的最完美的继承方式，不会改变原型链，而且可以比组合继承少执行一次父类构造函数。
```js
function Parent(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}
Parent.prototype.getName = function() {
  console.log(this.name);
}

function clone(parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype.getColors = function() {
  console.log(this.colors);
}
clone(Parent, Child);

let child1 = new Child();
child.name = 'lululu';
child1.colors.push('black');
child1.getName(); // lululu
child1.getColors(); // ["red", "green", "blue", "black"]

let child2 = new Child();
child2.getName(); // lalala
child2.getColors(); // ["red", "green", "blue"]
```

# call/apply/bind 的内部实现😵‍💫

## 手写一个 call
call 方法使用一个指定的 this 和一个或多个参数来调用一个函数
```js
Function.prototype.myCall(context) {
  if (typeof this !== 'function') {
    throw new TypeError;
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const res = context.fn(...args);
  delete context.fn;
  return res;
}
```
⁉️ 
> 基本的原理是用调用函数的 this 去执行调用函数的参数，但 myCall 的传参是以列表形式传进去的，没办法判断调用时第一个参数是 this 还是参数。但是自带的 Function.prototype.call() 却可以判断，还有点迷，估计得以后看源码才能懂。

## 手写一个 apply
apply 和 call 的作用基本一样，但是传参形式不同，apply 的传参必须是数组，也就比较好实现了。
```js
Function.prototype.myApply = function(context, arr) {
  if (typeof this !== 'function') {
    throw new TypeError;
  }
  context = context || window;
  context.fn = this;
  const res = arr ? context.fn(...arr) : context.fn();
  delete context.fn;
  return res;
}
```
⁉️
> myApply 与 myCall 的差别主要也就在传参的差别，myCall 的参数是好几个一起的，myApply 的参数只有两个，第二个是数组。
## 手写一个 bind
bind 创建一个新函数，新函数的 this 是 bind() 的第一个参数，其余参数作为新函数的参数。
```js
Function.prototype.myBind = function (context) {
	if (typeof this !== "function") {
		throw new TypeError();
	}
	const self = this;
	const args = [...arguments].slice(1);
	return function F() {
		if (this instanceof F) {
			return new self(...args, ...arguments);
		}
		return self.apply(context, args.concat(...arguments));
	};
};
```
⁉️
> 来到 myBind，一下有点蒙，原因是返回的函数可以直接调用，也可作为构造函数调用，作为构造函数时 this 会丢失。