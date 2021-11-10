let Parent = {
	name: "lalala",
	colors: ["red", "green", "blue"],
	getName: function () {
		console.log(this.name);
	},
};

function clone(original) {
	const clone = Object.create(original);
	clone.getColors = function () {
		console.log(this.colors);
	};
	return clone;
}

let child1 = clone(Parent);
child1.name = "yayaya";
child1.colors.push("black");
child1.getName(); // yayaya
child1.getColors(); // [ 'red', 'green', 'blue', 'black' ]
