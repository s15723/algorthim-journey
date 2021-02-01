/**
 * 计算逆序对个数
 * 归并过程必须是归并两个有序数组
 * 时间 O(nlogn)
 * 空间 O(n)
 */
export function reversePairs(nums: number[]): number {
  // 归并 [l...mid](有序) 和 [mid+1...r](有序)，并计算归并过程中的逆序对个数
  const merge = (
    nums: number[],
    l: number,
    mid: number,
    r: number,
    tmp: number[]
  ): number => {
    // 后面区间的元素归并上来的时候，和前面区间剩余的元素形成逆序对
    let res = 0
    for (let i = l; i <= r; i++) {
      tmp[i - l] = nums[i]
    }

    let i = l,
      j = mid + 1
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        nums[k] = tmp[j - l]
        j++
      } else if (j > r) {
        nums[k] = tmp[i - l]
        i++
      } else if (tmp[i - l] <= tmp[j - l]) {
        nums[k] = tmp[i - l]
        i++
      } else {
        res += mid - i + 1
        nums[k] = tmp[j - l]
        j++
      }
    }

    return res
  }

  // 对 [l...r] 进行排序，并计算逆序对个数
  const solve = (
    nums: number[],
    l: number,
    r: number,
    tmp: number[]
  ): number => {
    if (l >= r) return 0

    let res = 0
    const mid = l + Math.floor((r - l) / 2)

    res += solve(nums, l, mid, tmp)
    res += solve(nums, mid + 1, r, tmp)

    if (nums[mid] > nums[mid + 1]) {
      res += merge(nums, l, mid, r, tmp)
    }

    return res
  }

  const tmp: number[] = []
  return solve(nums, 0, nums.length - 1, tmp)
}

var arr = [1, 3, 2, 3, 1]
console.log(reversePairs(arr))
console.log(arr)
