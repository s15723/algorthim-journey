/**
 * 记忆化搜索
 */
function integerBreak(n: number): number {
  const max3 = (a: number, b: number, c: number) => Math.max(a, Math.max(b, c))
  // memo[i]: i拆分后所能求得的乘积的最大值
  const memo: number[] = Array(n + 1).fill(-1)

  // 计算 n 拆分(至少拆分成两个数)后，乘积的最大值
  const calcMax = (n: number): number => {
    if (n === 1) {
      return 1
    }

    if (memo[n] === -1) {
      for (let i = 1; i < n; i++) {
        memo[n] = max3(memo[n], i * calcMax(n - i), i * (n - i))
      }
    }

    return memo[n]
  }

  return calcMax(n)
}

/**
 * 动态规划
 */
function integerBreakDynamic(n: number): number {
  const max3 = (a: number, b: number, c: number) => Math.max(a, Math.max(b, c))
  // memo[i]: i拆分后所能求得的乘积的最大值
  const memo: number[] = Array(n + 1).fill(-1)

  memo[1] = 1

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      memo[i] = max3(memo[i], j * (i - j), j * memo[i - j])
    }
  }

  return memo[n]
}
