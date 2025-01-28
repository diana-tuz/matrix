/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'
import {
  calculateColumnPercents,
  generateAmount,
  generateCell,
  generateRow,
} from './tools'
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
  closestCount: {
    closestCount: number
    setClosestCount: (n: number) => void
  }
  cellsList: {
    cellsList: CellsListType | undefined
    setCellsList: (n: CellsListType) => void
  }
  displayMatrix: {
    displayMatrix: boolean
    toggleDisplayMatrix: (display?: boolean) => void
  }
  addNewRow: () => void
  addNewCol: () => void
  handleDeleteCol: (col: number) => void
  handleDeleteRow: (row: number) => void
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
  closestCount: {
    closestCount: 0,
    setClosestCount: () => {},
  },
  cellsList: {
    cellsList: undefined,
    setCellsList: () => {},
  },
  displayMatrix: {
    displayMatrix: false,
    toggleDisplayMatrix: () => {},
  },
  addNewRow: () => {},
  addNewCol: () => {},
  handleDeleteCol: () => {},
  handleDeleteRow: () => {},
  handleUpdateCellsList: () => {},
}
const Context = createContext<ContextType>(defaultValue)

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cellsList, setCellsList] = useState<CellsListType>()
  const [closestCount, setClosestCount] = useState(1)
  const [colCount, setColCount] = useState(0)
  const [displayMatrix, setDisplayMatrix] = useState(false)
  const [rowCount, setRowCount] = useState(0)

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

      const preparedList = {
        ...prev,
        [row]: [...updatedRow],
        [rowCount + 1]: [],
      }

      const percentsRow = calculateColumnPercents(preparedList, colCount)

      return {
        ...prev,
        [row]: [
          ...updatedRow,
          { id: `${row}-amount`, amount: generatedAmount },
        ],
        [rowCount + 1]: percentsRow,
      }
    })
  }
  const toggleDisplayMatrix = (display?: boolean) => {
    setDisplayMatrix(display !== undefined ? display : !displayMatrix)
  }
  const handleDeleteRow = (row: number) => {
    setCellsList((prev) => {
      const updatedList = { ...prev }
      delete updatedList[row]
      return updatedList
    })
  }

  const handleDeleteCol = (col: number) => {
    setCellsList((prev) => {
      if (!prev) {
        return prev
      }
      const updatedList = Object.keys(prev).reduce((acc, rowKey) => {
        const row = prev[+rowKey]
        if (!row || row.length === 0) return acc
        const updatedRow = row.filter((_, index) => index !== col)
        acc[+rowKey] = updatedRow
        return acc
      }, {} as CellsListType)

      return updatedList
    })
  }
  const addNewCol = () => {
    setCellsList((prev) => {
      if (!prev) {
        return prev
      }
      const updatedList = Object.keys(prev).reduce((acc, row) => {
        return { ...acc, [row]: [...prev[+row], generateCell()] }
      }, {} as CellsListType)

      return updatedList
    })
  }

  const addNewRow = () => {
    setCellsList((prev) => {
      if (!prev) {
        return prev
      }
      const updatedList = {
        ...prev,
        [rowCount + 1]: generateRow(rowCount + 1, colCount),
      }

      return updatedList
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
    closestCount: {
      closestCount,
      setClosestCount,
    },
    cellsList: {
      cellsList,
      setCellsList,
    },
    displayMatrix: { displayMatrix, toggleDisplayMatrix },
    addNewCol,
    addNewRow,
    handleDeleteCol,
    handleDeleteRow,
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
