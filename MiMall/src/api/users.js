import axios from 'axios'

export function editCartNum(Id, productNum, checked) {
  const url = 'https://cors-anywhere.herokuapp.com/http://linyijiu.cn:3000/users/carEdit'
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
  const url = 'https://cors-anywhere.herokuapp.com/http://linyijiu.cn:3000/users/payMent'

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
