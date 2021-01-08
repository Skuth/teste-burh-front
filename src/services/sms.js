import axios from "axios"

const instance = axios.create({
  baseURL: "https://d7sms.p.rapidapi.com/secure/",
  headers: {
    "content-type": "application/json",
    "authorization": `Basic ${process.env.VUE_APP_SMS_KEY}`,
    "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.VUE_APP_RAPIDAPI_HOST
  }
})

const sms = {
  send(data) {
    return instance.post("send", data)
  }
}

export default sms