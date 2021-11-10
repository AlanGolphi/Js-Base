function Parent(name) {
	this.name = name;
	this.colors = ["red", "green", "blue"];
}

Parent.prototype.getName = function () {
	console.log(this.name);
};

function Child(name, age) {
	Parent.call(this, name);
	this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

let child1 = new Child("lalala", 28);
console.log(child1.name); // lalala
console.log(child1.age); // 28
console.log(child1.colors); // [ 'red', 'green', 'blue' ]

child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
child1.getName(); // lalala

let child2 = new Child("lululu", 16);
console.log(child2.name); // lululu
console.log(child2.age); // 16
console.log(child2.colors); // [ 'red', 'green', 'blue' ]
