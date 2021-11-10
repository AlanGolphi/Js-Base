/*
 * @Author: AlanGolphi
 * @Date: 2021-04-04 13:32:30
 * @LastEditTime: 2021-04-04 16:21:07
 */
// no throttle
let count = 1;
let container = document.getElementById("container");

function getUserAction(e) {
	console.log(e);
	container.innerHTML = count++;
}

// container.onmousemove = getUserAction;

// throttle 1 时间戳，时间戳内只执行一次，事件只在刚触发时执行，周期内其他时间不执行，有头无尾
// function throttle(func, wait) {
//     let context, args;
//     let previous = 0;

//     return function() {
//         context = this;
//         args = arguments;

//         let now = +new Date();
//         if (now - previous > wait) {
//             func.apply(context, args);
//             previous = now;
//         }
//     }
// }

// throttle 2 定时器法，触发先不执行，在周期结束时执行，无头有尾
// function throttle(func, wait) {
//     let timeout;

//     return function() {
//         let context = this;
//         let args = arguments;
//         if (!timeout) {
//             timeout = setTimeout(function() {
//                 timeout = null;
//                 func.apply(context, args);
//             }, wait)
//         }
//     }
// }

// throttle 3 时间戳+定时器 触发执行，周期结束也执行，有头有尾
// function throttle(func, wait) {
//     let context, args, timeout, remaining;
//     let previous = 0;

//     let later = function() {
//         let previous = +new Date();
//         timeout = null;
//         func.apply(context, args);
//     }

//     let throttled = function() {
//         context = this;
//         args = arguments;
//         let now = +new Date();
//         remaining = wait - (now - previous);

//         if (remaining <= 0 || remaining > wait) {
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             func.apply(context, args);
//         } else if (!timeout) {
//             timeout = setTimeout(later, remaining);
//         }
//     }
//     return throttled;
// }

function throttle(func, wait) {
	let timeout = true;
	return function (...args) {
		let self = this;
		if (!timeout) return;
		timeout = false;
		setTimeout(() => {
			func.apply(self, args);
			timeout = true;
		}, wait);
	};
}

container.onmousemove = throttle(getUserAction, 1000);
