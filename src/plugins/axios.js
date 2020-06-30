// import Vue from 'vue'

// Lib imports
import axios from 'axios'

const HYPIXEL_ENV = 'https://api.hypixel.net'
const HYPIXEL_KEY = 'key=323cb45e-dc45-4555-81e5-f8f4a2748bac'

// Vue.prototype.$http = axios

const HYPIXEL_HTTP = axios.create({
  baseURL: HYPIXEL_ENV,
  params: {}
})

const HTTP_OUT = axios.create({
  timeout: 5000
})

export { HYPIXEL_KEY, HYPIXEL_HTTP, HTTP_OUT }
