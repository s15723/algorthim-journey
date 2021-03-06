import { TreeNode } from '../helper'

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  /**
   * 若前序遍历数组为 preorder[preStart,preEnd]
   * 中序遍历数组为 inorder[inStart,inEnd]
   * 构造二叉树，并返回该二叉树根节点
   */
  const build = (
    preorder: number[],
    preStart: number,
    preEnd: number,
    inorder: number[],
    inStart: number,
    inEnd: number
  ): TreeNode | null => {
    if (preStart > preEnd) {
        return null
    }

    const rootVal = preorder[preStart]

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
      preorder,
      preStart + 1,
      preStart + leftSize,
      inorder,
      inStart,
      index - 1
    )
    root.right = build(
      preorder,
      preStart + leftSize + 1,
      preEnd,
      inorder,
      index + 1,
      inEnd
    )

    return root
  }

  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1)
}
