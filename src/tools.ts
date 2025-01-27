import { v4 as uuidv4 } from 'uuid'
import { CellType } from './types'

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
