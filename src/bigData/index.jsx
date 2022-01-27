/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/7 下午12:00:45
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/7 下午12:00:45
  @Github: https://tcly861204.github.io
*/
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Header from './header'
import Body from './body'
import PropTypes from 'prop-types'
import useColumns from '@/hooks/columns'
import './style.scss'
const BigData = (props) => {
  const { data, handleSelected } = props
  const bodyNode = useRef(null)
  const [columns, setColumns] = useState(props.columns || [])
  const [scrollWidth, setScrollWidth] = useState(8)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [rowHeight] = useState(props.rowHeight || 36)
  const [maxRow] = useState(props.maxRow || 15)
  const [isScroll, setIsScroll] = useState(false)
  const [leftColumns, contentColumns, rightColumns, leftWidth, rightWidth] =
    useColumns(columns)
  useEffect(() => {
    const timer = setTimeout(() => {
      const width = bodyNode.current.clientWidth
      const pwidth = bodyNode.current.parentNode.clientWidth
      setScrollWidth(pwidth - width)
      return () => {
        clearTimeout(timer)
      }
    }, 30)
  }, [data, bodyNode])
  useEffect(() => {
    setIsScroll(data.length > maxRow)
  }, [data, maxRow])
  const handleResizeColumn = useCallback(
    function (field, width) {
      if (!field) {
        return
      }
      const index = columns.findIndex((item) => item.prop === field)
      if (index >= 0) {
        const newColumns = [...columns]
        newColumns[index].width = width < 20 ? 20 : width
        setColumns(newColumns)
      }
    },
    [columns]
  )
  const containerName = 'cui-bigdata-container'
  const controllerHeight = useMemo(() => {
    return ((data.length > maxRow ? maxRow : data.length) + 1) * rowHeight
  }, [data, maxRow, rowHeight])
  const handleScroll = function (e) {
    const top = e.currentTarget.scrollTop
    const left = e.currentTarget.scrollLeft
    if (top !== scrollTop) {
      setScrollTop(Math.floor(top / rowHeight))
    }
    if (left !== scrollLeft) {
      setScrollLeft(left)
    }
  }
  const scrollHeight = useMemo(() => {
    return data.length * rowHeight
  }, [data, rowHeight])
  return (
    <section
      className={containerName}
      style={{ height: `${controllerHeight + 2}px` }}
    >
      <section className={`${containerName}-header`}>
        <div
          className={`${containerName}_left`}
          style={{ width: `${leftWidth}px` }}
        >
          <Header
            columns={leftColumns}
            callback={handleResizeColumn}
            handleSelected={handleSelected}
          />
        </div>
        <div
          className={`${containerName}_content`}
          style={{
            left: `${leftWidth - scrollLeft}px`,
            right: `${
              rightWidth + (isScroll ? scrollWidth : 0) - scrollLeft
            }px`,
          }}
        >
          <Header
            handleSelected={handleSelected}
            columns={contentColumns}
            callback={handleResizeColumn}
          />
        </div>
        <div
          className={`${containerName}_right`}
          style={{
            width: `${rightWidth + (isScroll ? scrollWidth : 0)}px`,
            right: 0,
          }}
        >
          <Header columns={rightColumns} callback={handleResizeColumn} />
        </div>
      </section>
      <section
        className={`${containerName}-body`}
        style={{ height: `${controllerHeight - 36}px` }}
        onScroll={handleScroll}
        ref={bodyNode}
      >
        <div
          className={`${containerName}_left`}
          style={{
            width: `${leftWidth}px`,
            left: `${scrollLeft}px`,
            height: `${scrollHeight}px`,
          }}
        >
          <Body
            {...props}
            maxRow={maxRow}
            scrollTop={scrollTop}
            columns={leftColumns}
          />
        </div>
        <div
          className={`${containerName}_content`}
          style={{
            left: `${leftWidth}px`,
            right: `${rightWidth - scrollLeft}px`,
            height: `${scrollHeight}px`,
          }}
        >
          <Body
            {...props}
            maxRow={maxRow}
            scrollTop={scrollTop}
            columns={contentColumns}
          />
        </div>
        <div
          className={`${containerName}_right`}
          style={{
            width: `${rightWidth}px`,
            right: `${0 - scrollLeft}px`,
            height: `${scrollHeight}px`,
          }}
        >
          <Body
            {...props}
            maxRow={maxRow}
            scrollTop={scrollTop}
            columns={rightColumns}
          />
        </div>
        <div
          className={`${containerName}_scroll`}
          style={{ height: `${scrollHeight}px` }}
        />
      </section>
    </section>
  )
}

BigData.propTypes = {
  data: PropTypes.array,
  handleSelected: PropTypes.func,
  columns: PropTypes.array,
  rowHeight: PropTypes.number,
  maxRow: PropTypes.number,
}

export default BigData
