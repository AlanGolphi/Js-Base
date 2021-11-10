# 总结下 JS 的运行机制以及各种异步方案
  最近看了好多关于 JS 异步单线程的文章，能看懂，但是自己手写一遍还是有些吃力，故此记录下  
  参考 [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)   [「硬核JS」一次搞懂JS运行机制](https://juejin.cn/post/6844904050543034376#heading-19) 

## JS 运行机制
进程是CPU资源分配的最小单位，线程是CPU调度的最小单位，浏览器是多进程的，包括 Browser进程，插件进程，GPU进程，渲染进程。  

### 渲染进程了解
渲染进程包含：（详见[渲染进程的主要线程](https://juejin.cn/post/6844904050543034376#heading-13)）  
- GUI渲染线程  
  - 负责渲染浏览器界面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等  
    - 解析html代码(HTML代码本质是字符串)转化为浏览器认识的节点，生成DOM树，也就是DOM Tree  
    - 解析css，生成CSSOM(CSS规则树)  
    - 把DOM Tree 和CSSOM结合，生成Rendering Tree(渲染树)
  - 当修改了一些元素的颜色或者背景色，页面就会重绘(Repaint)  
  - 当我们修改元素的尺寸，页面就会回流(Reflow)  
  - 当页面需要Repaing和Reflow时GUI线程执行，绘制页面
回流(Reflow)比重绘(Repaint)的成本要高，我们要尽量避免Reflow和Repaint  
  - GUI渲染线程与JS引擎线程是互斥的  
    - 当JS引擎执行时GUI线程会被挂起(相当于被冻结了)  
    - GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行  
- JS 引擎线程  
  - JS引擎线程就是JS内核，负责处理Javascript脚本程序(例如V8引擎)
  - JS引擎线程负责解析Javascript脚本，运行代码
  - JS引擎一直等待着任务队列中任务的到来，然后加以处理
    - 浏览器同时只能有一个JS引擎线程在运行JS程序，所以js是单线程运行的
    - 一个Tab页(renderer进程)中无论什么时候都只有一个JS线程在运行JS程序
  - GUI渲染线程与JS引擎线程是互斥的，js引擎线程会阻塞GUI渲染线程
    - 就是我们常遇到的JS执行时间过长，造成页面的渲染不连贯，导致页面渲染加载阻塞(就是加载慢)
    - 例如浏览器渲染的时候遇到\<script\>标签，就会停止GUI的渲染，然后js引擎线程开始工作，执行里面的js代码，等js执行完毕，js引擎线程停止工作，GUI继续渲染下面的内容。所以如果js执行时间太长就会造成页面卡顿的情况
- 事件触发线程  
  - 属于浏览器而不是JS引擎，用来控制事件循环，并且管理着一个事件队列(task queue)
  - 当js执行碰到事件绑定和一些异步操作(如setTimeOut，也可来自浏览器内核的其他线程，如鼠标点击、AJAX异步请求等)，会走事件触发线程将对应的事件添加到对应的线程中(比如定时器操作，便把定时器事件添加到定时器线程)，等异步事件有了结果，便把他们的回调操作添加到事件队列，等待js引擎线程空闲时来处理。
  - 当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理
  - 因为JS是单线程，所以这些待处理队列中的事件都得排队等待JS引擎处理
- 定时器线程
  - setInterval与setTimeout所在线程
  - 浏览器定时计数器并不是由JavaScript引擎计数的(因为JavaScript引擎是单线程的，如果处于阻塞线程状态就会影响记计时的准确)
  - 通过单独线程来计时并触发定时(计时完毕后，添加到事件触发线程的事件队列中，等待JS引擎空闲后执行)，这个线程就是定时触发器线程，也叫定时器线程
  - W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms  
- 异步网络请求线程
  - 在XMLHttpRequest在连接后是通过浏览器新开一个线程请求
  - 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中再由JavaScript引擎执行
  - 简单说就是当执行到一个http异步请求时，就把异步请求事件添加到异步请求线程，等收到响应(准确来说应该是http状态变化)，再把回调函数添加到事件队列，等待js引擎线程来执行

<br>  

### 事件循环 Event loop 了解
此部分较大关联的主要是宏任务(macro tast) 和微任务(micro task)  
其中宏任务主要包括：  
- 主代码块 \<script\>
- setTimeout
- setInterval
- setImmediate ()-Node
- requestAnimationFrame ()-浏览器  

其中微任务主要包括：
- process.nextTick ()-Node
- Promise.then()
- catch
- finally
- Object.observe
- MutationObserver

#### 事件循环过程简述
1. 同步代码开始运行，遇到 setTimeout setInterval 这样的定时器任务，则交给定时器线程，等到定时完成就将任务回调函数添加到宏任务队列，当遇到 Promise 或异步 http 请求时，交给异步网络请求线程进行网络请求，当结果返回时，将回调函数添加到微任务队列。
2. 当同步代码执行完成，JS 引擎闲置，就询问事件触发进程，检查事件队列里的任务是否为空，准备执行异步任务。
3. 每次执行完宏任务，微任务队列整队出队，依次执行。
4. 当微任务队列执行完毕，线程执行权利交给 GUI 渲染线程。
5. 当一轮渲染完成后，权利交回 JS引擎线程，检查宏任务队列，将其出队一个并执行，如果执行宏任务过程中产生微任务，则重复 3 4 步。


## 各种异步方式

### 回调函数
Callback 函数即事件返回结果后自动执行的函数。缺点：  
1. 使用时需要嵌套，高耦合，可读性差，容易形成回调地狱。
2. 不能使用 try{} catch() 捕捉错误。
```js
ajax(url1, () => {
  // 处理逻辑
  ajax(url2, () => {
    // 处理逻辑
    ajax(url3, () => {
      // 处理逻辑
    })
  })
})
```
### Generator + yield
生成器函数，配合 yield 来控制函数执行。
```js
function* foo(x) {
	let y = 1 + (yield x * 4);
	let z = yield y / 2;
	return x + y + z;
}

let it = foo(3);
console.log(it.next()); // {12, false} x=3
console.log(it.next(5)); // {3, false} y=6
console.log(it.next(7)); // {16, true} z=7
```
第一次调用 let it = foo(3); 会忽略传入的参数，并且不知心，当调用 next 时将参数传给对应变量，输出 yield() 里的内容。之后的 next() 如果不传参，则会默认参数 undefined。使用 Generator 函数重写上面回调函数的 demo，如下：  
```js
function* fetch() {
  yield ajax(url1, () => {});
  yield ajax(url2, () => {});
  yield ajax(url3, () => {});
}
let it = fetch();
let res1 = it.next();
let res2 = it.next();
let res3 = it.next();
```
代码的虽然更加简洁，但是因为使用了 Generator，还是比较绕。
### Promise
Promise 属于一个构造函数，使用时用 new 生成一个实例，实例包含三种状态，初始 pending，之后 fulfill(resolved) 或 rejected，且状态只能改变一次。
```js
new Promise((resolve, reject) => {
  console.log('lalala'); // 在 Promise 内部的函数同步执行
  resolve(666); // 状态改变，fulfill
}).then((res) => {
  console.log(res); // then 后执行异步回调，注册一个微任务
})
```
使用 Promise 重写上面的 ajax，实现链式调用，如下：
```js
ajax(url1)
  .then((res) => {
    console.log(res);
    return ajax(url2);
  })
  .then((res) => {
    console.log(res);
    return ajax(url3);
  })
  .then((res) => console.log(res));
```

### Async + Await
传说中的异步终极解决方案，可以使用同步的方法写异步代码。其中 async 必须配合 await 来使用。
```js
const hala = async () => {
	console.log("222");
	await console.log("111");
	console.log("666");
};
hala();
// 222
// 111
// 666
```
在 async 函数里的其他语句是同步执行的，遇到 await 后的语句是异步微任务。如果 return 则会返回一个 Promise。  
使用 async/await 重写 上面的 ajax，几乎与同步代码一致，如下：
```js
// 如果三次请求之间没有互相依赖，可以使用 Promise.all()
async function getData() {
  await fetch(url1);
  await fetch(url2);
  await fetch(url3);
}
```
async/await 内部理解，当执行 async 时，会将外部变量拷贝一份进函数内部，当遇到 await 时，暂存变量值，注册一个异步微任务。继续执行外部的同步代码，同步代码执行完毕后，进入 await ，再拿出变量值进行执行。
```js
let a = 0;
let b = async () => {
  a = a + await 10;
  console.log('2', a);
}
b();
a++;
console.log('1', a);
// '1' 1
// '2' 10
```



