import { useEffect, useState } from 'react'

import { useCustomContext } from '../../appContext'
import { calculateColumnPercents, generateRow } from '../../tools'

import { CellsListType, CellType } from '../../types'

import { icons } from '../../assets'
import { DeleteColumn } from '../DeleteColumn'
import { TableHeader } from '../TableHeader'
import './styles.scss'

export const Matrix = () => {
  const {
    rowCount: { rowCount },
    colCount: { colCount },
    cellsList: { cellsList, setCellsList },
    closestCount: { closestCount },
    displayMatrix: { displayMatrix },

    handleDeleteRow,
    handleUpdateCellsList,
  } = useCustomContext()

  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(
    new Set(),
  )
  const [selectedRow, setSelectedRow] = useState(-1)

  useEffect(() => {
    if (!rowCount || !colCount) {
      return
    }
    const generateMatrix = (): CellsListType => {
      const newMatrix: CellsListType = {}

      for (let i = 0; i < rowCount; i++) {
        newMatrix[i] = generateRow(i, colCount)
      }
      const percentsRow = calculateColumnPercents(newMatrix, colCount)

      return { ...newMatrix, [rowCount + 1]: percentsRow }
    }

    const matrix = generateMatrix()

    if (!displayMatrix) {
      setCellsList(matrix)
    }
  }, [rowCount, colCount, setCellsList, displayMatrix])

  const highlightClosestCells = (hovered: CellType) => {
    const allCells = Object.values(cellsList as CellsListType)
      .flat()
      .filter((item) => item.amount > 0)
    const differences = allCells.map((cell) => ({
      cell,
      difference: Math.abs(cell.amount - hovered.amount),
    }))

    differences.sort((a, b) => a.difference - b.difference)
    const closest = differences
      .filter(({ cell }) => cell.id !== hovered.id)
      .slice(0, closestCount)
      .map(({ cell }) => cell.id)
    setHighlightedCells(new Set(closest))
  }

  const handleMouseEnter = (cell: CellType, row: number) => {
    if (cell.amount > 0 && !cell.id.includes('amount')) {
      highlightClosestCells(cell)
    }
    if (cell.id.includes('amount')) {
      setSelectedRow(row)
    }
  }

  const handleMouseLeave = () => {
    setHighlightedCells(new Set())
    setSelectedRow(-1)
  }

  const isHighlighted = (id: string) => highlightedCells.has(id)

  return (
    displayMatrix &&
    cellsList &&
    !!Object.keys(cellsList).length && (
      <div className="matrix">
        <TableHeader />
        {Object.keys(cellsList).map((key) => (
          <div
            className={'matrix__grid'}
            style={{
              gridTemplateColumns: `repeat(${colCount + 3}, minmax(40px, 1fr))`,
            }}
            key={key}
          >
            <div className="matrix__cell">
              <p>
                {+key >= 0
                  ? +key < rowCount
                    ? `Cell values M=${+key + 1}`
                    : '50th percentile'
                  : ''}
              </p>
            </div>
            {cellsList[+key].map((item) => (
              <button
                onMouseOver={() => {
                  handleMouseEnter(item, +key)
                }}
                onMouseOut={handleMouseLeave}
                className={`matrix__cell ${item.amount > 0 && 'matrix__cell-hovered'} ${isHighlighted(item.id) && 'highlighted'}`}
                disabled={+key === rowCount + 1 || item.amount < 0}
                key={item.id}
                onClick={() => handleUpdateCellsList(+key, item.id)}
              >
                {item.amount > 0
                  ? +key === selectedRow
                    ? `${Math.round((item.amount / cellsList[+key][rowCount]?.amount) * 100)}%`
                    : item.amount
                  : ''}
              </button>
            ))}
            {+key < rowCount ? (
              <button
                className="button"
                key={+key + 1}
                onClick={() => {
                  handleDeleteRow(+key)
                }}
              >
                <img className="icon" alt={'delete'} src={icons.remove} />
              </button>
            ) : (
              <div className="matrix__cell" />
            )}
          </div>
        ))}

        <DeleteColumn />
      </div>
    )
  )
}
