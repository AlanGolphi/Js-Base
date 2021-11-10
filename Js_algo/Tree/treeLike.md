# 和二叉树相关的一些常见算法
二叉树在 JS 中，常用对象嵌套实现，如下：
```js
const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null
    },
    right: {
      val: 5,
      left: null,
      right: null
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    },
  },
};
module.exports = bt;

```

## 深度遍历相关
二叉树前后中后序遍历都有递归版和非递归版
### 二叉树前序遍历  
递归版
```js
const bt = require('./bt');
const res = [];
const preOrder = (root) => {
  if (!root) return [];
  res.push(root.val);
  preOrder(root.left);
  preOrder(root.right);
}
preOrder(bt);
return res;

```
非递归版
```js
const bt = require('./bt');
const preOrder = (root) => {
  const res = [];
  const stack = [];
  root && stack.push(root);
  while (stack.length) {
    let cur = stack.pop();
    res.push(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
    // 左边需要先出，所以先 push(cur.right)
  }
  return res;
}

```
### 二叉树中序遍历  
递归版
```js
const bt = require('./bt');
const res = [];
const inOrder = (root) => {
  if (!root) return [];
  inOrder(root.left);
  res.push(root.val);
  inOrder(root.right);
}
inOrder(bt);
return res;

```
非递归版
```js
const bt = require('./bt');
const inOrder = (root) => {
  const res = [];
  const stack = [];
  let cur = root;
  while (stack.length || cur) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    let node = stack.pop();
    res.push(node.val);
    if (node.right) {
      cur = node.right;
    }
  }
  return res;
}

```
### 二叉树后序遍历  
递归版
```js
const bt = require('./bt');
const res = [];
const postOrder = (root) => {
  if (!root) return [];
  postOrder(root.left);
  postOrder(root.right);
  res.push(root.val);
}
postOrder(bt);
return res;

```
非递归版
```js
const bt = require('./bt');
const postOrder = (root) => {
  const res = [];
  const stack1 = [];
  const stack2 = [];
  let cur = root;
  cur && stack1.push(cur);
  while (stack1.length) {
    let node = stack1.pop();
    stack2.push(node.val);
    node.left && stack1.push(node.left);
    node.right && stack1.push(node.right);
  }
  while (stack2.length) {
    res.push(stack2.pop());
  }
  return res;
}
```

### 打印二叉树所有路径
> 类似深度遍历，用递归更优雅
```js
const allPath = (root) => {
  const res = [];
  const getPath = (node, curPath) => {
    if (!node.left && !node.right) {
      res.push(curPath + node.val);
    }
    curPath += node.val + '->';
    node.left && getPath(node.left, curPath);
    node.right && getPath(ndoe.right, curPath);
  }
  getPath(root, '');
  return res;
}
```

### 求二叉树所有路径的和
> 在递归的过程中带上路径和

```js
const sumNumber = root => {
  const getSum = (node, preSum) => {
    if (!node) return 0;
    const sum = preSum * 10 + node.val;
    if (node.left || node.right) {
      return getSum(node.left, sum) + getSum(node.right, sum);
    } else {
      return sum;
    }
  }
  return getSum(root, 0);
}

```

### 树中是否存在和为 target 的路径
> 需要有递归的直觉！

```js
const bt = require('./bt');
const hasTargetPath = (root, target) => {
  if (!root) reutrn false;
  if (!root.left && !root.right) {
    return target === root.val;
  }
  return hasTargetPath(root.left, target - root.left) || hasTargetPath(root.right, target - root.val);
}
```

## 广度遍历相关
广度优先遍历常需要用队列记录每一层的长度

### 二叉树层序遍历
```js
const bt = require('./bt');
const levelOrder = (root) => {
  const res = [];
  if (!root) return res;
  const queue = [root];
  while (queue.length) {
    let len = queue.length;
      let temp = [];
    while (len--) {
      let node = queue.shift();
      temp.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(temp);
  }
  return res;
}
```

### N叉树的层序遍历
n叉树的层序遍历与二叉树的层序遍历大差不差。
```js
const levelOrder = root => {
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    let len = stack.length;
    let temp = [];
    while (len--) {
      let node = stack.pop();
      temp.push(node.val);
      stack.push(...node.children); 
      // 可以用解构的语法将节点的 children 节点都放入模拟堆栈，等同如下
      // for (let i = 0; i < node.children.length; i++) {
      //   stack.push(node.children[i])
      // }
    }
    res.push(temp);
  }
  return res;
```

### 二叉树最小深度
> 也是层序遍历类似，当左右子树都不存在时，将层数弹出

```js
const bt = require('./bt');
const minDepth = (root) => {
  let level = 0;
  if (!root) return level;
  const queue = [root];
  while (queue.length) {
    level++;
    let len = queue.length;
    while (len--) {
      let node = queue.shift();
      if (!node.left && !node.right) return level;
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return level;
}

```

### 二叉树最大深度
> 层序遍历类似，层序遍历是将每层输出到数组，最大深度是每次 level + 1


```js
const bt = require('./bt');
const maxDepth = (root) => {
  let level = 0;
  if (!root) return level;
  const queue = [root];
  while (queue.length) {
    let len = queue.length;
    while (len--) {
      let node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    level++;
  }
  return level;
}
```

## 其他特殊题

### 镜像翻转二叉树
> 其实这题不太好想，虽然代码很简洁
```js
const inverTree = root => {
  if (!root) return root;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}
```