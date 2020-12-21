import {ListNode, createLinkedList, printList} from './helper'
/**
 * 反转链表的迭代实现
 * leetcode 25(k个一组)
 */
// 反转整个链表
const reverse = (head: ListNode): ListNode => {
    let prev = null, cur = head, next = head
    while(cur !== null) {
        next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev
}

// 反转 [a, b)
const reverseBetween = (a: ListNode, b: ListNode) => {
    let prev = null, cur = a, next = a
    while(cur !== b) {
        next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev
}

// k 个一组反转链表
const reverseKGroup = (head: ListNode, k: number): ListNode => {
    let end = head
    for (let i = 0; i < k; i++) {
        if (end === null) return head
        end = end.next
    }
    const newHead = reverseBetween(head, end)
    head.next = reverseKGroup(end, k)

    return newHead
};

const demo1 = createLinkedList([1,2,3,4,5])
console.log(printList(reverseKGroup(demo1, 3)))

