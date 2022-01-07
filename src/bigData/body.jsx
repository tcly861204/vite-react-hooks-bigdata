/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/7 下午12:00:45
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/7 下午12:00:45
  @Github: https://tcly861204.github.io
*/
import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'
function Body(props) {
  const { data, scrollTop, maxRow, columns, deleteCallback } = props
  const len = data.length > 15 ? 15 : data.length
  const renderCell = function (item, index) {
    if (item.component && item.type !== 'delete') {
      return <item.component index={index} />
    } else if (item.prop) {
      return <div className="cell line-clamp">{data[index][item.prop]}</div>
    } else {
      switch (item.type) {
        case 'index':
          return <div className="cell">{index + 1}</div>
        case 'selection':
          return (
            <div className="cell">
              <Checkbox value={data[index]._checked || false} />
            </div>
          )
        case 'delete':
          if (item.component) {
            return <item.component index={index} callback={deleteCallback} />
          }
          return null
        default:
          return null
      }
    }
  }
  const renderColumns = function () {
    const rows = []
    let maxLen = 0
    const className = 'cui-bigdata-container'
    const dataLen = data.length
    if (dataLen > maxRow) {
      if (scrollTop < dataLen - maxRow - 4) {
        maxLen = scrollTop + maxRow + 3
      } else {
        maxLen = dataLen
      }
    } else {
      maxLen = data.length
    }
    for (let row = scrollTop; row < maxLen; row++) {
      rows.push(
        <div
          key={row}
          className={`${className}-row`}
          style={{ transform: `translateY(${row * 36}px)` }}
        >
          {columns.map((item, col) => {
            return (
              <li
                key={col}
                className={`align-${item.align || 'left'}`}
                style={
                  item.width
                    ? {
                        width: `${item.width}px`,
                        maxWidth: `${item.width}px`,
                        minWidth: `${item.width}px`,
                      }
                    : {
                        display: 1,
                      }
                }
              >
                {renderCell(item, row)}
              </li>
            )
          })}
        </div>
      )
    }
    return rows
  }
  return (
    <div className="table-body" style={{ height: `${len * 36}px` }}>
      {renderColumns()}
    </div>
  )
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
  scrollTop: PropTypes.number.isRequired,
  maxRow: PropTypes.number.isRequired,
  columns: PropTypes.array,
  deleteCallback: PropTypes.func,
}

export default Body
