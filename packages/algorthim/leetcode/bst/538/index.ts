import {TreeNode} from '../helper'

/**
 * 中序遍历，先左后右为升序，先右后左为降序
 * 这道题的基本情况其实是从最右边开始的，8 = 0 + 8，7 = 8 + 7,6 = 8 + 7 + 6
 * 所以我们需要从最右边开始计算，就用到了中序遍历，先右后左的方法
 */
function convertBST(root: TreeNode | null): TreeNode | null {
    let sum = 0

    const traverse = (root: TreeNode | null) => {
        if (root === null) {
            return
        }

        traverse(root.right)
        sum += root.val
        root.val = sum
        traverse(root.left)
    }

    traverse(root)
    return root
};
