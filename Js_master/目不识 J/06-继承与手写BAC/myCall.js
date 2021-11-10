Function.prototype.myCall = function (context) {
	if (typeof this !== "function") {
		throw new TypeError();
	}
	context = context || window;
	context.fn = this;
	const args = [...arguments].slice(1);
	const res = context.fn(...args);
	delete context.fn;
	return res;
};

Math.max.myCall(null, ...arr);
Math.max.myCall(...arr);
