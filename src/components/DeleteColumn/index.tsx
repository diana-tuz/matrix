import { useCustomContext } from '../../appContext'
import { icons } from '../../assets'

export const DeleteColumn = () => {
  const {
    colCount: { colCount },
    handleDeleteCol,
  } = useCustomContext()
  const handleColumnDelete = (index: number) => {
    if (colCount > 1) {
      handleDeleteCol(index)
    }
  }
  const tableHeader = Array(colCount + 3).fill('')
  return (
    <div
      className={'matrix__grid'}
      style={{
        gridTemplateColumns: `repeat(${colCount + 3}, minmax(60px, 1fr))`,
      }}
    >
      {tableHeader.map((_, index) =>
        index === 0 || index === tableHeader.length - 1 ? (
          <div className="matrix__cell">
            {index !== tableHeader.length - 1 && <p>Delete column</p>}
          </div>
        ) : (
          <button
            className="button"
            key={index}
            onClick={() => handleColumnDelete(index)}
          >
            {index > 0 && index < tableHeader.length - 1 && (
              <img className="icon" alt={'delete'} src={icons.remove} />
            )}
          </button>
        ),
      )}
    </div>
  )
}
