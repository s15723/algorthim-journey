/**
 * 自底向上的归并排序
 * 时间 O(nlogn)
 * 空间 O(n)
 */
import { testSort, generateRandomArray } from '../helper'
import { insertionSort2 } from '../insertionSort'
export function mergeSortBU(arr: number[]) {
  const n = arr.length

  const _merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    tmp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      tmp[i - l] = arr[i]
    }

    let i = l,
      j = mid + 1
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = tmp[j - l]
      } else if (j > r) {
        arr[k] = tmp[i - l]
      } else if (tmp[i - l] <= tmp[j - l]) {
        arr[k] = tmp[i - l]
      } else {
        arr[k] = tmp[j - l]
      }
    }
  }

  const tmp: number[] = []
  // 对于小规模数组，使用插入排序 [i...i+15]
  // for (let i = 0; i < n; i += 16) {
  //   insertionSort2(arr, i, Math.min(i + 15, n - 1))
  // }
  // size 是指接下来合并的区间长度
  // for (let size = 16; size < n; size += size) {
  //   // ... merge
  // }
  // O(logn)
  // 遍历合并的区间长度
  for (let size = 1; size < n; size += size) {
    // 0(n)
    // 遍历合并的两个区间的起始位置
    // 合并 [i, i + size - 1](有序) 和 [i + size, Math.min(i + 2 * size - 1, n - 1)](有序)
    // i + size < n 意思是第二个区间也存在，需要 merge
    for (let i = 0; i + size < n; i += 2 * size) {
      if (arr[i + size - 1] > arr[i + size]) {
        _merge(arr, i, i + size - 1, Math.min(i + 2 * size - 1, n - 1), tmp)
      }
    }
  }
}

const arr1 = generateRandomArray(1000000, 1, 100)
testSort('归并排序', mergeSortBU, arr1)
