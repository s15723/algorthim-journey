/**
 * 选择排序
 * 时间 O(n^2)
 * 空间 O(1)
 */
import { swap } from '../helper'
export function selectionSort(arr: number[]) {
  const n = arr.length

  // [0...i) 有序，[i...n) 无序
  for (let i = 0; i < n; i++) {
    // 找到 [i...n) 中的最小值，维持循环不变量
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    swap(arr, minIndex, i)
  }
}

const arr = [1, 3, 2, 6, 4]
selectionSort(arr)
console.log(arr)

export function selectionSortReverseOrder(arr: number[]) {
  const n = arr.length

  // [0...i] 无序，(i...n) 有序
  for (let i = n - 1; i >= 0; i--) {
    let maxIndex = i
    // 找到 [0...i）中的最大值
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    swap(arr, maxIndex, i)
  }
}

const arr2 = [1, 3, 2, 6, 4]
selectionSortReverseOrder(arr2)
console.log(arr2)
