import { useCallback, useEffect, useState } from 'react'
import './App.scss'
import { useCustomContext } from './appContext'
import { generateRow } from './tools'
import { CellsListType } from './types'

function App() {
  const {
    rowCount: { rowCount, setRowCount },
    colCount: { colCount, setColCount },
    cellsList: { cellsList, setCellsList },
    handleUpdateCellsList,
  } = useCustomContext()

  const [displayMatrix, setDisplayMatrix] = useState(false)

  const handleChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayMatrix(false)
    setRowCount(Number(e.target.value))
  }

  const handleChangeCol = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayMatrix(false)
    setColCount(Number(e.target.value))
  }

  const handleDisplayMatrix = () => {
    setDisplayMatrix(!displayMatrix)
  }

  const generateMatrix = useCallback((): CellsListType => {
    const newMatrix: CellsListType = {}

    for (let i = 0; i < rowCount; i++) {
      newMatrix[i] = generateRow(i, colCount)
    }

    return newMatrix
  }, [colCount, rowCount])

  useEffect(() => {
    if (!rowCount || !colCount) {
      return
    }
    const matrix = generateMatrix()
    setCellsList(matrix)
  }, [rowCount, colCount, generateMatrix, setCellsList])

  return (
    <>
      <section>
        <label>row</label>
        <input type="number" value={rowCount} onChange={handleChangeRow} />
        <label>column</label>
        <input type="number" value={colCount} onChange={handleChangeCol} />
        <button disabled={!rowCount || !colCount} onClick={handleDisplayMatrix}>
          generate matrix
        </button>
      </section>
      {displayMatrix && cellsList && !!Object.keys(cellsList).length && (
        <section>
          <h2>matrix</h2>
          <p>row: {rowCount}</p>
          <p>col: {colCount}</p>
          <div className="col">
            {Object.keys(cellsList).map((key) => (
              <div className={'flex'} key={key}>
                {cellsList[+key].map(({ id, amount }) => (
                  <button
                    key={id}
                    onClick={() => handleUpdateCellsList(+key, id)}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default App
