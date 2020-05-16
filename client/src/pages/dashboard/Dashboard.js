import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import useStyles from './styles'

import Widget from 'components/Widget/Widget'
import PageTitle from 'components/PageTitle/PageTitle'
import { Typography } from 'components/Wrappers/Wrappers'

export default function Dashboard(props) {
  const classes = useStyles()

  const totalShops = useSelector(state => _.get(state, 'shop.total'))
  const totalProductCategories = useSelector(state =>
    _.get(state, 'productCategory.total'),
  )
  const totalProducts = useSelector(state => _.get(state, 'product.total'))

  return (
    <>
      <PageTitle title="Delivery Analytics" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Продуктов"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {totalProducts}
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Категорий
                </Typography>
                <Typography size="md">{totalProductCategories}</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Магазинов
                </Typography>
                <Typography size="md">{totalShops}</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}

// #######################################################################
// function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
//   var array = new Array(length).fill();
//   let lastValue;

//   return array.map((item, index) => {
//     let randomValue = Math.floor(Math.random() * multiplier + 1);

//     while (
//       randomValue <= min ||
//       randomValue >= max ||
//       (lastValue && randomValue - lastValue > maxDiff)
//     ) {
//       randomValue = Math.floor(Math.random() * multiplier + 1);
//     }

//     lastValue = randomValue;

//     return { value: randomValue };
//   });
// }
