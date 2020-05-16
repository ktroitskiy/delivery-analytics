import _ from 'lodash'

export const sortByHighPrice = (products, count) => {
  const result = _.orderBy(products, ['averagePrice', 'desc'])
  return _.slice(result, 0, count)
}

export const sortByLowPrice = (products, count) => {
  const result = _.orderBy(products, ['averagePrice', 'asc'])
  return _.slice(result, 0, count)
}