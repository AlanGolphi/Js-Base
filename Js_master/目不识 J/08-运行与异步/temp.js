// function* foo(x) {
// 	let y = 1 + (yield x * 4);
// 	let z = yield y / 2;
// 	return x + y + z;
// }

// let it = foo(3);
// console.log(it.next()); // {12, false} x=3
// console.log(it.next(5)); // {3, false} y=6
// console.log(it.next(7)); // {16, true} z=7

// const hala = async () => {
// 	console.log("222");
// 	return "what show";
// 	await console.log("111");
// 	console.log("666");
// };
// console.log(hala());

// let a = 0;
// let b = async () => {
// 	a = a + (await 10);
// 	console.log("2", a); // -> '2' 10
// };
// b();
// a++;
// console.log("1", a); // -> '1' 1

function requestImg() {
	var p = new Promise(function (resolve, reject) {
		var img = new Image();

		img.onload = function () {
			resolve(img);
		};

		img.src = "http://www.baidu.com/img/flexible/logo/pc/result.png";
	});

	return p;
}

function timeout() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			reject("图片请求超时");
		}, 5000);
	});

	return p;
}

Promise.race([requestImg(), timeout()])

	.then(function (results) {
		console.log(results);
	})

	.catch(function (reason) {
		console.log(reason);
	});
