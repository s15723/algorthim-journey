import {ListNode, createLinkedList, printList} from './helper'
/**
 * 反转链表的一部分，leetcode 92 25
 * 实现递归重点在于明确函数的定义
 */
// 反转整个链表
// 输入head，将以 head 为头节点的链表反转，并返回反转之后的头节点
const reverse = (head: ListNode): ListNode => {
    if (head.next === null) return head

    const last = reverse(head.next)
    head.next.next = head
    head.next = null
    return last
}

const demo1 = createLinkedList([1,2,3,4,5])
// console.log(printList(reverse(demo1)))

// 反转前 n 个节点
const reverseN = (head: ListNode, n: number): ListNode => {
    let successor: ListNode = null

    const dfs = (head: ListNode, n: number): ListNode => {
        if (n === 1) {
            successor = head.next
            return head
        }

        const last = dfs(head.next, n-1)
        head.next.next = head
        head.next = successor
        return last
    }

    return dfs(head, n)
}
const demo2 = createLinkedList([1,2,3,4,5])
// console.log(printList(reverseN(demo2, 3)))

// 反转 [m,n]
const reverseBetween = (head: ListNode, m: number, n: number): ListNode => {
    if (m === 1) {
        return reverseN(head, n)
    }

    head.next = reverseBetween(head.next, m-1, n-1)
    return head
}
const demo3 = createLinkedList([1,2,3,4,5])
// console.log(printList(reverseBetween(demo3, 3, 4)))

// k 个一组反转链表
const reverseKGroup = (head: ListNode, k: number): ListNode => {

    let end = head
    for (let i = 0; i < k; i++) {
        if (end === null) return head
        end = end.next
    }
    const newHead = reverseN(head, k)
    head.next = reverseKGroup(end, k)

    return newHead
};

const demo4 = createLinkedList([1,2,3,4,5])
console.log(printList(reverseKGroup(demo4, 3)))