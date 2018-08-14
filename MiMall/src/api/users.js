import axios from 'axios'

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

export function payMent(productList, addressId, orderTotal, shipping, discount) {
  const url = '/users/payMent'

  const data = {
    productList,
    addressId,
    orderTotal,
    shipping,
    discount
  }

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res)
  })
}

export const ERR_OK = '0'
