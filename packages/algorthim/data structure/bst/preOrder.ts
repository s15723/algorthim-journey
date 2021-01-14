import { TreeNode } from '../../leetcode/bst/helper'

const NULLTREENODE = '#'
const DIVIDER = ','
/**
 * 前序遍历
 */
/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
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
};

/*
 * Decodes your encoded data to tree.
 */

/**
 * 一般语境下，只是前序遍历是不能还原二叉树结构的，因为缺少空指针信息
 * 至少要前、中、后序中的两种才可以还原二叉树
 * 但本题中是包含空指针的，所以只要前序就够了
 */
function deserialize(data: string): TreeNode | null {
    const treeNodes = data.split(DIVIDER)

     // 遍历数组，返回树结构
    const traverse = (treeNodes: string[]) =>{
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
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */