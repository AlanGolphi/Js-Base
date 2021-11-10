/*
 * @Author: AlanGolphi
 * @Date: 2021-03-24 14:36:52
 * @LastEditTime: 2021-03-28 14:09:10
 * @Learn the classical 8 sort methods
 */
function swap(array, a, b) {
    //Es6
    [array[a], array[b]] = [array[b], array[a]];

    //Old method
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

//BubbleSort 冒泡排序 O(n²)
function bubbleSort(array) {
    const len = array.length;
    
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (array[j] < array[j + 1]);
            swap(array, j, j + 1);
        }
    }
    return array;
}
//ImprovedBubbleSort 改进冒泡排序 O(n²)
function bubbleSort(array) {
    const len = array.length;
    
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (array[j] < array[j + 1]);
            swap(array, j, j + 1);
        }
    }
    return array;
}

//SelectionSort 选择排序 O(n²)
function selectionSort(array) {
    const len = array.length;
    if (len == 0) {
        return array;
    }
    let indexMin;

    for (let i = 0; i < len - 1; i++) {
        let indexMin = i;
        for (let j = i; j < len; j++) {
            if (array[indexMin] > array[j]) {
                indexMin = j;
            }
            if (i !== indexMin) {
                swap(array, i, indexMin);
            } 
        }
    }
    return array;
}

//InsertionSort 插入排序 O(n) -- O(n²)
function insertionSort(array) {
    const len = array.length;
    if (len == 0) {
        return array;
    }

    let temp;
    for (let i = 1; i < len; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && array[j - 1] > temp) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}

//MergeSort 归并排序 O(nlog(n)) 
//Firefox Mozilla:Array.prototype.sort()
function mergeSort(array) {
    if (array.length > 1) {
        const len = array.length;
        const mid = Math.floor(len / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));//这里注意 array.slice()所选取的数组范围;
        //递归调用自身，从数组长度为 1时开始排序，同时进行 merge(),concat();
        array = merge(left, right);
    }
    return array;
}
function merge(left, right) {
    const result = [];

    while (left.length > 0 && right.length > 0) {
        result.push((left[0] < right[0]) ? left.shift() : right.shift());
        //边比较，边将较小的数 push进 result[], 同时将这个数从 left/right中移除 shift();
    }
    return result.concat(left, right);
}

//QuickSort 快速排序 O(nlog(n)) 
//Chrome:Array.prototype.sort()
function quickSort(array, left, right) {
    if (left >= right) {
        return array;
    }
    let index = partition(array, left, right);

    quickSort(array, left, index - 1);
    quickSort(array, index + 1, right);
}
function partition(array, left, right) {
    let pivotValue = array[right];
    let targetIndex = left;

    for (let i = left; i < array.length - 1; i++) {
        if (array[i] < pivotValue) {
            [array[i], array[targetIndex]] = [array[targetIndex], array[i]];
            targetIndex++;
        }
        [array[targetIndex], array[right]] = [array[right], array[targetIndex]];
    }
    return targetIndex;
}


