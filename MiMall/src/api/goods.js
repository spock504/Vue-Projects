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
