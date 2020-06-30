import { HypixelService } from '@/store/services/HypixelService'
import handleApiError from '@/helpers/handleApiError'

export default {
  get_products (context) {
    return new Promise((resolve, reject) => {
      HypixelService.get_products()
        .then(response => {
          var data = response.data.products
          context.commit('SET_PRODUCTS', data)
          // console.log(data)
          resolve(data)
        })
        .catch(error => {
          handleApiError(error, reject)
        })
    })
  },
}
