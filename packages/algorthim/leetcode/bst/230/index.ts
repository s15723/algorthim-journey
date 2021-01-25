import { TreeNode } from '../helper'

/**
 * 这样子利用中序遍历的时间复杂度为 O(N)
 * 而 bst 各种操作的级别都是 O(logn) 级别的，这样显然不合适
 * 
 * 我们可以思考一下为什么 bst 的操作可以达到 O(logn) 级别？
 * 是因为他的左子树小右子树大的特性啊，所以我们永远只需要遍历左/右子树中的一个
 * 
 * 那我们需要找到第k个元素，关键就在于每个节点知道自己排第几
 * 假设当前节点排 m
 * k === m,找到
 * k < m，去左子树搜索第 k 个元素
 * k > m，去右子树搜索第 k - m 个元素
 * 
 * 那么每个节点如何知道自己排第几呢？
 * 需要每个节点维护以自己为根的这颗二叉树有多少个节点，
 * 然后根据 node.left 这棵树的节点数 + 1，推导出排名
 */
function kthSmallest(root: TreeNode | null, k: number): number {
  let index = 0
  let res = 0

  const traverse = (root: TreeNode | null, k: number) => {
    if (root === null) {
      return
    }
    traverse(root.left, k)
    index++
    if (index === k) {
      res = root.val
    }
    traverse(root.right, k)
  }

  traverse(root, k)

  return res
}
