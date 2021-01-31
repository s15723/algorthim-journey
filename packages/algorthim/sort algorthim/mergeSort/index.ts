/**
 * 时间 O(nlogn)
 * 空间 O(n)
 */
import { testSort, generateRandomArray } from '../helper'
export function mergeSort(arr: number[]) {
  // 合并两个有序区间 arr[l...mid] 和 arr[mid+1...r]
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    tmp: number[]
  ) => {
    // 对应优化 3，去掉 merge 函数里的声明
    // const tmp: number[] = [] （去掉）
    // 这里不 tmp[i] = arr[i] 是因为当 l 过大时，会造成空间浪费
    // 虽然 tmp[i] = arr[i] 的话后面读取就可以直接 tmp[i]，不需要 tmp[i-l]
    for (let i = l; i <= r; i++) {
      tmp[i - l] = arr[i]
    }

    let i = l,
      j = mid + 1
    // 给 arr[k] 赋值
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = tmp[j - l]
        j++
      } else if (j > r) {
        arr[k] = tmp[i - l]
        i++
      } else if (tmp[i - l] < tmp[j - l]) {
        arr[k] = tmp[i - l]
        i++
      } else {
        arr[k] = tmp[j - l]
        j++
      }
    }
  }

  const _mergeSort = (arr: number[], l: number, r: number, tmp: number[]) => {
    if (l >= r) return
    // 优化 2 (不是那么必要)
    // 对于小规模数组, 使用插入排序，可能会进化成 O(n)
    // 而且对于小规模数据，插入排序前面的操作数(常数)要比归并排序小很多
    // if (r - l <= 15) {
    //   insertionSort(arr, l, r)
    //   return
    // }

    const mid = l + Math.floor((r - l) / 2)
    _mergeSort(arr, l, mid, tmp)
    _mergeSort(arr, mid + 1, r, tmp)
    // 优化 1
    // 当 arr[middle] <= arr[middle + 1] 时，前半数组有序，后半数组有序，整个数组完全有序
    // 没必要再进行归并
    // 经过此优化，对于完全有序的数组，O(n)
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, tmp)
    }
  }

  // 优化 3，最重要的优化
  // 之前在 merge 归并函数中，每次调用都会创建一个新的数组，调用次数多了也会造成性能损耗
  // 我们在最外层只创建一次数组
  const tmp: number[] = []
  _mergeSort(arr, 0, arr.length - 1, tmp)
}

const arr1 = generateRandomArray(1000000, 1, 100)
testSort('归并排序', mergeSort, arr1)
