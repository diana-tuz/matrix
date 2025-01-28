import { useCallback, useEffect, useState } from 'react'

import { useCustomContext } from '../../appContext'
import { calculateColumnPercents, generateRow } from '../../tools'

import { CellsListType, CellType } from '../../types'

import './styles.scss'

export const Matrix = () => {
  const {
    rowCount: { rowCount },
    colCount: { colCount },
    cellsList: { cellsList, setCellsList },
    closestCount: { closestCount },
    displayMatrix: { displayMatrix },
    handleUpdateCellsList,
  } = useCustomContext()

  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(
    new Set(),
  )

  const generateMatrix = useCallback((): CellsListType => {
    const newMatrix: CellsListType = {}

    for (let i = 0; i < rowCount; i++) {
      newMatrix[i] = generateRow(i, colCount)
    }
    const percentsRow = calculateColumnPercents(newMatrix, colCount)

    return { ...newMatrix, [rowCount + 1]: percentsRow }
  }, [colCount, rowCount])

  useEffect(() => {
    if (!rowCount || !colCount) {
      return
    }
    const matrix = generateMatrix()
    setCellsList(matrix)
  }, [rowCount, colCount, generateMatrix, setCellsList])

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

  const handleMouseEnter = (cell: CellType) => {
    if (cell.amount > 0) {
      highlightClosestCells(cell)
    }
  }

  const handleMouseLeave = () => {
    setHighlightedCells(new Set())
  }

  const isHighlighted = (id: string) => highlightedCells.has(id)
  const tableHeader = Array(colCount + 2).fill('')
  return (
    displayMatrix &&
    cellsList &&
    !!Object.keys(cellsList).length && (
      <div className="matrix">
        <div
          className={'matrix__grid'}
          style={{
            gridTemplateColumns: `repeat(${colCount + 2}, minmax(60px, 1fr))`,
          }}
        >
          {tableHeader.map((_, index) => (
            <div className="matrix__cell ">
              <p>
                {index > 0
                  ? index < colCount + 1
                    ? `Cell values N=${index}`
                    : 'Sum values'
                  : ''}
              </p>
            </div>
          ))}
        </div>
        {Object.keys(cellsList).map((key) => (
          <div
            className={'matrix__grid'}
            style={{
              gridTemplateColumns: `repeat(${colCount + 2}, minmax(40px, 1fr))`,
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
                  handleMouseEnter(item)
                }}
                onMouseOut={handleMouseLeave}
                className={`matrix__cell ${item.amount > 0 && 'matrix__cell-hovered'} ${isHighlighted(item.id) && 'highlighted'}`}
                disabled={+key === rowCount + 1 || item.amount < 0}
                key={item.id}
                onClick={() => handleUpdateCellsList(+key, item.id)}
              >
                {item.amount > 0 ? item.amount : ''}
              </button>
            ))}
          </div>
        ))}
      </div>
    )
  )
}
