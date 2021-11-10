function Parent() {
	this.name = "lalala";
	this.colors = ["red", "green", "blue"];
}

function Child() {}

Child.prototype = new Parent();

let child1 = new Child();
let child2 = new Child();

console.log(child1.colors); // [ 'red', 'green', 'blue' ]
child1.colors.push("pink");
console.log(child1.colors); // [ 'red', 'green', 'blue', 'pink' ]
console.log(child2.colors); // [ 'red', 'green', 'blue', 'pink' ]
