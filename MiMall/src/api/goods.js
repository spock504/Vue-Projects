import axios from 'axios'

export function getGoodsList() {
  const url = '/api/getGoodsList'

  const data = {
    page: 0,
    pageSize: 8,
    orderFlag: true,
    priceLeave: 'All'
  }

  return axios.get(url, {
    params:data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res)
  })
}

export const ERR_OK = 1
