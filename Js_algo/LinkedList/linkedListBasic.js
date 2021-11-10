/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 18:41:20
 * @LastEditTime: 2021-06-02 18:49:57
 */
//Js中的链表使用Object来实现
// a -> b -> c -> d
let a = { val: "a" };
let b = { val: "b" };
let c = { val: "c" };
let d = { val: "d" };
a.next = b;
b.next = c;
c.next = d;

//遍历链表
// let p = a;
// while (p) {
// 	console.log(p.val);
// 	p = p.next;
// }

//添加一个节点
// let e = { val: "e" };
// e.next = d;
// c.next = e;

//删除节点
// c.next = d;

// test
let li = a;
for (let i = 0; i < 3; i++) {
	li = li.next;
}
console.log(li.val);
