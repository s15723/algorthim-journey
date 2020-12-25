class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  next: TreeNode | null
  constructor(val?: number, left?: TreeNode, right?: TreeNode, next?: TreeNode) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
    this.next = next === undefined ? null : next
  }
}

/**
 * 前序遍历
 */
function connect(root: TreeNode): TreeNode {
  const connectTwoNode = (node1: TreeNode, node2: TreeNode) => {
    if (node1 === null || node2 === null) return
    
    node1.next = node2
    connectTwoNode(node1.left, node1.right)
    connectTwoNode(node2.left, node2.right)
    connectTwoNode(node1.right, node2.left)
  }

  if (root === null) return null
  connectTwoNode(root.left, root.right)
  return root
}
