/*
 * @Author: AlanGolphi
 * @Date: 2021-06-03 10:43:17
 * @LastEditTime: 2021-06-03 10:46:12
 */
const json = {
	a: { b: { c: 1 } },
	d: { e: 2 },
};

let path = ["d", "e"];

let p = json;

path.forEach((k) => {
	p = p[k];
});
