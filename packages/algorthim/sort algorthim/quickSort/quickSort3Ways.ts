import { swap } from '../helper'
import { testSort, generateRandomArray } from '../helper'
/**
 * 三路快排
 * 相对双路快排，partition 遇到和 val 相等的元素不需要交换使他分布在两侧
 * 而是集中在中间，下次三路快排不对其进行处理
 * 
 * 注意
 * 当数组中所有元素都一样时，只是走一次 partition，所有元素都集中在中间，没有继续递归左右区间的过程了
 * 此时时间复杂度进化为 O(n)
 * 所以当数组中有大量重复元素时，三路快排性能很好
 */
export default function quickSort3Ways(arr: number[]) {
  const sort = (arr: number[], l: number, r: number) => {
    if (l >= r) return

    // 前序遍历
    const p = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, l, p)
    // [l+1...lt] < v, [lt+1...i), [gt...r] > v
    let lt = l,
      gt = r + 1,
      i = l + 1
    while (i < gt) {
      if (arr[i] < arr[l]) {
        lt++
        swap(arr, lt, i)
        i++
      } else if (arr[i] > arr[l]) {
        gt--
        swap(arr, i, gt)
      } else {
        i++
      }
    }

    swap(arr, l, lt)
    // 此时 [l...lt-1] < v, [lt...gt) === v, [gt...r] > v

    sort(arr, l, lt - 1)
    sort(arr, gt, r)
  }

  sort(arr, 0, arr.length - 1)
}

const arr = generateRandomArray(100000, 0, 1)
testSort('三路快排', quickSort3Ways, arr)
