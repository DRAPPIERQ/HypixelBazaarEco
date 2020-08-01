// import Vue from 'vue'

// Lib imports
import axios from 'axios'

const HYPIXEL_ENV = 'https://api.hypixel.net'
const HYPIXEL_KEY = 'key=fc21fdd9-7018-4ff9-b439-233cf226fb90'

// Vue.prototype.$http = axios

const HYPIXEL_HTTP = axios.create({
  baseURL: HYPIXEL_ENV,
  params: {}
})

const HTTP_OUT = axios.create({
  timeout: 5000
})

export { HYPIXEL_KEY, HYPIXEL_HTTP, HTTP_OUT }
