/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 19:05:21
 * @LastEditTime: 2021-06-02 19:20:51
 */
//给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//
function reverseList(head) {
	let newHead = null;
	let temp = head.next;
	while (head) {
		head.next = newHead;
		newHead.next = temp;
		newHead = head;
		head = temp;
	}
	return newHead;
}
