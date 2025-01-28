import { useCustomContext } from '../../appContext'
import { InputItem } from '../InputItem'

import './styles.scss'
export const InputsBlock = () => {
  const {
    rowCount: { rowCount, setRowCount },
    colCount: { colCount, setColCount },
    cellsList: { cellsList },
    closestCount: { closestCount, setClosestCount },
    displayMatrix: { toggleDisplayMatrix },
  } = useCustomContext()

  const handleChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleDisplayMatrix(false)
    setRowCount(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
  }

  const handleChangeCol = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleDisplayMatrix(false)
    setColCount(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
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
