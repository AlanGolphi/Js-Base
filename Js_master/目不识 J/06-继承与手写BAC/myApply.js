Function.prototype.myApply = function (context, arr) {
	if (typeof this !== "function") {
		throw new TypeError();
	}
	context = context || window;
	context.fn = this;
	const res = arr ? context.fn(...arr) : context.fn();
	delete context.fn;
	return res;
};
