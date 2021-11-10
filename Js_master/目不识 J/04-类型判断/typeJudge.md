# JS中的类型判断
JS的类型可大致分为两类：  
- 值类型(存放在 stack 中)：Number, Boolean, String, Symbol, BigInt, Undefined, Null
- 引用类型(以引用的形式存放在 heap 中)：Object, Function, Array, Date, RegExp

## 几个内置类型判断方法比较

### typeof
typeof(obj) 可以较好地得到值类型，但引用类型只能判断出 Object 和 Function
```js
typeof 1; // number
typeof 'lalala'; // string
typeof true; // boolean

typeof function() {}; // function
typeof []; // object
typeof {}; // object
```
> 得到的类型是小写  

### instanceof
undefined 和 null 没有 instanceof 方法，对值类型使用 instanceof 方法返回 false，instanceof(left, right) 方法原理是判断 left 的原型链中是否有构造函数 right 的 prototype 属性。
```js
111 instanceof Number; // false
'lalala' instanceof String; // false
true instanceof Boolean; // false

[] instanceof Array; // true
console.log({} instanceof Object;) // true
console.log(function lala() {} instanceof Function;) // true

function Fn() {};
let foo = new Fn();
foo instanceof Fn; // true
```
> 这里 instanceof(left, right) 的 right 为大写

### .constructor
直接查询待判断对象的 constructor 属性，即直接看其构造函数
```js
(1).constructor === Number; // true
(true).constructor === Boolean; // true
('lalala').constructor === String; // true

([]).constructor === Array; // true
({}).constructor === Object; // true
(function lala() {}).constructor === Function; // true
```
> 存在弊端，当手动修改构造函数的 prototype 属性时，其已经生成的对象的 constructor 属性为修改后的 prototype 属性 

```js
function Fn() {};
Fn.prototype = new Array();
let foo = new Fn();
console.log(foo.constructor === Fn); // false
console.log(foo.constructor === Array); // true
```

### Object.prototype.toString.call(obj);
完美の类型判断方法，对 obj 调用 Object.prototype.toString() 方法，结果为 [object XXXXX] 格式

```js
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call('lalala'); // [object String]

Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]

Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call(function lala() {}); // [object Function]
Object.prototype.toString.call(/abc/); // [object RegExp]
let d = new Date();
Object.prototype.toString.call(d); // [object Date]

```

## 手写两个函数

### 手写 myInstanceOf(left, right)
> instanceof 方法的特点是值类型、null、undefined 返回false
> 如果是正确的引用类型，返回 true

```js
const myInstanceOf = (left, right) => {
  if (typeof left === 'object' || typeof left === 'function') {
    if (left == null) return false;
    let proto = Object.getPrototypeOf(left);
    while (true) {
      if (proto === null) return false;
      if (proto === right.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
  } else {
    return false
  }
}
```

### 手写一个通用的数据类型判断函数
```js
const getType = (obj) => {
  let type = typeof(obj);
  if (type === 'object') {
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
  } else {
    return type; // 如果是 function 或者 值类型就直接返回
  }
}

```