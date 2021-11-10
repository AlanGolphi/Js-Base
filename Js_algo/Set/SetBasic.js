/*
 * @Author: AlanGolphi
 * @Date: 2021-06-05 20:53:11
 * @LastEditTime: 2021-06-05 21:40:55
 */
// Set无序且唯一

// 使用Set去重
const arr = [1, 1, 2, 2, 3, 3];
const singleArr = [...new Set(arr)];


// 判断Set中是否存在某个数
const has = new Set(arr).has(4);


// 求两个Set的交集
const set1 = new Set(arr);
const set2 = new Set([2, 2, 3, 3, 4, 4]);
const inside = new Set(
	[...set1].filter(item => 
		set2.has(item);
	)
);


// Set的一些方法
let mySet = new Set();


// 添加数字，字符串都是无序且唯一
mySet.add(1);
mySet.add('n');


// 添加对象时，只要对象定义的时候不是同一个对象，则都可以存入Set中
mySet.add({a:1, b:2});
const obj = {a:1, b:2};
mySet.add(obj);


// has, delete
mySet.has(item);
mySet.delete(item);


//遍历一个Set,以下三个遍历打印的结果都一样，即Set的keys values都一样
for (let item of mySet) console.log(item);
for (let item of mySet.keys()) console.log(item);
for (let item of mySet.values()) console.log(item);


// Array 和 Set互相转换
const myArr = [...mySet];
const myArr = Array.from(mySet);
const mySet2 = new Set([item,item,item]);


// 两个Set间求交集和差集
const intersection = new Set([...mySet].filter(item => mySet2.has(item)));
const difference = new Set([...mySet].filter(item => !mySet2.has(item)));

