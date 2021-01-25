import { TreeNode } from '../helper'

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  /**
   * 若前序遍历数组为 inorder[inStart,inEnd]
   * 中序遍历数组为 postorder[postStart,postEnd]
   * 构造二叉树，并返回该二叉树根节点
   */
  const build = (
    inorder: number[],
    inStart: number,
    inEnd: number,
    postorder: number[],
    postStart: number,
    postEnd: number
  ): TreeNode | null => {
    if (inStart > inEnd) {
        return null
    }

    const rootVal = postorder[postEnd]

    let index = 0
    for (let i = inStart; i <= inEnd; i++) {
      if (inorder[i] === rootVal) {
        index = i
        break
      }
    }

    const leftSize = index - inStart

    const root = new TreeNode(rootVal)
    root.left = build(
      inorder,
      inStart,
      index - 1,
      postorder,
      postStart,
      postStart + leftSize - 1
    )
    root.right = build(
      inorder,
      index + 1,
      inEnd,
      postorder,
      postStart + leftSize,
      postEnd - 1
    )

    return root
  }

  return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1)
}
