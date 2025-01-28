import { useCustomContext } from '../../appContext'
import { InputItem } from '../InputItem'

import './styles.scss'
export const InputsBlock = () => {
  const {
    rowCount: { rowCount, setRowCount },
    colCount: { colCount, setColCount },
    cellsList: { cellsList },
    closestCount: { closestCount, setClosestCount },
    displayMatrix: { displayMatrix, toggleDisplayMatrix },
    addNewCol,
    addNewRow,
    handleDeleteRow,
    handleDeleteCol,
  } = useCustomContext()

  const handleChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowCount(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
    if (displayMatrix) {
      if (Number(e.target.value) > rowCount) {
        addNewRow()
      } else if (Number(e.target.value) < rowCount) {
        handleDeleteRow(rowCount)
      }
    }
  }

  const handleChangeCol = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColCount(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
    if (displayMatrix) {
      if (Number(e.target.value) > colCount) {
        addNewCol()
      } else if (Number(e.target.value) < colCount) {
        handleDeleteCol(colCount)
      }
    }
  }
  const handleChangeClosest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClosestCount(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
  }
  const inputs = [
    {
      onChange: handleChangeRow,
      value: rowCount,
      label: 'row',
    },
    {
      onChange: handleChangeCol,
      value: colCount,
      label: 'col',
    },
    {
      onChange: handleChangeClosest,
      value: closestCount,
      label: 'highlight closest',
    },
  ]
  return (
    <div className="inputs-block">
      {inputs.map((item) => (
        <InputItem key={item.label} {...item} />
      ))}
      <button
        className="inputs-block__display"
        disabled={!rowCount || !colCount}
        onClick={() => toggleDisplayMatrix()}
      >
        {!cellsList || (!rowCount && !colCount)
          ? 'generate matrix'
          : 'display matrix'}
      </button>
    </div>
  )
}
