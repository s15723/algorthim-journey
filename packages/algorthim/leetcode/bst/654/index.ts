import {TreeNode} from '../helper'

/**
 * 前序遍历
 */
// function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
//     if (nums.length === 0) return null
//     // 找到最大值
//     let maxVal = -Infinity, index = -1
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] > maxVal) {
//             maxVal = nums[i]
//             index = i
//         }
//     }
//     const root = new TreeNode(maxVal)
//     root.left = constructMaximumBinaryTree(nums.slice(0, index))
//     root.right = constructMaximumBinaryTree(nums.slice(index+1, nums.length))

//     return root
// };

// 每次递归不用新建数组
function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
    const buildTree = (nums: number[], l: number, r: number): TreeNode => {
        if (l > r) {
            return null
        }
        let maxVal = -Infinity, index = -1
        for (let i = l; i <= r; i++) {
            if (nums[i] > maxVal) {
                maxVal = nums[i]
                index = i
            }
        }
        const root = new TreeNode(maxVal)
        root.left = buildTree(nums, l, index - 1)
        root.right = buildTree(nums, index + 1, r)

        return root
    }

    return buildTree(nums, 0, nums.length - 1)
}