import axios from 'axios'

export function addToCar(productId) {
  const url = '/goods/addCar'
  return axios.post(url, {
    productId
  }).then((res) => {
    return Promise.resolve(res)
  })
}
