/**
 *
 * @param {[]} arr
 * @returns {[]} result
 */

// 循环遍历数组，如果子元素还是数组就再次调用自身方法
// 兼容性好
const flatten = (arr) => {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(flatten(arr[i]));
		} else {
			result.push(arr[i]);
		}
	}
	return result;
};

// 调用数组的 some, concat 方法和 拓展运算法 ...
const flatten4 = (arr) => {
	while (arr.some((item) => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
};

// ES6 有数组的 reduce 方法，pre 和 cur 分别是前一次计算的结果和当前遍历的元素
// 传入的 [] 是设置初始 pre，如果没传，默认 pre 为数组第一个元素
const flatten2 = (arr) => {
	return arr.reduce(
		(pre, cur) => pre.concat(Array.isArray(cur) ? flatten2(cur) : cur),
		[]
	);
};

// ES6 自带 flat 方法
const flatten3 = (arr) => {
	return arr.flat(Infinity);
};

// 调用 JSON.stringify 和 JSON.parse 和正则表达式
// 等字符串操作方法
const flatten5 = (arr) => {
	let str = JSON.stringify(arr).replace(/(\[|\])/g, "");
	return JSON.parse(`[${str}]`);
};

// 调用 toString() 方法先转换成字符串再 split 成数组，再把每个 item 转为数字
const flatten1 = (arr) => {
	return arr
		.toString()
		.split(",")
		.map((item) => +item);
};

let arr5 = [1, [2, [3, [4, 5], 6], 7], 8];
console.log(flatten5(arr5));
