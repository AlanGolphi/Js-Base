const flatten4 = (arr) => {
	while (arr.some((item) => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
};

let arr = [1, [2, [3, [4, 5], 6], 7], 8];
console.log(flatten4(arr));
