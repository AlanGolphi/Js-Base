/*
 * @Author: AlanGolphi
 * @Date: 2021-04-02 12:34:43
 * @LastEditTime: 2021-04-02 14:33:53
 */
// No debounce
let count = 1;
let container = document.getElementById("container");

function getUserAction(e) {
	console.log(e); //每次移动会显示鼠标状态
	container.innerHTML = count++;
}
container.onmousemove = debounce(getUserAction, 1000);

//container.onmousemove = getUserAction;

//debounce 2 this指向正确
// function debounce(func, wait) {
//     var timeout;

//     return function () {
//         var context = this;//使 this指向正确指向

//         clearTimeout(timeout)
//         timeout = setTimeout(function(){
//             func.apply(context)
//         }, wait);
//     }
// }

//debounce 3 this正确指向 event对象正确
// function debounce(func, wait) {
// 	let timeout;
// 	return function () {
// 		let context = this; //使 this指向正确指向
// 		let args = arguments; // 使事件执行时 event对象正确
// 		clearTimeout(timeout);
// 		timeout = setTimeout(function () {
// 			func.apply(context, args);
// 		}, wait);
// 	};
// }

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		let self = this;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			func.apply(self, args);
		}, wait);
	};
}

//debounce 4 add immediate_act 可立即执行
// function debounce(func, wait, immediate) {
//     let timeout;

//     return function() {
//         let context = this;
//         let args = arguments;//arguments是一个对应于传递给函数的参数的类数组对象
//         if (timeout) {
//             clearTimeout(timeout);
//         }
//         if (immediate) {
//             //时间内执行了，不再执行
//             let callNow = !timeout;
//             timeout = setTimeout(function() {
//                 timeout = null;
//             },wait)
//             if (callNow) {
//                 func.apply(context, args);
//             }
//         } else {
//             timeout = setTimeout(function() {
//                 func.apply(context, args)
//             }, wait);
//         }
//     }
// }

//debounce 5 getUseAction() 可返回值
// function debounce(func, wait, immediate) {
//     let timeout, result;

//     return function() {
//         let context = this;
//         let args = arguments;//arguments是一个对应于传递给函数的参数的类数组对象
//         if (timeout) {
//             clearTimeout(timeout);
//         }
//         if (immediate) {
//             //时间内执行了，不再执行
//             let callNow = !timeout;
//             timeout = setTimeout(function() {
//                 timeout = null;
//             },wait)
//             if (callNow) {
//                 func.apply(context, args);
//             }
//         } else {
//             timeout = setTimeout(function() {
//                 func.apply(context, args)
//             }, wait);
//         }
//         return result;
//     }
// }

//debounce 6 add 周期内立刻取消防抖
// function debounce(func, wait, immediate) {
//     let timeout, result;

//     let debounced = function() {
//         let context = this;
//         let args = arguments;//arguments是一个对应于传递给函数的参数的类数组对象
//         if (timeout) {
//             clearTimeout(timeout);
//         }
//         if (immediate) {
//             //时间内执行了，不再执行
//             let callNow = !timeout;
//             timeout = setTimeout(function() {
//                 timeout = null;
//             },wait)
//             if (callNow) {
//                 func.apply(context, args);
//             }
//         } else {
//             timeout = setTimeout(function() {
//                 func.apply(context, args)
//             }, wait);
//         }
//         return result;
//     };
//     debounced.cancel = function() {
//         clearTimeout(timeout);
//         timeout = null;
//     };
//     return debounced;
// }
// let setUseAction = debounce(getUserAction, 1000);
// container.onmousemove = setUseAction;
// document.getElementById("button").addEventListener("click", function () {
// 	setUseAction.cancel();
// });
