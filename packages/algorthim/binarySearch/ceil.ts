const upper = (arr: number[], target: number) => {
  // [l...r] 求解
  let l = 0,
    r = arr.length
  while (l < r) {
    const mid = l + Math.floor((r - l) / 2)
    if (arr[mid] <= target) {
      l = mid + 1
    } else {
      r = mid
    }
  }
  // 当 l === r 时，必然能找到解
  return l
}
/**
 * ceil
 * 如果数组中存在元素，返回最大索引
 * 如果不存在元素，返回 upper
 *
 * > target,返回最小值索引
 * === target,返回最大索引
 */
export const upper_ceil = (arr: number[], target: number) => {
  const u = upper(arr, target)
  if (u - 1 >= 0 && arr[u - 1] === target) return u - 1

  return u
}

/**
 * lower_ceil
 * 如果数组中存在元素，返回最小索引
 * 如果不存在元素，返回 upper
 *
 * 返回 >= target 的最小索引
 */
export const lower_ceil = (arr: number[], target: number) => {
  // 求解 > target 的最小索引
  const u = upper(arr, target)
  if (u - 1 >= 0 && arr[u - 1] === target) {
    return upper(arr, target - 1)
  }
  return u
}
const arr = [1, 1, 3, 3, 5, 5, 7, 7]
console.log(upper_ceil (arr, 6))
console.log(lower_ceil(arr, 3))
