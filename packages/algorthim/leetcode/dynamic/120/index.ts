/**
 * 记忆化搜索（当前写法也没问题，但可以考虑下不同的状态定义）
 * 需要重构需要重构需要重构需要重构需要重构需要重构，写的有问题
 */
function minimumTotal(triangle: number[][]): number {
  const memo: number[][] = []
  const n = triangle.length
  for (let i = 0; i < n; i++) {
    const curRow = []
    const curRowLen = triangle[i].length
    for (let j = 0; j < curRowLen; j++) {
      curRow.push(-1)
    }
    memo.push(curRow)
  }

  /**
   * 计算路径的最小值
   */
  const calcMinimum = (triangle: number[][], i: number, j: number) => {
    if (i === triangle.length) {
      return 0
    }

    if (memo[i][j] === -1) {
      memo[i][j] =
        Math.min(
          calcMinimum(triangle, i + 1, j),
          calcMinimum(triangle, i + 1, j + 1)
        ) + triangle[i][j]
    }

    return memo[i][j]
  }

  return calcMinimum(triangle, 0, 0)
}

/**
 * 动态规划
 */
function minimumTotalDynamic(triangle: number[][]): number {
  const n = triangle.length
  const memo: number[][] = []

  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < triangle[i].length; j++) {
      row.push(-1)
    }
    memo.push(row)
  }

  for (let i = 0; i < triangle[n - 1].length; i++) {
    memo[n - 1][i] = triangle[n - 1][i]
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      memo[i][j] = Math.min(memo[i + 1][j], memo[i + 1][j + 1]) + triangle[i][j]
    }
  }

  return memo[0][0]
}

console.log(minimumTotalDynamic([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]))
