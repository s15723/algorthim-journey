import { TreeNode } from '../helper'

const NULLTREENODE = '#'
const DIVIDER = ','

function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  const memo = new Map<string, number>()
  const res: Array<TreeNode> = []

  const traverse = (root: TreeNode | null): string => {
    if (root === null) {
      return NULLTREENODE
    }

    const left = traverse(root.left)
    const right = traverse(root.right)

    const subTree = left + DIVIDER + right + DIVIDER + root.val

    if (memo.get(subTree) === 1) {
      res.push(root)
    }

    memo.set(subTree, (memo.get(subTree) || 0) + 1)

    return subTree
  }

  traverse(root)
  return res
}
