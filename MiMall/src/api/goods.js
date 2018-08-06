import axios from 'axios'

export function getGoodsList() {
  const url = '/goods/list'

  const data = {
    page: 0,
    pageSize: 8,
    orderFlag: true,
    priceLeave: 'All'
  }

  return axios.get(url, {
    params:data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
