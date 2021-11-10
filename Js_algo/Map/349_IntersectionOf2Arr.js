/*
 * @Author: AlanGolphi
 * @Date: 2021-06-07 19:21:43
 * @LastEditTime: 2021-06-07 19:29:03
 */
const map1 = new Map();
const map2 = new Map();
const res = [];

nums1.forEach((n) => {
	map1.set(n, true);
});

nums2.forEach((n) => {
	if (map1.get(n)) {
		res.push(n);
		map1.delete(n);
	}
});
return res;
