/*
 * @Author: AlanGolphi
 * @Date: 2021-04-07 16:20:17
 * @LastEditTime: 2021-04-07 17:44:48
 */
//双重 for循环数组去重
let uniqueArray1 = function(array) {
    if (array.length == 1) {
        return array;
    }
    const res = [];
    for (let i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++) {//这里如果用let，后面需要赋值的时候j在作用域外找不到
            if (array[i] === res[j]) break;
        }
        if (j == resLen) {
            res.push(array[i]);
        }
    }
    return res;
}
let test = [0,0,'i','i'];
console.log(uniqueArray1(test));

//使用 indexOf优化内层循环
let uniqueArray2 = function(array) {
    const res = [];
    for (let i = 0, len = array.length; i < len; i++) {
        const currentValue = array[i];
        if (res.indexOf(currentValue) == -1) {
            res.push(currentValue);
        }
    }
    return res;
}
let test = [0,0,'i','i'];
console.log(uniqueArray2(test));

//排序数组去重
let unique3 = function(array) {
    const res = [];
    const sortedArray = array.concat().sort();
    let seen;
    for (let i = 0, len = array.length; i < len; i++) {
        if (!i || seen != sortedArray[i]) {
            res.push(sortedArray[i]);
        }
        seen = sortedArray[i];
    }
    return res;
}
let test = [0,0,'i','i'];
console.log(uniqueArray3(test));

// Set 数组去重
let unique4 = function(array) {
    return Array.from(new Set(array));
}
let test = [0,0,'i','i'];
console.log(uniqueArray4(test));
