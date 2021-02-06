import lower from './lower'

/**
 * lower_floor
 * 存在元素，返回最小索引
 * 不存在，返回返回 lower
 */
export const lower_floor = (arr: number[], target: number) => {
  // 求解 < target 的最大索引
  const l = lower(arr, target)
  if (l + 1 < arr.length && arr[l + 1] === target) {
    return l + 1
  }
  return l
}

/**
 * upper_floor
 * 存在元素，返回最大索引
 * 不存在，返回 lower
 */
export const upper_floor = (arr: number[], target: number) => {
  // 求解 < target 的最大索引
  const l = lower(arr, target)
  if (l + 1 < arr.length && arr[l + 1] === target) {
    return lower(arr, target + 1)
  }
  return l
}

const arr = [1, 1, 3, 3, 5, 5]
console.log('upper_floor', upper_floor(arr, 1))
