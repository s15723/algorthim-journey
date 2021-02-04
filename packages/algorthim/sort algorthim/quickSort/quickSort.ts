import { swap } from '../helper'
import { testSort, generateRandomArray, generateOrderedArray } from '../helper'
/**
 * 二叉树的前序遍历
 * 时间 O(nlogn)
 * 空间 O(1)
 *
 * 问题：当数组元素都相同时(有大量重复元素)，元素会堆积到一侧，破坏二叉树的平衡性，时间复杂度退化成 O(n^2)
 */
export function quickSort(arr: number[]) {
  const partition = (arr: number[], l: number, r: number): number => {
    // [l...r] 之间的随机索引
    const p = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, l, p)

    const target = arr[l]

    // arr[l+1...j] < target,arr[j+1...i) > target
    let j = l
    for (let i = l + 1; i <= r; i++) {
      if (arr[i] <= target) {
        j++
        swap(arr, i, j)
      }
    }

    // 此时 arr[l...j-1] < target, arr[j] === target, arr[j+1...r] > target
    swap(arr, l, j)

    return j
  }

  const _quickSort = (arr: number[], l: number, r: number) => {
    if (l >= r) return

    const p = partition(arr, l, r)
    _quickSort(arr, l, p - 1)
    _quickSort(arr, p + 1, r)
  }

  _quickSort(arr, 0, arr.length - 1)
}

const arr1 = generateRandomArray(100000, 1, 100)
testSort('快速排序第一版无序数组', quickSort, arr1)

const arr2 = generateOrderedArray(100000)
testSort('快速排序第一版有序数组', quickSort, arr2)
