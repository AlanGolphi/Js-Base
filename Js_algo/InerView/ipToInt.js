/*
 * @Author: AlanGolphi
 * @Date: 2021-08-20 10:28:31
 * @LastEditTime: 2021-08-20 11:35:41
 */
/**
 * 将一个 ipv4 地址转换为一个 int 类型整数
 * @param {*} str
 * @returns
 */
// 初代版本（错误）
function ipToInt(str) {
	let res = 0;
	const arr = str.split(".");
	for (let i = 0; i < arr.length; i++) {
		res += parseInt(arr[i], 2);
		res << 8;
	}
	return res;
}

// 调试版本（正确，杂）
function ipToInt(str) {
	let res = 0;
	const arr = str.split(".");
	for (let i = 0; i < arr.length; i++) {
		// 将数组中每个元素按十进制转为二进制
		arr[i] = parseInt(arr[i]).toString(2);
	}
	console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		// 此处又将二进制转为十进制
		let temp = parseInt(arr[i], 2);
		console.log("temp:", temp);
		// (24 - 8 * i)为 (3 - i) * 8，即判断需要左移多少位
		let temp1 = temp << (24 - 8 * i);
		console.log("temp1:", temp1);
		res += temp1;
	}
	return res;
}

// 测试版本
function ipToInt(toInt) {
	let res = 0;
	const arr = toInt.split(".");
	for (let i = 0; i < arr.length; i++) {
		arr[i] = parseInt(arr[i]).toString(2);
	}
	for (let i = 0; i < arr.length; i++) {
		res += parseInt(arr[i], 2) << (24 - 8 * i);
	}
	return res;
}

// 完美版本（优雅）
function ipToInt(toInt) {
	let res = 0;
	const arr = toInt.split(".");
	for (let i = 0; i < arr.length; i++) {
		res += arr[i] << ((arr.length - 1 - i) * 8);
	}
	return res;
}
