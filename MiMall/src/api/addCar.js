import axios from 'axios'

export function addToCar(productId) {
  const url = '/goods/addCar'
  return axios.post(url, {
    productId
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function editCartNum(Id, productNum, checked) {
  const url = '/users/carEdit'
  const data = {
    Id,
    productNum,
    checked,
  }

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res)
  })
}

export const ERR_OK = '0'
