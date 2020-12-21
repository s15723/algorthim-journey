// 单链表节点的结构
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export const createLinkedList = (arr: number[]) => {
  const n = arr.length
  if (n === 0) return null

  const dummyHead = new ListNode(-1)
  let curNode = dummyHead
  for (let i = 0; i < n; i++) {
    curNode.next = new ListNode(arr[i])
    curNode = curNode.next
  }

  return dummyHead.next
}

export const printList = (head: ListNode) => {
  let curNode = head
  let res = ''
  while (curNode !== null) {
    res += `${curNode.val}->`
    curNode = curNode.next
  }
  res += 'null'
  return res
}
