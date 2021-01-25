/**
 * 记忆化搜索
 */
function minPathSum(grid: number[][]): number {
  const n = grid.length
  /**
   * 计算路径最小值
   */
  const calcSum = (grid: number[][], i: number, j: number) => {
    if (i === n - 1 && j === grid[n - 1].length - 1) {
      return grid[i][j]
    }
    // i = n-1, j = grid[n-1].length - 1
    return (
      Math.min(calcSum(grid, i + 1, j), calcSum(grid, i, j + 1)) + grid[i][j]
    )
  }

  return calcSum(grid, 0, 0)
}

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]))

/**
 * 动态规划
 */
// function minPathSumDynamic(grid: number[][]): number {}
