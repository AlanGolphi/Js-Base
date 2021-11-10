/*
 * @Author: AlanGolphi
 * @Date: 2021-04-02 09:07:31
 * @LastEditTime: 2021-04-02 11:20:54
 */

// 二叉树前序遍历，递归法
let postorderTraversal(root) {
    if (!root) {
        return [];
    }
    let arr = [];
    recur(root, arr);
    return arr;
}
let recur = function(root, arr) {
    if (!root) {
        return [];
    }
    arr.push(root.val);
    recur(root.left, arr);
    recur(root.right, arr);
}
// 二叉树中序遍历，递归法
let postorderTraversal(root) {
    if (!root) {
        return [];
    }
    let arr = [];
    recur(root, arr);
    return arr;
}
let recur = function(root, arr) {
    if (!root) {
        return [];
    }
    recur(root.left, arr);
    arr.push(root.val);
    recur(root.right, arr);
}
// 二叉树后序遍历，递归法
let postorderTraversal(root) {
    if (!root) {
        return [];
    }
    let arr = [];
    recur(root, arr);
    return arr;
}
let recur = function(root, arr) {
    if (!root) {
        return [];
    }
    recur(root.left, arr);
    recur(root.right, arr);
    arr.push(root.val);
}
// 对于递归法前中后序遍历二叉树，只需要关注变换 recur.push(root.val)在哪。

//iteration solution
//前序遍历，迭代法
let preorderTraversal(root) {
    let arr = [], res = []
    root && arr.push(root)

    while(arr.length > 0) {
        let cur = arr.pop()
        res.push(cur.val)

        cur.right && arr.push(cur.right)
        cur.left && arr.push(cur.left)
    }
    return res;
}

//中序遍历
var inorderTraversal = function(root) {
    var res = [];
    var arr = [];
    var node = root;
    while(arr.length || node) {
        while(node) {
            arr.push(node);
            node = node.left;
        }
        node = arr.pop();
        res.push(node.val);
        node = node.right;
    }
    return res;
};

//迭代法难好多，以后慢慢理解吧，递归法还是要深刻熟练使用

