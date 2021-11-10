let person = {
	name: "Wuds",
	age: 28,
	habit: ["lalala", "lululu", "yoyoyo"],
	play: function () {
		console.log("Like Fun !");
	},
};

// // Object.assign();
// let p1 = { ...person };
// p1.name = "niu a";
// p1.age = 18;
// p1.habit.push("shaya?");
// console.log(p1);
// console.log(person);

let habit = ["eat", "drink", "cook", "sleep", "shower"];
// let evenHabit = habit.concat();
// let oddHabit = habit.slice();

// evenHabit.push("orange juice");
// oddHabit.push("ice cream");

// console.log(habit);
// console.log(evenHabit);
// console.log(oddHabit);
// 写一个简易的浅拷贝函数
const shallowCopy = (target) => {
	const type = typeof target;
	if (type === "object" || type === "function") {
		const res = Array.isArray(target) ? [] : {};
		for (const key in target) {
			res[key] = target[key];
		}
		return res;
	} else return target;
};

let hb = shallowCopy(habit);
console.log(hb);

let p1 = shallowCopy(person);
console.log(p1);
