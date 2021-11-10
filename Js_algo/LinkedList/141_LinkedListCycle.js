/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 20:44:33
 * @LastEditTime: 2021-06-02 20:59:05
 */
// 给定一个链表，判断链表中是否有环。
// 如果链表中存在环，则返回 true 。 否则，返回 false 。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
	let fast = (slow = head);
	if (head == null || head.next == null) return false;
	while (slow && fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
		if (slow === fast) return true;
	}
	return false;
};
//开始都将slow和fast定义在head，一快一慢，相遇的话则有环。
