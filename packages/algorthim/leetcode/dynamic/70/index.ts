/**
 * 记忆化搜索
 */
function climbStairs(n: number): number {
  const memo: number[] = Array(n + 1).fill(-1)

  const calcWays = (n: number): number => {
    if (n === 0 || n === 1) {
      return 1
    }

    if (memo[n] === -1) {
      memo[n] = calcWays(n - 1) + calcWays(n - 2)
    }

    return memo[n]
  }

  return calcWays(n)
}

/**
 * 动态规划
 */
function climbStairs2(n: number): number {
  const memo: number[] = Array(n + 1).fill(-1)

  memo[0] = memo[1] = 1

  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2]
  }

  return memo[n]
}
