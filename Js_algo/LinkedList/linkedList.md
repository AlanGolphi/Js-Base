```js
/**
 * 链表的定义
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
```
# 和链表相关的算法题汇总

## 翻转链表

### 反转链表I
在头部定义两个同步向后移动的节点指针，然后不断将后一个指向前一个
```js
// 给一段链表，将其全部翻转
const reverseListNode = (head) => {
  let newHead = null;
  let cur = head;
  while (cur) {
    let temp = cur.next; // 暂时保存 cur.next，防止链表断裂
    cur.next = newHead;
    newHead = cur;
    cur = temp;
  }
  return newHead;
}
```
### 反转链表II
给定一个链表，以及中间一段区间[left, right]，将区间内节点翻转
```js
const reverseBetween = (head) => {
  let dummy = temp = new ListNode(null);
  dummy.next = head; // 定义这个防止 left right 是整个区间
  let count = right - left;
  let pre, cur, front, tail;
  for (let i = 0; i < left - 1; i++) {
    temp = temp.next; // 让 temp 移动到区间前
  }
  front = temp; // 区间前节点
  pre = tail = temp.next; // tail 是翻转后区间尾节点，pre 是翻转后区间前节点
  cur = pre.next; // cur 是翻转后的后段头节点

  for (let i = 0; i < count; i++) {
    // 开始对区间内节点进行翻转
    let node = cur.next;
    cur.next = pre;
    pre = cur;
    cur = node;
  }
  front.next = pre; // 将三段链表进行拼接
  tail.next = cur;
  return dummy.next;
}
```

### 两个一组翻转
给定一个链表，将其内部节点两两翻转。
```js
const swapPairs = (head) => {
  let dummy = new ListNode(null);
  dummy.next = head;
  let temp = dummy;
  while (temp.next && temp.next.next) {
    let node1 = temp.next;
    let node2 = temp.next.next;
    temp.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    temp = node1;
  }
  return dummy.next;
}
```
### K 个一组翻转
给定一个链表，将其 K 个一组进行翻转
```js
const reverseKGroup = (head, k) => {
  const dummy = new ListNode(null);
  dummy.next = head;
  let pre = end = dummy;
  while (end.next) {
    for (let i = 0; i < k && end !== null; i++) end = end.next;
    if (end == null) break; // 获取每组第 K 个节点
    let stop = end.next; // 保存 K 个节点后的节点，防止断裂
    end.next = null; // 将这段链表掐断
    let start = pre.next; // start 是这段链表的头部，翻转后会变成尾部
    pre.next = reverse(start); // 接上
    start.next = stop; // 接上
    pre = start;
    end = start;
  }
  return dummy.next;
}

const reverse = (node) => {
  let newHead = new ListNode(null);
  let curNode = node;
  while (curNode) {
    let temp = curNode.next;
    curNode.next = newHead;
    newHead = curNode;
    curNode = temp;
  }
  return newHead;
} 
```

## 环形链表

### 环形链表I
给定一个链表，判断其是否有环
```js
// Map 法
const hasCycle = (head) => {
  if (!head || !head.next) return false;
  const map = new Map();
  let cur = head;
  while (cur) {
    if (map.has(cur)) {
      return true;
    }
    map.set(cur, true);
    cur = cur.next;
  }
  return false;
}

// 快慢指针法
const hasCycle = (head) => {
  if (!head || !head.next) return false;
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    if (slow === fast) return true;
    slow = slow.next;
    fast = fast.next;
  }
  return false;
}
```

### 环形链表II
给定一个链表，判断是否有环，若有环返回环入口节点，如果没有环，返回 null
```js
const detectCycle = (head) => {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;
  while (true) {
    if (!fast || !fast.next) {
      return null;
    }
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  fast = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}
// 设无环节点长度 a，有环节点长度 b，快指针走过 f，慢指针走过 s。
// 当快慢指针相遇时，f = 2s; 
// 且快指针比慢指针多走 nb，即 f = s + nb。可得 s = nb。
// 从头结点转一圈到入口节点的步数时 a + nb，
// 而恰好慢指针还有 a 步就到入口节点，将快指针从头走 a 步即可
```
### 快乐数
给定一个数，每次将这个数迭代为其每位数的平方和，如果最终变成 1，则是快乐数，如果无限循环则返回 false
```js
const isHappy = n => {
  let slow = getPow(n);
  let fast = getPow(getPow(n));
  while (slow !== fast) {
    slow = getPow(slow);
    fast = getPow(getPow(fast));
  }
  return slow === 1;
}
const getPow = n => {
  let sum = 0;
  while (n > 0) {
    let bit = n % 10;
    sum += bit * bit;
    n = Math.floor(n / 10);
  }
  return sum;
}
```
## 其他

### 删除链表节点
删除给定链表的一个节点
```js
// 思路是将待删除节点的下一个值复制本节点，并调整指针跳过下个节点
const deleteNode = node => {
  node.val = node.next.val;
  node.next = node.next.next;
}
```

### 两数相加
给定两个逆序链表，返回新链表，新链表是原链表相加的逆序。
```js
const addTwoNumbers = (l1, l2) => {
  let p1 = l1;
  let p2 = l2;
  let cur =  l3 = new ListNode(0);
  let carry = 0;
  while (p1 || p2) {
    let v1 = p1 ? p1.val : 0;
    let v2 = p2 ? p2.val : 0;
    let sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    cur = cur.next;
  }
  if (carry) {
    cur.next = new ListNode(carry);
  }
  return l3;
}
```

### 删除排序链表中重复的值
给定一个排序链表，将其去重
```js
const deleteDuplicates = head => {
  if (!head) return head;
  let cur = head;
  while (cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else cur = cur.next;
  }
  return head;
}
```

### 回文链表
给定一个链表，判断它是不是回文链表
```js
const palindrome = head => {
  if (!head || !head.next) return true; 
  // 如果为空或者只有一个节点，则肯定为回文链表

  let slow = head;
  let fast = head;
  let pre = head;
  let temp = new ListNode(null);

  while (fast && fast.next) {
    // 通过快慢指针寻找链表的中间节点，并且在寻找的过程中翻转前半段链表
    pre = slow;
    slow = slow.next;
    fast = fast.next.next;
    pre.next = temp;
    temp = pre;
  }
  if (fast) {
    slow = slow.next; // 如果节点数为奇数，则需要将 slow 再后移一位再跟 pre 进行比较
  }
  while (slow && pre) {
    if (slow.val !== pre.val) {
      return false;
    }
    slow = slow.next;
    pre = pre.next;
  }
  return true;
}
```

### 排序链表
给定一个链表，将其排序后输出
```js
const sortList = head => {
  if (!head || !head.next) return head;
  let slow = head;
  let fast = head.next; // 使用快慢指针找到链表中点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let temp = slow.next;
  slow.next = null; // 分为两半后，将中间断开
  let left = sortList(head);
  let right = sortList(temp); // 递归不断分为两半
  let res = node = new ListNode(null);

  while (left && right) {
    // 将两段有序链表合成一条有序链表
    if (left.val < right.val) {
      node.next = left;
      left = left.next;
    } else {
      node.next = right;
      right = right.next;
    }
    node = node.next;
  }
  // 将剩余的链表接上
  node.next = left !== null ? left : right;
  return res.next;
}
```
