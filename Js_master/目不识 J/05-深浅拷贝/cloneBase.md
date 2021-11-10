# JS 拷贝相关
JS的类型可大致分为两类：  
- 值类型(存放在 stack 中)：Number, Boolean, String, Symbol, BigInt, Undefined, Null
- 引用类型(以引用的形式存放在 heap 中)：Object, Function, Array, Date, RegExp

对于值类型直接拷贝会开辟一块新内存直接存放值，而对于引用类型直接拷贝则会复用其内存地址，即多个引用类型的拷贝公用一块内存。假如对引用类型的拷贝修改，则原始数据也会跟着改变，所以就有了深浅拷贝的概念。

## 值类型拷贝
对值类型的拷贝，因为值类型占用内存的大小比较确定，易于读取例如 Number Boolean 什么的，所以定义时存放在栈中。

## 引用类型拷贝
而对象随时可能增加属性或者嵌套对象，大小不确定，所以为了方便使用，定义后将内存地址存放再堆中，使用时根据内存地址去读值。首先先定义一个包含好多类型的对象：  
```js
let person = {
	name: "Wuds",
	age: 28,
	habit: ["lalala", "lululu", "yoyoyo"],
	play: function () {
		console.log("Like Fun !");
	},
};
```

### 浅拷贝
仅对对象的属性值拷贝，但是如果对象中嵌套了对象，那拷贝时还是只拷贝内存地址。所以浅拷贝只是复制了对象第一层。
- Object.assign()  
使用 Object.assign() 可以复制引用类型的第一层值类型，修改备份对象属性值不会对原对象属性值修改，但是如果修改备份对象的引用则会修改原对象的引用。
```js
let p1 = Object.assign({}, person);
p1.name = "niu a";
p1.age = 18;
p1.habit.push("shaya?");
console.log(p1);
console.log(person);
// {
//   name: 'niu a',
//   age: 18,
//   habit: [ 'lalala', 'lululu', 'yoyoyo', 'shaya?' ],
//   play: [Function: play]
// }
// {
//   name: 'Wuds',
//   age: 28,
//   habit: [ 'lalala', 'lululu', 'yoyoyo', 'shaya?' ],
//   play: [Function: play]
// }
```
- ... 展开运算符  
通过展开运算符进行深拷贝的效果与 Object.assign() 效果一致。
```js
let p1 = { ...person };
p1.name = "niu a";
p1.age = 18;
p1.habit.push("shaya?");
console.log(p1);
console.log(person);
// {
//   name: 'niu a',
//   age: 18,
//   habit: [ 'lalala', 'lululu', 'yoyoyo', 'shaya?' ],
//   play: [Function: play]
// }
// {
//   name: 'Wuds',
//   age: 28,
//   habit: [ 'lalala', 'lululu', 'yoyoyo', 'shaya?' ],
//   play: [Function: play]
// }
```
- 数组相关方法  
如果待拷贝对象是数组，可通过数组的 slice concat 方法进行拷贝，修改备份数组的值元素不会对原数组产生副作用，但是如果数组元素是引用类型，还是会对原数组产生副作用。
```js
let habit = ["eat", "drink", "cook", "sleep", "shower"];
let evenHabit = habit.concat();
let oddHabit = habit.slice();

evenHabit.push("orange juice");
oddHabit.push("ice cream");

console.log(habit);
console.log(evenHabit);
console.log(oddHabit);
// [ 'eat', 'drink', 'cook', 'sleep', 'shower' ]
// [ 'eat', 'drink', 'cook', 'sleep', 'shower', 'orange juice' ]
// [ 'eat', 'drink', 'cook', 'sleep', 'shower', 'ice cream' ]   
```
- 写一个简易浅拷贝函数
```js
const shallowCopy = (obj) => {
  const type = typeof obj;
  if (type === 'object') {
    const res = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      res[key] = obj[key];
    }
    return res;
  } else return obj;
}
```
### 深拷贝
浅拷贝解决的只是引用类型中的第一层值类型，对于引用类型中嵌套的引用类型不能很好的复制。而深拷贝要做的就是将待拷贝的对象完整的复制一份给新对象，并在堆内存中开辟一块新的内存给新对象，即新旧对象除了看起来一样，内部已经不存在共享的堆内存了。
#### 乞丐版
将对象转成 JSON 字符串，再将字符串反解析成对象完成一次极简的深拷贝
```js
const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj));
}
```
存在问题：  
1. 对于 function Symbol undefined 经转换后键值对会消失
2. 对于 NaN Infinity -Infinity 转换后会变成 null
3. Date 类型转换后会变成字符串
4. RegExp 正则转换后会变成空对象
5. 无法解决循环引用问题，如 obj[key] = obj

#### 简约风
实现一个深拷贝对象、数组、和循环引用的函数。使用 WeakMap 是保持键值之间的弱引用，使得其可在适当时机进行垃圾回收，避免不必要的内存泄漏。
```js
const deepClone = (obj, map = new WeakMap()) => {
  const type = typeof obj;
  if (type === 'object') {
    const res = Array.isArray(obj) ? [] : {};
    if (map.has(obj)) {
      return map.get(obj);
    }
    map.set(obj, res);
    for (const key in obj) {
      res[key] = deepClone(obj[key], map);
    }
    return res;
  } else return obj;
}
// test
let person = {
	age: 18,
	name: "Wuds",
	habit: ["sleep", "eat", "drink", ["cook", "food"]],
	friends: {
		FA: "lalala",
		FB: "lululu",
		play: {
			PA: "basketball",
			PB: "pingpang",
		},
	},
};
person.self = person; // 循环引用自身需要在对象定义后再定义

let p1 = deepClone(person);
p1.habit.push("code code code");
p1.friends.FC = { eat: "beef" };
console.log(p1);
// {
//   age: 18,
//   name: 'Wuds',
//   habit: [ 'sleep', 'eat', 'drink', [ 'cook', 'food' ], 'code code code' ],
//   friends: {
//     FA: 'lalala',
//     FB: 'lululu',
//     play: { PA: 'basketball', PB: 'pingpang' },
//     FC: { eat: 'beef' }
//   },
//   self: [Circular *1]
// }
```
缺点：  
1. 不能复制不可枚举属性以及 Symbol 类型。
2. 对于特殊对象如 RegExp Date Function 不能很好处理。
3. for in 遍历性能还可以再提升。

#### 很牛的
有点难还没搞懂，先放着吧😭