/**
 * 插入排序
 * 空间 O(1)
 * 时间(最坏的情况) 整体复杂度还是 O(n^2),对于有序数组 O(n)
 */
import {testSort, generateRandomArray} from '../helper'
export function insertionSort(arr: number[]) {
  const n = arr.length

  // [0...i）有序，[i...n）无序
  for (let i = 0; i < n; i++) {
    const e = arr[i]
    // 将 arr[i] 插入合适的位置，维持循环不变量
    let j: number
    for (j = i; j - 1 >= 0 && e < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
}

const arr1 = generateRandomArray(100, 1, 100)
testSort('插入排序1', insertionSort, arr1)

export function insertionSortReverseOrder(arr: number[]) {
  const n = arr.length

  // [0...i] 无序, (i...n-1] 有序
  for (let i = n - 1; i >= 0; i--) {
    const e = arr[i]
    // 将 arr[i] 插入合适的位置，维持循环不变量
    let j: number
    for (j = i; j < n - 1 && e > arr[j + 1]; j++) {
      arr[j] = arr[j+1]
    }
    arr[j] = e
  }
}

const arr2 = generateRandomArray(100, 1, 100)
testSort('插入排序2', insertionSortReverseOrder, arr2)
