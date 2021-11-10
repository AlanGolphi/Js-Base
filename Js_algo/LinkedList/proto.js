/*
 * @Author: AlanGolphi
 * @Date: 2021-06-03 08:49:32
 * @LastEditTime: 2021-06-03 10:11:55
 */
//函数，数组，对象的原型链上都有Object, __proto__可以理解为.before反向链表
let obj = {};
let arr = [];
let func = () => {};
console.log(obj.__proto__ === Object.prototype);
console.log(arr.__proto__ === Array.prototype);
console.log(func.__proto__ === Function.prototype);
console.log(Object.prototype.__proto__);

//简述instanceof的原理并重写myInstanceOf(x, y);
function myInstanceOf(x, y) {
	let p = x;
	while (p) {
		if (p === y.prototype) return true; //定义p指针不断向前移动，如果可找到y的prototype，即返回true
		p = p.__proto__;
	}
	return false;
}
console.log(myInstanceOf(1, Number));

//判断函数和对象上的值

var obj1 = {},
	func1 = () => {};

Object.prototype.x = "x";
Function.prototype.y = "y";

console.log(obj1.x);
console.log(obj1.y);
console.log(func1.x);
console.log(func1.y);
