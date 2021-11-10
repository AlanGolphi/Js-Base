/*
 * @Author: AlanGolphi
 * @Date: 2021-09-04 14:40:17
 * @LastEditTime: 2021-09-04 15:28:08
 */
/**
 *
 * @param { Array } arr
 * @returns { Array }
 */

// 任意数组，外层循环，内层 indexOf
function unique(arr) {
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		let temp = arr[i];
		if (res.indexOf(temp) === -1) {
			res.push(temp);
		}
	}
	return res;
}

// 有序数组，外层循环，判断当前值与前一个是否相等
function unique1(arr) {
	const res = [];
	let cur;
	for (let i = 0; i < arr.length; i++) {
		let temp = arr[i];
		if (temp !== cur) {
			res.push(temp);
		}
		cur = temp;
	}
	return res;
}

// 任意数组，使用 filter 取代外层循环，
// 如果 indexOf 当前元素不等于 index，则不是第一次出现
function unique2(arr) {
	const res = arr.filter((item, index) => arr.indexOf(item) === index);
	return res;
}

// 有序数组，使用 filter 取代外层循环
// 判断 item 是否第一个元素或与前一 item 相同
function unique3(arr) {
	const res = arr.filter((item, index) => !index || item !== arr[index - 1]);
	return res;
}

// 利用 ES6 的 Set Map 特性
// function unique4(arr) {
//   return Array.from(new Set(arr));
// }
const unique4 = (arr) => [...new Set(arr)];

// Map
function unique5(arr) {
	const map = new Map();
	const res = arr.filter((item) => !map.get(item, true) && map.set(item, true));
	console.log(map);
	return res;
}

let arr1 = [
	1,
	1,
	"1",
	"1",
	null,
	null,
	undefined,
	undefined,
	new String("1"),
	new String("1"),
	/a/,
	/a/,
	NaN,
	NaN,
];

console.time("5");
console.log(unique5(arr1));
console.timeEnd("5");
