import { useCustomContext } from '../../appContext'

export const TableHeader = () => {
  const {
    colCount: { colCount },
  } = useCustomContext()

  const tableHeader = Array(colCount + 3).fill('')
  return (
    <div
      className={'matrix__grid'}
      style={{
        gridTemplateColumns: `repeat(${colCount + 3}, minmax(30px, 1fr))`,
      }}
    >
      {tableHeader.map((_, index) => (
        <div className="matrix__cell " key={index}>
          <p>
            {index > 0 && index !== colCount + 2
              ? index < colCount + 1
                ? `Cell values N=${index}`
                : 'Sum values'
              : 'Delete row'}
          </p>
        </div>
      ))}
    </div>
  )
}
