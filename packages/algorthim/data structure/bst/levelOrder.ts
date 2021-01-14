import { TreeNode } from '../../leetcode/bst/helper'

const NULLTREENODE = '#'
const DIVIDER = ','

/*
 * Encodes a tree to a single string.
 */
/**
 * 层序遍历
 * 标准的层序遍历，队列中是不会存在 null 指针的
 * 我们这里反序列化时，需要记录空指针，需要稍加修改
 */
function serialize(root: TreeNode | null): string {
  const queue: TreeNode[] = []
  let res = ''
  queue.push(root)
  while (queue.length) {
    const cur = queue.shift()
    if (cur === null) {
      res += NULLTREENODE + DIVIDER
      continue
    }
    res += cur.val + DIVIDER
    queue.push(cur.left)
    queue.push(cur.right)
  }
  res = res.slice(0, -1)
  return res
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const treeNodes = data.split(DIVIDER)
  if (treeNodes.length === 0) {
    return null
  }
  if (treeNodes[0] === NULLTREENODE) {
    return null
  }

  const root = new TreeNode(Number(treeNodes.shift()))
  const queue: TreeNode[] = []
  queue.push(root)

  // 这个有 treeNodes.shift() 方法，性能不好
  //   while (queue.length) {
  //     const parent = queue.shift()
  //     const left = treeNodes.shift()
  //     if (left !== NULLTREENODE) {
  //       parent.left = new TreeNode(Number(left))
  //       queue.push(parent.left)
  //     } else {
  //       parent.left = null
  //     }

  //     const right = treeNodes.shift()
  //     if (right !== NULLTREENODE) {
  //       parent.right = new TreeNode(Number(right))
  //       queue.push(parent.right)
  //     } else {
  //       parent.right = null
  //     }
  //   }

  // 因为是迭代不是递归，完全可以不修改 treeNodes，用索引指向要处理的元素
  for (let i = 1; i < treeNodes.length; ) {
    const parent = queue.shift()

    const left = treeNodes[i++]
    if (left !== NULLTREENODE) {
      parent.left = new TreeNode(Number(left))
      queue.push(parent.left)
    } else {
      parent.left = null
    }

    const right = treeNodes[i++]
    if (right !== NULLTREENODE) {
      parent.right = new TreeNode(Number(right))
      queue.push(parent.right)
    } else {
      parent.right = null
    }
  }

  return root
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
