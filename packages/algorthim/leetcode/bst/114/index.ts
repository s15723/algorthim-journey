import {TreeNode} from '../helper'

/**
 * 后序遍历
 * 定义: 展开以 root 为头节点的二叉树
 */
function flatten(root: TreeNode | null): void {
    if (root === null) return

    flatten(root.left)
    flatten(root.right)

    const left = root.left
    const right = root.right
    root.left = null
    root.right = left

    let cur = root
    // 关于这个循环终止条件的思考
    // 为什么不是 while(cur !== null)
    // 我们要找到最后一个节点，并往 cur.right 上挂载剩余的节点
    // 如果是 while(cur !== null)，终止循环时 cur 为 null
    // 另一种写法
    // let prev: TreeNode
    // while(cur !== null) {
    //     prev = cur
    //     cur = cur.right
    // }
    // prev.right = right

    
    while(cur.right !== null) {
        cur = cur.right
    }
    cur.right = right
};