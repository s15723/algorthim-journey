/**
 * 查找 < target 的最大值
 */
export default function lower(arr: number[], target: number) {
  // [l...r] 求解
  let l = -1,
    r = arr.length - 1
  while (l < r) {
    const mid = l + Math.floor((r - l + 1) / 2)
    if (arr[mid] >= target) {
      r = mid - 1
    } else {
      l = mid
    }
  }
  return l
}

const arr = [1, 1, 3, 3, 5, 5]
console.log(lower(arr, 4))
