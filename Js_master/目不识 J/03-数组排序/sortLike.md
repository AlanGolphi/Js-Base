# 介绍下关于排序相关的几个算法
想起上次学习排序算法还是在上次，那时还不是很能吃透，几个月后的今天再次提上日程，做个小总结，蛮有意思。

## 前提准备
主要是在排序时有些常用的小 tips，单独列出总结，在排序需要用到的时候使用 node 的 module.exports = fn() 导出，使用 const fn = require('./fn.js'); 导入即可

### 交换数组中两个元素
有两个版本，一个是通用的，另一个是利用了 ES6 的数组解构语法
```js
const swap = (a, b, arr) => {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

const swap = (a, b, arr) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
```

### 返回数组中的最大值
```js
const getMaxValue = arr => {
  return Math.max.apply(null, arr);
}
```
### 生成一个随机数组
这个还蛮有意思，用上了 JavaScript 好多数组的原生方法，最初的想法是生成一个数组用来排序，接下来完善得蛮不错的，好用。
```js
// 使用 Math.random() 生成 0 - 1 的随机数，乘以范围 range，
// 然后使用 toFixed() 方法对结果取有效数字变成字符串，
// 最后使用 Number() 方法转换成数字。
/**
 *
 * @param {*} n 多少位
 * @param {*} range 随机数范围
 * @param {*} dec 保留几位小数
 * @returns {[]} res
 * 生成一个包含 n 个 range 范围内整数的数组
 */
const getUnorder = (n, range, dec) => {
  const res = [];
  while (n--) {
    res.push(Number((Math.random() * range).toFixed(dec)))
  }
  return res;
}
```

### 生成一个升序数组
这个就比较简单了，生成一个[0 - n] 的数组
```js
/**
 *
 * @param {*} n 要几位数
 * @returns {[]}
 */
const getOrder = n => {
  const res = [];
  let i = 0;
  while (i <= n) {
    res.push(i);
    i++;
  }
  return res;
}
```

### 如何计算排序用时
之前一直使用的是 performance.now()，最近看到另一种，更加直观，现在将两种方法都列出。
```js
// 1. performance.now();
let start = performance.now();
arr.sort((a, b) => (a - b));
let end = performance.now();
console.log('run time', end - start);

// 2. console.time('run time') + console.timeEnd('run time')
// 这种方法会自动匹配 console.time() 里的字符串作为标题，
// 并且最后打印 time 和 timeEnd 之间函数执行的时间
console.time('run time');
arr.sort((a, b) => (a - b));
console.timeEnd('run time');
```

### 将数组乱序(shuffle 洗牌算法)
这里介绍两种，一种是 Fisher Yates，另一种的名字叫 sort(Random Order)，其效果可在 [Will It Shuffle](https://bost.ocks.org/mike/shuffle/compare.html) 中查看

```js
// 1. Fisher Yates 经典洗牌算法
const shuffle = arr => {
  const len = arr.length;
  while (len) {
    const index = Math.floor(Math.random() * len--);
    swap(len, index, arr);
  }
  return arr;
}

// 2. sort(random order)
const shuffle = arr => {
  const match = arr.map(Math.random);
  return arr.sort((a, b) => (match[a] - match[b]));
}

// 两种算法都可以将数组顺序打得很乱，个人倾向使用 Fisher Yates，
// 第二种需要生成一个额外大小为 n 的随机数数组作为 sort 的种子，
// 空间消耗更大些。
```

## 几大排序算法

### 冒泡排序
使用双重 for 循环，每次都把最大的元素移到后面。
```js
const bubbleSort = (arr) => {
  let flag = false; 
  // 做个标记，如果有交换则置为 true，如果一遍循环都没有交换，则直接退出
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1, arr);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return arr;
}
```
### 插入排序
使用双重 for 循环，如果前面的值都比自己大，就将前面的值后移。
```js
const insertSort = (arr) => {
  if (arr.length < 2) return arr;
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    let j = i - 1;
    for (j; j >= 0; j--) {
      if (arr[j] > val) {
        arr[j + 1] = arr[j];
      } else break;
    }
    arr[j + 1] = val;
  }
  return arr;
}
```

### 选择排序
每次都遍历剩余数组，将最小的元素放在数组尾
```js
const selectSort = (arr) => {
  let minIndex = 0;
  for (let i = 0; i < arr.length; i++){
    minIndex = i;
    for (let j = i; i < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(i, minIndex, arr);
    }
  }
  return arr;
}
```

### 计数排序
计数排序是一种非比较类的排序，思路是利用额外 O(n) 的空间储存每个值的个数，最后再将储存数组的值按索引输出到结果数组。  
如: [2,2,1,3,1,3,6,5,3,4]  
||   
[2, 2, 3, 1, 1, 1]  
[1, 2, 3, 4, 5, 6]
```js
const countSort = (arr) => {
  const res = [];
  const maxValue = getMaxValue(arr);
  const container = new Array(maxValue + 1);
  for (let i = 0; i < arr.length; i++) {
    container[arr[i]] = container[arr[i]] ? container[arr[i]] + 1 : 1;
  }
  for (let i = 0; i <= maxValue; i++) {
    if (container[i]) {
      while (container[i]--) {
        res.push(i);
      }
    }
  }
  return res;
}
```

### 归并排序
归并排序的思路是数组不断分成两组数组，直到两个只数组均为有序的，再将两合并。
```js
const mergeSort = (arr) => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.splice(0, mid);
  return merge(mergeSort(left), mergeSort(arr));
}

const merge = (left, right) => {
  // 这个子函数的作用是将有序的 left 和 right 合并成一个数组
  const res = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  // 有可能上面 while 完后 left 或 right 还有值
  return [...res, ...left, ...right];
}
```

### 快速排序
这里快速排序有两个版本，一个是直观版本，一个是第一眼看去蛮难理解的版本。基本思想都是每次在数组中选定一个哨兵元素，将整个数组中大于和小于标兵的数分别放在两个数组中，再分别对这两个数组进行递归快排。  
最坏情况: O(n²)  最好情况: O(n)  平均时间复杂度: O(nlogn)
```js
// 1. 直观版，第一次见到是在阮一峰老师的博客
const quickSort = (arr) => {
  if (arr.length < 2) return arr;
  const left = [];
  const right = [];
  const midIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(midIndex, 1)[0];// 将这个元素从数组中剥离出来作为哨兵元素
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// 2. 一眼复杂版
const quickSort = (arr, start = 0, end = arr.length - 1) => {
  if (start >= end) return arr;
  if (arr.length < 2) return arr;
  let i = start;
  let j = end;
  const pivot = arr[i];
  while (i < j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(i, j, arr);
      i++;
      j--;
    }
  }
  // 经过上面 while 一顿操作后，数组被分为两个部分，此时哨兵元素时 arr[i]
  // 递归调用 quickSort 函数进行快排
  quickSort(arr, start, i - 1);
  quickSort(arr, i, end);
  return arr;
}
```

## 复杂度、稳定度分析

|排序算法|平均时间复杂度|最坏时间复杂度|空间复杂度|稳定度|
|:----:|:----:|:----:|:----:|:----:|
|冒泡排序|O(n²)|O(n²)|O(1)|稳定|
|插入排序|O(n²)|O(n²)|O(1)|稳定|
|选择排序|O(n²)|O(n²)|O(1)|不稳定|
|计数排序|O(n + k)|O(n + k)|O(n + k)|不稳定|
|归并排序|O(nlogn)|O(nlogn)|O(n)|稳定|
|快速排序|O(logn)|O(n²)|O(logn)|不稳定|