import { TreeNode } from '../../leetcode/bst/helper'

const NULLTREENODE = '#'
const DIVIDER = ','
/**
 * 前序遍历
 */
function preOrderSerialize(root: TreeNode | null): string {
  const traverse = (root: TreeNode | null) => {
    if (root === null) {
      res += NULLTREENODE + DIVIDER
      return
    }

    res += root.val + DIVIDER
    traverse(root.left)
    traverse(root.right)
    return
  }

  let res = ''
  traverse(root)
  res = res.slice(0, -1)
  return res
}

/**
 * 一般语境下，只是前序遍历是不能还原二叉树结构的，因为缺少空指针信息
 * 至少要前、中、后序中的两种才可以还原二叉树
 * 但本题中是包含空指针的，所以只要前序就够了
 */
function preOrderDeserialize(data: string): TreeNode | null {
  const treeNodes = data.split(',')

  // 遍历数组，返回树结构
  const traverse = (treeNodes: string[]) => {
    if (treeNodes.length === 0) {
      return null
    }

    const first = treeNodes.shift()
    if (first === NULLTREENODE) {
      return null
    }
    const root = new TreeNode(Number(first))
    root.left = traverse(treeNodes)
    root.right = traverse(treeNodes)

    return root
  }
  return traverse(treeNodes)
}

/**
 * 后序遍历
 */
function postOrderSerialize(root: TreeNode | null): string {
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

function postOrderDeserialize(data: string): TreeNode | null {
  const treeNodes = data.split(',')

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
 * 中序遍历
 * 因为 root 的值被夹在两棵子树的中间，我们不知道确切的索引
 * 找不到 root 节点，就无法反序列化
 */

/**
 * 层序遍历
 * 标准的层序遍历，队列中是不会存在 null 指针的
 * 我们这里反序列化时，需要记录空指针，需要稍加修改
 */
function levelOrderSerialize(root: TreeNode | null): string {
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

function levelOrderDeserialize(data: string): TreeNode | null {
  const nodes = data.split(DIVIDER)
  if (nodes.length === 0) {
    return null
  }
  if(nodes[0] === NULLTREENODE) {
    return null
  }
  const root = new TreeNode(Number(nodes[0]))
  const queue: TreeNode[] = []
  queue.push(root)
  for (let i = 1; i < nodes.length;) {
    const parent = queue.shift()
    const left = nodes[i++]
    if (left !== NULLTREENODE) {
      parent.left = new TreeNode(Number(left))
      queue.push(parent.left)
    } else {
      parent.left = null
    }
    const right = nodes[i++]
    if (right !== NULLTREENODE) {
      parent.right = new TreeNode(Number(right))
      queue.push(parent.right)
    } else {
      parent.right = null
    }
  }
  return root
}

let node1 = new TreeNode(1)
node1.left = new TreeNode(2)
let node3 = new TreeNode(3)
node1.right = node3
node3.left = new TreeNode(4)
node3.right = new TreeNode(5)

console.log(levelOrderSerialize(null))
console.log(levelOrderDeserialize(levelOrderSerialize(null)))
