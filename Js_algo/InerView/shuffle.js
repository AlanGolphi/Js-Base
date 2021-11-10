/*
 * @Author: AlanGolphi
 * @Date: 2021-03-25 18:19:14
 * @LastEditTime: 2021-03-25 19:03:34
 */

// Fisher-Yates 经典洗牌算法，用 random随机函数随机选定 index，然后 push(array[random]),再用 splice删除
function shuffle(array) {
    let result = [];//定义数组记得要用 = []
    let random;

    while (array.length > 0) {
        random = Math.floor(Math.random() * len);
        result.push(array[random]);
        array.splice(random, 1);
    }
    return result;
}

//Knuth Shuffle 从数组尾开始，从前 n-1个元素中随机挑选一个与当前元素交换，不用新建数组，节省空间
function Knuth(array) {
    let len = array.length;
    let random;

    while (len != 0) {
        random = Math.floor(Math.random() * (len--));
        swap(array, random, len);
    }
    return array;
}
function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
}

//test
let test = [1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,13];
console.log(shuffle(test));