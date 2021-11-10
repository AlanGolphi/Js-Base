/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 18:55:18
 * @LastEditTime: 2021-06-02 19:03:16
 */
// 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 要被删除的节点 。

// 输入：head = [4,5,1,9], node = 5
// 输出：[4,1,9]
// 解释：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
	node.val = node.next.val;
	node.next = node.next.next;
};
//因为只知道当前node节点而不知道前一个节点，所以采用将node.next的值赋给node，再删除node.next
