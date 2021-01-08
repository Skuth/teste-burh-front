import axios from "axios"

const instance = axios.create({
  baseURL: `https://crudcrud.com/api/${process.env.VUE_APP_CRUDCRUD_KEY}/`
})

const api = {
  get(param) {
    return instance.get(param)
  },
  post(param, data) {
    return instance.post(param, data)
  },
  delete(param) {
    return instance.delete(param)
  }
}

export default api