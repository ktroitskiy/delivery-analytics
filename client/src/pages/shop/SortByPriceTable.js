import React from 'react'
import _ from 'lodash'

import { Grid } from '@material-ui/core'

import Widget from 'components/Widget/Widget'
import { Typography } from 'components/Wrappers/Wrappers'

import { sortByHighPrice, sortByLowPrice } from 'helpers/math'

import './styles.css'

const SortByPrice = props => {

  const { categoryProducts } = props

  const renderProductComposition = productVariations =>
    _.map(productVariations, variation => {
      return (
        <div key={variation.id} className="product-composition-variant">
          {variation.composition}
        </div>
      )
    })

  const renderProductPrice = productVariations => {
    const countVatiations = _.size(productVariations)
    if (countVatiations === 1) {
      return `${productVariations[0].price}р.`
    } else {
      return `${productVariations[0].price}р. - ${
        productVariations[countVatiations - 1].price
      }р.`
    }
  }

  const renderProduct = product => {
    return (
      <div key={product.id} className="product-card-wrapper">
        <img src={product.imageSrc} alt="" />
        <div className="product-body">
          <div className="product-name">{product.name}</div>
          <div className="product-composition">
            {renderProductComposition(product.productVariation)}
          </div>
        </div>
        <div className="product-price">
          {renderProductPrice(product.productVariation)}
        </div>
      </div>
    )
  }


  const countSliceResult = categoryProducts.length / 2 >= 5 ? 5 : categoryProducts.length / 2

  const productsSortedByHighPrice = sortByHighPrice(
    categoryProducts,
    countSliceResult,
  )
  const productsSortedByLowPrice = sortByLowPrice(
    categoryProducts,
    countSliceResult,
  )

  return (
    <Grid container spacing={4}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Widget bodyClass="product-analitics-list" disableWidgetMenu>
          <Typography variant="h2" color="success">
            Самые доступные товары
          </Typography>
          {_.size(productsSortedByLowPrice) ? (
            _.map(productsSortedByLowPrice, product => renderProduct(product))
          ) : (
            <Typography>
              Нет данных о самых доступных по цене товарах
            </Typography>
          )}
        </Widget>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Widget bodyClass="product-analitics-list" disableWidgetMenu>
          <Typography variant="h2" color="warning">
            Самые дорогие товары
          </Typography>
          {_.size(productsSortedByHighPrice) ? (
            _.map(productsSortedByHighPrice, product =>
              renderProduct(product),
            )
          ) : (
            <Typography>Нет данных о самых дорогие товарах</Typography>
          )}
        </Widget>
      </Grid>
    </Grid>
  )
}

export default SortByPrice
