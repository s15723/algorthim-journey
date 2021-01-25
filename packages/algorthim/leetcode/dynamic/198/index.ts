function rob(nums: number[]): number {
  const n = nums.length
  // memo[i] 表示抢劫 [i...nums.size()) 所能获得的最大收益
  const memo = Array(n).fill(-1)

  // 考虑抢劫 [index...nums.size()) 这个范围所有的房子能得到的最大收益
  // 状态定义
  const tryRob = (nums: number[], index: number) => {
    if (index >= n) {
      return 0
    }

    if (memo[index] === -1) {
      let res = 0
      for (let i = index; i < n; i++) {
        // 状态转移
        res = Math.max(res, nums[i] + tryRob(nums, i + 2))
      }
      memo[index] = res
    }

    return memo[index]
  }

  return tryRob(nums, 0)
}

function robDynamic(nums: number[]): number {
  const n = nums.length
  if (n === 0) {
      return 0
  }
  // memo[i] 表示抢劫 [i...n - 1] 所能获得的最大收益
  const memo = Array(n).fill(-1)
  memo[n - 1] = nums[n - 1]

  for (let i = n - 2; i >= 0; i--) {
      for (let j = i; j < n; j++) {
          memo[i] = Math.max(memo[i], nums[j] + (j < n-2 ? memo[j + 2] : 0))
      }
  }

  return memo[0]
}
