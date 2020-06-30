import { HYPIXEL_HTTP, HYPIXEL_KEY } from '@/plugins/axios'

export const HypixelService = {
  get_products () {
    return HYPIXEL_HTTP.get(`/skyblock/bazaar?` + HYPIXEL_KEY)
  }
}
