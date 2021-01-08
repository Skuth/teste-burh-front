import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.imgur.com/3/image/",
  headers: {
    "Authorization": `Client-ID ${process.env.VUE_APP_IMGUR_API_KEY}`
  }
})

const api = {
  post(data) {
    return instance.post("", data)
  },
  delete(param) {
    return instance.delete(param)
  }
}

export default api