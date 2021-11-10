let Parent = {
	name: "lalala",
	colors: ["red", "green", "blue"],
	getName: function () {
		console.log(this.name);
	},
};

let child1 = Object.create(Parent);
let child2 = Object.create(Parent);

child1.name = "lululu";
child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
child1.getName(); // lululu

child2.name = "tututu";
console.log(child2.colors); // [ 'red', 'green', 'blue', 'pink' ]
child2.getName(); // tututu
