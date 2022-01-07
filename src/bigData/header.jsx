import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'
import { on, off } from '@/libs/utils'

function Header(props) {
  const { columns, callback, handleSelected } = props
  const header = useRef(null)
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    let startX = null
    let endX = null
    let curNode = null
    let gridInfo = null
    let gridNode = null
    let lineNode = null
    const handleMousedown = function (e) {
      startX = e.clientX
      gridNode = e.target.parentNode.parentNode.parentNode.parentNode
      gridInfo = JSON.parse(JSON.stringify(gridNode.getBoundingClientRect()))
      lineNode = document.createElement('div')
      lineNode.className = 'resize-line'
      gridNode.appendChild(lineNode)
      on(document, 'mousemove', handleMouseMove)
      on(document, 'mouseup', handleMouseUp)
    }

    const handleMouseMove = function (e) {
      lineNode.style.left = `${e.clientX - gridInfo.left - 2}px`
      endX = e.clientX
    }

    const handleMouseUp = function () {
      off(curNode.target, 'mousedown', handleMousedown)
      off(document, 'mousemove', handleMouseMove)
      off(document, 'mouseup', handleMouseUp)
      lineNode.parentNode.removeChild(lineNode)
      const field = curNode.target.dataset.field
      callback(field, curNode.target.offsetWidth + 1 + (endX - startX))
    }

    const handleMove = function (e) {
      if (
        e.target.nodeName.toLocaleLowerCase() === 'li' &&
        e.offsetX > 8 &&
        e.target.className.includes('__resize')
      ) {
        e.target.style.cursor = 'col-resize'
        curNode = e
        on(e.target, 'mousedown', handleMousedown)
      } else if (
        e.target.nodeName.toLocaleLowerCase() === 'li' ||
        e.target.nodeName.toLocaleLowerCase() === 'div'
      ) {
        e.target.style.cursor = 'default'
      }
    }
    on(header.current, 'mousemove', handleMove)
    return () => {
      off(header.current, 'mousemove', handleMove)
    }
  }, [header])
  const handleCallBack = useCallback(() => {
    setIsSelected((state) => {
      state = !state
      handleSelected &&
        typeof handleSelected === 'function' &&
        handleSelected(state)
      return state
    })
  }, [isSelected, handleSelected])
  return (
    <div className="table-header" ref={header}>
      {columns.map((item, index) => {
        const width = item.width
        const style = {
          width: `${width}px`,
          maxWidth: `${width}px`,
          minWidth: `${width}px`,
          padding: `0 8px`,
          boxSizing: `border-box`,
        }
        return (
          <li
            className={[
              `align-${item.headerAlign || item.align || 'left'}`,
              item.resizable && '__resize',
            ].join(' ')}
            data-field={item.prop || null}
            style={
              item.width
                ? style
                : {
                    flex: 1,
                    padding: `0 8px`,
                    boxSizing: `border-box`,
                  }
            }
            key={index}
          >
            <div>
              {item.type === 'selection' ? (
                <Checkbox value={isSelected} callback={handleCallBack} />
              ) : (
                item.label
              )}
            </div>
          </li>
        )
      })}
    </div>
  )
}

Header.propTypes = {
  columns: PropTypes.array,
  callback: PropTypes.func,
  handleSelected: PropTypes.func,
}

export default React.memo(Header)
