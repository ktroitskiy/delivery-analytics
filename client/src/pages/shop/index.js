import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase'

import PageTitle from 'components/PageTitle/PageTitle'
import Widget from 'components/Widget/Widget'
import { Typography } from 'components/Wrappers/Wrappers'

import SortByPrice from './SortByPriceTable' 
import CategoriesShare from './CategoriesShare'

import * as shopActions from 'store/actions/shop'

import { productCategories } from 'helpers/params'

import './styles.css'

const Shop = props => {
  const dispatch = useDispatch()

  const [choosenCategory, setCategory] = useState(null)

  const shopId = _.get(props, 'match.params.id')
  const currentShop = useSelector(state => _.get(state, `shop.list.${shopId}`))
  const shopName = _.get(currentShop, 'name')
  const shopProductCategories = useSelector(state =>
    _.get(state, `shop.list.${shopId}.productCategories`),
  )
  const choosenCategoryId = _.get(choosenCategory, 'id')
  const categoryProducts = useSelector(state =>
    _.get(
      state,
      `shop.list.${shopId}.productCategories.${choosenCategoryId}.products`,
    ),
  )
  const shopProductCategoryShare = useSelector(state => 
    _.get(state, `shop.list.${shopId}.analitics.shopProductCategoryShare`)  
  )

  useEffect(() => {
    _.size(currentShop) && dispatch(shopActions.getAllProductCategories(shopId))
  }, [dispatch, shopId, currentShop])

  useEffect(() => {
    if (!_.isNil(choosenCategory) && _.isNil(categoryProducts)) {
      dispatch(shopActions.getAllProductsByCategory(shopId, choosenCategory.id))
    }
  }, [choosenCategory, shopId, dispatch, categoryProducts])

  useEffect(() => {
    if (!_.size(shopProductCategoryShare)) {
      dispatch(shopActions.getShopAnalitics(shopId))
    }
  }, [dispatch, shopProductCategoryShare, shopId])

  const renderProductCategories = () => (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      <Widget disableWidgetMenu>
        <Grid container spacing={4}>
          {_.map(shopProductCategories, category => {
            const helperCategoryParams = _.find(
              productCategories,
              helper => helper.en === category.name,
            )
            const name = _.get(helperCategoryParams, 'ru')
            const imgSrc = _.get(helperCategoryParams, 'img')
            return (
              <Grid item lg={2} md={2} sm={4} xs={6} key={category.id}>
                <ButtonBase
                  className="product-category-button"
                  style={{
                    backgroundImage: `url(${imgSrc})`,
                  }}
                  onClick={() => setCategory(category)}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    colorBrightness="secondary"
                  >
                    {name}
                  </Typography>
                </ButtonBase>
              </Grid>
            )
          })}
        </Grid>
      </Widget>
    </Grid>
  )


  return (
    <>
      <PageTitle title={shopName} />
      <Grid container spacing={4}>
        <CategoriesShare
          shopProductCategoryShare={shopProductCategoryShare}
          shopProductCategories={shopProductCategories}
        />
      </Grid>
      <Grid container spacing={4}>
        {renderProductCategories()}
      </Grid>
      {!_.isNil(choosenCategory) &&
        _.size(categoryProducts) &&
        <SortByPrice
          categoryProducts={categoryProducts}
        />}
    </>
  )
}

export default withRouter(Shop)
