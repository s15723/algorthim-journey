/**
 * 找到 > target 的最小值
 */
export default function upper(arr: number[], target: number): number {
  let l = 0,
    r = arr.length
  // 在 [l..r] 求解
  while (l < r) {
    const mid = l + Math.floor((r - l) / 2)
    if (arr[mid] <= target) {
      l = mid + 1
    } else {
      r = mid
    }
  }

  return l
}

const arr = [1, 3, 5, 7, 9]
console.log(upper(arr, 10))
