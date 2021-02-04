import { swap } from '../helper'
import { testSort, generateRandomArray } from '../helper'
/**
 * 双路快排
 * 时间 O(nlogn)
 * 空间 O(1)
 *
 * 主要解决的问题是，处理有大量重复元素的数组
 * 使重复元素平均分布在数组两边(以 val 为分界点)
 */
export default function quickSort2Ways(arr: number[]) {
  // arr[l+1...i) <= v, arr(j...r] >= v
  const partition = (arr: number[], l: number, r: number): number => {
    const p = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, l, p)

    let i = l + 1,
      j = r
    while (true) {
      // 关于临界条件的详细解读
      // 进入循环时 l === r
      // 如果 arr[i] < arr[l] 或者 arr[j] > arr[l] 成立的话，i++ / j-- 都会导致 i >= j,退出循环
      // 如果都不成立，对应 i === j 的情况，arr[i] >= arr[l],arr[j] <= arr[l] 同时成立，即当前元素等于 arr[l]，无需处理 
      while (i <= j && arr[i] < arr[l]) i++
      while (i <= j && arr[j] > arr[l]) j--

      // i 停止的条件为 arr[i] >= arr[l],j 停止的条件为 arr[j] <= arr[l]
      // 那么停止时 i === j 时，该元素等于 arr[l]，无需处理
      if (i >= j) break

      // 当前的 i 需要经过 swap 处理才会融入到应该在的一侧
      // 如果在上面 break 了，当前的 i 就不会被处理，就位于第一个 >= val 的地方
      // j 同理
      swap(arr, i, j)
      i++
      j--
    }

    // 由上面的循环不变量可知，i 停留在第一个 >= val 的地方，j 停留在最后一个 <= val 的地方
    // 所以将 arr[l] 和 arr[j] 交换位置
    swap(arr, l, j)
    return j
  }

  const sort = (arr: number[], l: number, r: number) => {
    if (l >= r) return

    const p = partition(arr, l, r)
    sort(arr, l, p - 1)
    sort(arr, p + 1, r)
  }

  sort(arr, 0, arr.length - 1)
}

const arr = generateRandomArray(100000, 0, 1)
testSort('双路快排', quickSort2Ways, arr)
