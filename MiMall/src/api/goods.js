import axios from 'axios'

export function getGoodsList(page, pageSize,orderFlag,priceLevel) {
  const url = '/goods/list'

  const data = {
    page,
    pageSize,
    orderFlag,
    priceLevel
  }

  return axios.get(url, {
    params:data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function addToCar(productId) {
  const url = '/goods/addCar'
  return axios.post(url, {
    productId
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export const ERR_OK = '0'
