const deepClone = (obj, map = new WeakMap()) => {
	const type = typeof obj;
	if (type === "object") {
		const res = Array.isArray(obj) ? [] : {};
		if (map.has(obj)) {
			return map.get(obj);
		}
		map.set(obj, res);
		for (const key in obj) {
			res[key] = deepClone(obj[key], map);
		}
		return res;
	} else return obj;
};

let person = {
	age: 18,
	name: "Wuds",
	habit: ["sleep", "eat", "drink", ["cook", "food"]],
	friends: {
		FA: "lalala",
		FB: "lululu",
		play: {
			PA: "basketball",
			PB: "pingpang",
		},
	},
};
person.self = person;

let p1 = deepClone(person);
p1.habit.push("code code code");
p1.friends.FC = { eat: "beef" };
console.log(p1);
console.log(person);
