import axios from 'axios'

const ERR_OK = 0

export function get(url) {
  return function(params) {
    return axios.get(url, { 
      params 
    }).then((res) => {
      const errno = res.data.error
      const data = res.data.date
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => {
    })
  }
}