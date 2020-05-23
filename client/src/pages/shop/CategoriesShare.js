import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { PieChart, Pie, Sector, Cell } from 'recharts'
import _ from 'lodash'

import Widget from 'components/Widget/Widget'
import { Typography } from 'components/Wrappers/Wrappers'

import { productCategories } from 'helpers/params'

const CategoriesShare = props => {
  const { shopProductCategoryShare, shopProductCategories } = props

  const data = _.map(shopProductCategoryShare, (share) => {
    const currentCategory = _.find(shopProductCategories, (category) => category.id === share.categoryId)
    const helperCategoryParams = _.find(
      productCategories,
      helper => helper.en === _.get(currentCategory, 'name'),
    )
    const currentCategoryName = _.get(helperCategoryParams, 'ru')
    const currentCategoryColor = _.get(helperCategoryParams, 'color')

    return {
      name: currentCategoryName,
      value: share.shareCount,
      color: currentCategoryColor
    }
  })

  const [ activeCategoryIndex, setActiveCategoryIndex ] = useState(0) 


  const onPieEnter = (data, index) => {
    setActiveCategoryIndex(index)
  }

  const renderActiveShape = props => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} font-size="22" textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={data[activeCategoryIndex].color}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={data[activeCategoryIndex].color}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={data[activeCategoryIndex].color}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={data[activeCategoryIndex].color} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Количество: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  return (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      <Widget disableWidgetMenu>
        <Typography variant="h3" color="text">
          Доля товаров по категориям
        </Typography>
        <PieChart width={800} height={500}>
          <Pie
            activeIndex={activeCategoryIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={300}
            cy={250}
            innerRadius={140}
            outerRadius={160}
            fill="#8884d8"
            onMouseEnter={onPieEnter}
          >
            {
          	  data.map((entry, index) => <Cell fill={entry.color}/>)
            }
          </Pie>
        </PieChart>
      </Widget>
    </Grid>
  )
}

export default CategoriesShare
