/**
 * 剑指offer 40
 * https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
 * 时间 O(n)
 */
// 三路快排解法
export function getLeastNumbers(arr: number[], k: number): number[] {
  function swap<T>(arr: T[], i: number, j: number) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  const sort = (arr: number[], l: number, r: number, k: number) => {
    const p = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, l, p)

    // [l+1...lt] < v, [lt+1...i) === v, [gt...r] > v
    let lt = l,
      gt = r + 1,
      i = l + 1
    while (i < gt) {
      if (arr[i] === arr[l]) {
        i++
      } else if (arr[i] > arr[l]) {
        gt--
        swap(arr, i, gt)
      } else {
        lt++
        swap(arr, i, lt)
        i++
      }
    }

    swap(arr, l, lt)
    // [l...lt-1] < v, [lt...gt-1] === v, [gt...r] > v

    if (k < lt) {
      sort(arr, l, lt - 1, k)
    } else if (k > lt) {
      sort(arr, gt, r, k)
    }
  }

  sort(arr, 0, arr.length - 1, k - 1)

  return arr.slice(0, k)
}

function getLeastNumbers2Ways(arr: number[], k: number): number[] {
  if (k === 0) return []
  function swap<T>(arr: T[], i: number, j: number) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
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

  const sort = (arr: number[], l: number, r: number, k: number) => {
    const p = partition(arr, l, r, k)
    if (p === k) return arr.slice(0, k + 1)
    if (k < p) {
      return sort(arr, l, p - 1, k)
    } else {
      return sort(arr, p + 1, r, k)
    }
  }

  const sortNR = (arr: number[], l: number, r: number, k: number) => {
    // arr[l...r] 寻找 k
    while (l <= r) {
      const p = partition(arr, l, r, k)
      if (p === k) {
        // return arr.slice(0, k + 1)
        return
      }
      if (k > p) {
        l = p + 1
      } else {
        r = p - 1
      }
    }
  }

  sortNR(arr, 0, arr.length - 1, k - 1)

  return arr.slice(0, k)
}

const arr = [0, 0, 0, 2, 0, 5]
console.log(getLeastNumbers2Ways(arr, 0))
