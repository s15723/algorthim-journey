import {TreeNode} from '../helper'

/**
 * 前序、后序都可以
 */
function invertTree(root: TreeNode): TreeNode {
    if (root === null) return null

    const tmp = root.left
    root.left = root.right
    root.right = tmp

    invertTree(root.left)
    invertTree(root.right)

    return root
};