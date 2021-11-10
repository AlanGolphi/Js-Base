/*
 * @Author: AlanGolphi
 * @Date: 2021-07-08 11:15:08
 * @LastEditTime: 2021-07-08 16:48:27
 */

/**
 *
 * @param {*} obj 要深拷贝的对象
 * @returns 拷贝后的对象
 */

let obj1 = {
	id: 1,
	name: "xxx",
	place: {
		city: "guangzhou",
		school: "SCNU",
	},
};

let obj2 = deepClone(obj1);
obj2.place.city = "beijing";
console.log(obj1);
console.log(obj2);

function deepClone(obj = {}) {
	if (typeof obj !== "object" || obj == null) {
		//不是引用类型，不需要深拷贝
		return obj;
	}

	//初始化结果类型
	let result;
	if (obj instanceof Array) {
		result = [];
	} else {
		result = {};
	}

	for (let key in obj) {
		//保证 key 不是 obj 的原型属性
		if (obj.hasOwnProperty(key)) {
			// 递归调用
			result[key] = deepClone(obj[key]);
		}
	}

	return result;
}
