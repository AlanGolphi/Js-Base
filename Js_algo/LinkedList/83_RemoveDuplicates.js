/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 20:17:52
 * @LastEditTime: 2021-06-02 20:43:39
 */
// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
// 返回同样按升序排列的结果链表。
// 输入：head = [1,1,2,3,3]
// 输出：[1,2,3]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
	let newHead = head;
	while (head && head.next) {
		if (head == null || head.next == null) break;
		if (head.val == head.next.val) {
			head.next = head.next.next;
		} else head = head.next;
	}
	return newHead;
};
//遍历链表，如果遇到val相同的下一节点，就将其删除
