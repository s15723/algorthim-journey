/**
 * select k
 * 快速排序解法
 *
 * 时间 O(n) 永远只需要走一边，类似于二叉树的遍历，n + n/2 + n/4 + ... + 1
 * 空间 O(1)
 */
export function findKthLargest(nums: number[], k: number): number {
  function swap<T>(arr: T[], i: number, j: number) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  const sort = (nums: number[], l: number, r: number, k: number) => {
    // 随机化
    const p = l + Math.floor(Math.random() * (r - l + 1))
    swap(nums, l, p)

    // 循环不变量
    // [l+1...lt] < v, [lt+1...i) === v, [gt...r] > v
    let lt = l,
      gt = r + 1,
      i = l + 1
    while (i < gt) {
      if (nums[i] < nums[l]) {
        lt++
        swap(nums, i, lt)
        i++
      } else if (nums[i] > nums[l]) {
        gt--
        swap(nums, i, gt)
      } else {
        i++
      }
    }

    // [l...lt-1] < v, [lt...gt-1] === v, [gt...r] > v
    swap(nums, l, lt)

    if (k < lt) {
      return sort(nums, l, lt - 1, k)
    } else if (k > gt - 1) {
      return sort(nums, gt, r, k)
    } else {
      return nums[k]
    }
  }

  const partition = (arr: number[], l: number, r: number, k: number) => {
    const p = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, l, p)

    // [l+1...i) <= v, (j...r] >= v
    let i = l + 1,
      j = r
    while (true) {
      while (i <= j && arr[i] < arr[l]) i++
      while (i <= j && arr[j] > arr[l]) j--

      if (i >= j) break

      swap(arr, i, j)
      i++
      j--
    }

    // 跳出循环时，j 停在最后一个 <=v 的位置，i 停在第一个 >=v 的位置
    swap(arr, l, j)

    return j
  }

  const sortNR2Ways = (nums: number[], l: number, r: number, k: number) => {
    while (l <= r) {
      const p = partition(nums, l, r, k)
      if (k === p) {
        return nums[k]
      } else if (k > p) {
        l = p + 1
      } else {
        r = p - 1
      }
    }
  }

  const sortNR3Ways = (nums: number[], l: number, r: number, k: number) => {
    while (l <= r) {
      // 随机化
      const p = l + Math.floor(Math.random() * (r - l + 1))
      swap(nums, l, p)
      // 循环不变量
      // [l+1...lt] < v, [lt+1...i) === v, [gt...r] > v
      let lt = l,
        gt = r + 1,
        i = l + 1
      while (i < gt) {
        if (nums[i] < nums[l]) {
          lt++
          swap(nums, i, lt)
          i++
        } else if (nums[i] > nums[l]) {
          gt--
          swap(nums, i, gt)
        } else {
          i++
        }
      }

      // [l...lt-1] < v, [lt...gt-1] === v, [gt...r] > v
      swap(nums, l, lt)

      if (k < lt) {
        r = lt - 1
      } else if (k > gt - 1) {
        l = gt
      } else {
        return nums[k]
      }
    }
  }

  const n = nums.length
  // 找到 k 后排序停止，此时 k 已经在正确的位置
  return sortNR3Ways(nums, 0, n - 1, n - k)
}
const arr = [3, 2, 1, 5, 6, 4]
console.log(findKthLargest(arr, 1))
