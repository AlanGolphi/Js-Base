/*
 * @Author: AlanGolphi
 * @Date: 2021-07-21 09:49:58
 * @LastEditTime: 2021-07-21 10:01:58
 */

/**
 * 手写 bind()
 */
Function.prototype.myBind = function () {
	// 将参数拆解为数组
	const args = Array.prototype.slice.call(arguments);

	// 获取需要 bind 的 this (数组中的第一项)
	const selfThis = args.shift();

	// 定义原本函数的 this
	const fn = this;

	// 使用 apply 重新定义 myBind
	return function () {
		return fn.apply(selfThis, args);
	};
};

// 验证
function fn1(a, b, c) {
	console.log("this", this);
	console.log(a, b, c);
	console.log("this is fn1");
}

const fn2 = fn1.myBind({ x: 100 }, 10, 20, 30);
let res = fn2();
console.log(res);
