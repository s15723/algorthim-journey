import { ListNode, createLinkedList, printList } from './helper'
/**
 * 判断回文单链表 leetcode 234
 * 寻找回文串是从中间向两端扩展
 * 判断回文串是从两端向中间收缩
 * 对于链表，可以
 * 1.反转链表，和原链表进行比较
 * 2.利用链表的后序遍历
 */

// 前序、后序遍历
const demo1 = createLinkedList([1, 2, 3, 4, 5])
const traverse = (head: ListNode) => {
  if (head === null) return
  // 前序
  console.log('preOrder', head.val)
  traverse(head.next)
  // 后序
  console.log('postOrder', head.val)
}
// traverse(demo1)

// 既然链表可以后序遍历，我们就可以借助双指针的思想
// 实际上就是把链表节点放入一个栈，然后再拿出来，这时候元素顺序就是反的
// 只不过我们利用的是递归函数的堆栈而已
// 时间 O(N)，空间 O(N)递归堆栈
const isPalindrome = (head: ListNode): boolean => {
  const traverse = (right: ListNode): boolean => {
    if (right === null) return true
    let res = traverse(right.next)
    res = res && right.val === left.val
    left = left.next
    return res
  }

  let left = head
  return traverse(head)
}
const demo2 = createLinkedList([1, 2, 3, 2, 1])
// console.log(isPalindrome(demo1))
// console.log(isPalindrome(demo2))

// 优化空间复杂度
// 思路
// 1.快慢指针寻找链表中点
// 2.从中点下个节点开始反转链表，并通过双指针比较
// 3.比较完后，反转链表成原来的状态，不改变链表结构
const isPalindromeNR = (head: ListNode): boolean => {
  let slow = head,
    fast = head
    while(fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    // 如果节点数为偶数，fast 为 null，slow不需要移动
    // 如果节点数为奇数，fast不为 null，slow当前为链表中点，还需要再往前进一步，指向待反转链表的头节点
    if (fast !== null) {
        slow = slow.next
    }

    const reverse = (head: ListNode): ListNode => {
        let prev = null, cur = head, next = head
        while(cur) {
            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        }
        return prev
    }

    let right = reverse(slow)
    let left = head
    // 因为右边反转的链表长度 <= 左边链表长度(当链表长度为奇数时，多一个中点)
    // 所以迭代终止条件为 right === null
    while(right !== null) {
        if (left.val !== right.val) {
            return false
        }
        left = left.next
        right = right.next
    }
    return true
}

console.log(isPalindromeNR(demo1))
console.log(isPalindromeNR(demo2))
