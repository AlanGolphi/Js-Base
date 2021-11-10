Function.prototype.myBind = function (context) {
	if (typeof this !== "function") {
		throw new TypeError();
	}
	const self = this;
	const args = [...arguments].slice(1);
	return function F() {
		if (this instanceof F) {
			return new self(...args, ...arguments);
		}
		return self.apply(context, args.concat(...arguments));
	};
};
