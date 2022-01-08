/**
 * Created by Administrator on 2017/4/8.
 */

import axios from 'axios'
import {api} from './config'
export default {
  getGoods() {
    // return axios.get( goods )
    return axios({
        method: 'get',
        url: api.goodsUrl,
        withCredentials: true
      }
    )
  }
}
