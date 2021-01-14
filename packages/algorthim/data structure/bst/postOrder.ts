import { TreeNode } from '../../leetcode/bst/helper'

const NULLTREENODE = '#'
const DIVIDER = ','

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const traverse = (root: TreeNode | null) => {
    if (root === null) {
      res += NULLTREENODE + DIVIDER
      return
    }

    traverse(root.left)
    traverse(root.right)
    res += root.val + DIVIDER
    return
  }

  let res = ''
  traverse(root)
  res = res.slice(0, -1)
  return res
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const treeNodes = data.split(DIVIDER)

  // 遍历数组，返回树结构
  const traverse = (treeNodes: string[]) => {
    if (treeNodes.length === 0) {
      return null
    }

    const last = treeNodes.pop()
    if (last === NULLTREENODE) {
      return null
    }
    const root = new TreeNode(Number(last))
    root.right = traverse(treeNodes)
    root.left = traverse(treeNodes)
    return root
  }

  return traverse(treeNodes)
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
