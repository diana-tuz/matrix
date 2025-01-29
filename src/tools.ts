import { v4 as uuidv4 } from 'uuid'
import { CellsListType, CellType } from './types'

export const generateRandomNumber = () => {
  const randomNumber = Math.round(Math.random() * 900 + 100)
  return randomNumber
}

export const generateCell = (): CellType => {
  const cell = {
    id: uuidv4(),
    amount: generateRandomNumber(),
  }
  return cell
}
export const generateAmount = (list: CellType[]) =>
  list.reduce((total, item) => total + item.amount, 0)

export const generateRow = (index: number, cellCount: number): CellType[] => {
  const sellRowArr = []

  for (let i = 0; i < cellCount; i++) {
    sellRowArr.push(generateCell())
  }

  const rowList = [
    ...sellRowArr,
    { id: `${index}-amount`, amount: generateAmount(sellRowArr) },
  ]

  return rowList
}
export const calculateColumnPercents = (
  list: CellsListType,
  columnCount: number,
) => {
  const percentsResult = [] as CellType[]

  for (let x = 0; x <= columnCount; x++) {
    let columnSum = 0

    Object.keys(list).forEach((rowKey) => {
      const cell = list[+rowKey][x]
      if (cell) {
        columnSum += cell.amount
      }
    })
    percentsResult.push(
      x === columnCount
        ? {
            id: `${x}-percents`,
            amount: -1,
          }
        : {
            id: `${x}-percents`,
            amount: +(columnSum * 0.5).toFixed(1),
          },
    )
  }
  return percentsResult
}
