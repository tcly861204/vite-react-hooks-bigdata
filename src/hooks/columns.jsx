import { useState, useEffect, useMemo } from 'react'
const useColumns = function (columns) {
  const [leftColumns, setLeftColumns] = useState([])
  const [rightColumns, setRightColumns] = useState([])
  const [contentColumns, setContentColumns] = useState([])
  useEffect(() => {
    setLeftColumns(columns.filter((item) => item.fixed === 'left'))
    setRightColumns(columns.filter((item) => item.fixed === 'right'))
    setContentColumns(
      columns.filter((item) => !['left', 'right'].includes(item.fixed))
    )
  }, [columns])
  const leftWidth = useMemo(
    () =>
      leftColumns.reduce((acc, item) => {
        return acc + (item.width || 100)
      }, 0),
    [leftColumns]
  )
  const rightWidth = useMemo(
    () =>
      rightColumns.reduce((acc, item) => {
        return acc + (item.width || 100)
      }, 0),
    [rightColumns]
  )
  return [leftColumns, contentColumns, rightColumns, leftWidth, rightWidth]
}

export default useColumns
