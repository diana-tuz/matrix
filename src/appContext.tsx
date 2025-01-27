/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'
import { generateAmount } from './tools'
import { CellsListType } from './types'

type ContextType = {
  rowCount: {
    rowCount: number
    setRowCount: (n: number) => void
  }
  colCount: {
    colCount: number
    setColCount: (n: number) => void
  }
  cellsList: {
    cellsList: CellsListType | undefined
    setCellsList: (n: CellsListType) => void
  }
  handleUpdateCellsList: (row: number, itemId?: string) => void
}

const defaultValue: ContextType = {
  rowCount: {
    rowCount: 0,
    setRowCount: () => {},
  },
  colCount: {
    colCount: 0,
    setColCount: () => {},
  },
  cellsList: {
    cellsList: undefined,
    setCellsList: () => {},
  },
  handleUpdateCellsList: () => {},
}
const Context = createContext<ContextType>(defaultValue)

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [rowCount, setRowCount] = useState(0)
  const [colCount, setColCount] = useState(0)
  const [cellsList, setCellsList] = useState<CellsListType>()

  const handleUpdateCellsList = (row: number, itemId?: string) => {
    const list = cellsList as CellsListType
    const selectedRow = list[row]

    setCellsList((prev) => {
      if (!selectedRow) {
        return prev
      }

      const preparedRow = selectedRow.filter(
        ({ id }) => !id.includes('-amount'),
      )

      const updatedRow = !itemId
        ? preparedRow
        : preparedRow.map((cell) => {
            if (cell.id === itemId) {
              return { ...cell, amount: cell.amount + 1 }
            }
            return cell
          })

      const generatedAmount = generateAmount(updatedRow)

      return {
        ...prev,
        [row]: [
          ...updatedRow,
          { id: `${row}-amount`, amount: generatedAmount },
        ],
      }
    })
  }

  const value = {
    rowCount: {
      rowCount,
      setRowCount,
    },
    colCount: {
      colCount,
      setColCount,
    },
    cellsList: {
      cellsList,
      setCellsList,
    },
    handleUpdateCellsList,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

const useCustomContext = (): ContextType => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useCustomContext must be used within an ContextProvider')
  }
  return context
}

export { ContextProvider, useCustomContext }
