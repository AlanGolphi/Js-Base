function Parent(name) {
	this.name = name;
	this.colors = ["red", "green", "blue"];
}

Parent.prototype.getName = function () {
	console.log(this.name);
};

function clone(parent, child) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}

clone(Parent, Child);

function Child(name, age) {
	Parent.call(this, name);
	this.age = age;
}

Child.prototype.getColors = function () {
	console.log(this.colors);
};

let child1 = new Child("lalala", 20);
child1.colors.push("golden");
child1.getName(); // 继承父类方法 lalala
child1.getColors(); // 原型方法 [ 'red', 'green', 'blue', 'golden' ]

let child2 = new Child("lululu", 38);
child2.getName(); // 父类方法可继承
child2.getColors(); // 引用类型不互相影响
