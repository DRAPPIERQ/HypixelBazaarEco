<template>
  <div class="Dashboard">
    <div class="container">
      <div class="item">
        <h1>Légende</h1>
        <ol>
          <li v-for="(item, index) in _.uniq(npcAndProfitProducts.map(item => item.type_name))" :key="index">
            <p :class="item.toLowerCase()+'-color'">{{ item.toLowerCase() }}</p>
          </li>
        </ol>
      </div>
      <div class="item">
        <h1>Global Profit</h1>
        <table>
          <thead>
            <tr>
              <th>Profit per item</th>
              <th>Profit per entchanted item</th>
              <th>Profit per block</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                :class="globalProfit.item == 0 ? '' : globalProfit.item > 0 ? 'success': 'error'"
              >
                {{ globalProfit.item > 0 ? '+' : ''}}{{ globalProfit.item | toCoins}}
              </td>
              <td
                :class="globalProfit.ec_item == 0 ? '' : globalProfit.ec_item > 0 ? 'success': 'error'"
              >
                {{ globalProfit.ec_item > 0 ? '+' : ''}}{{ globalProfit.ec_item | toCoins}}
              </td>
              <td
                :class="globalProfit.block == 0 ? '' : globalProfit.block > 0 ? 'success': 'error'"
              >
                {{ globalProfit.block > 0 ? '+' : ''}}{{ globalProfit.block | toCoins}}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="div-inline"><h1>Profitables Items</h1> <input type="checkbox" v-model="isProfitListOpen"/><small>{{isProfitListOpen ? 'Hide' : "Show"}} list</small></div>
        <table v-if="isProfitListOpen">
          <thead>
            <tr>
              <th>Item</th>
              <th>Presize item</th>
              <th>Profit per unit</th>
              <th>Approximate profit for maximum purchase</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in profitableItems" :key="index">
              <td :class="item.type_name.toLowerCase()+'-bgcolor no-color text-align-center'">
                <abbr :title="item.type_name">{{ item.name }}</abbr>
              </td>
              <td :class="item.type_name.toLowerCase()+'-color'">
                {{ getItemsNamesById(item.profit_id) }}
              </td>
              <td 
                :class="item.profit == 0 ? '' : item.profit > 0 ? 'success': 'error'"
              >
                {{ item.profit > 0 ? '+' : ''}}{{ item.profit | toCoins }}
              </td>
              <td 
                :class="item.max_profit == 0 ? '' : item.max_profit > 0 ? 'success': 'error'"
              >
                {{ item.max_profit > 0 ? '+' : ''}}{{ item.max_profit | toCoins }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <!-- <pre>{{ bazaarProducts }}</pre> -->
    <div class="container">
      <table class="item">
        <thead>
          <tr>
            <th
              scope="col"
              v-for="(item, index) in productsCompareHeader"
              :key="index"
              :class="'text-align-'+item.align"
            >{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in npcAndProfitProducts"
            :key="index"
            :class="item.type_name.toLowerCase()+'-color'"
          >
            <td :class="item.type_name.toLowerCase()+'-bgcolor no-color text-align-center'">
              <abbr :title="item.type_name">{{ item.name }}</abbr>
            </td>
            <td>{{ item.npc.item | toCoins }}</td>
            <td>{{ item.npc.ec_item | toCoins }}</td>
            <td>{{ item.npc.block | toCoins }}</td>
            <td>{{ bazaarProducts[item.npc.item_id] ? bazaarProducts[item.npc.item_id].quick_status.sellPrice : 0 | toCoins }}</td>
            <td>{{ bazaarProducts[item.npc.ec_item_id] ? bazaarProducts[item.npc.ec_item_id].quick_status.sellPrice : 0 | toCoins }}</td>
            <td>{{ bazaarProducts[item.npc.block_id] ? bazaarProducts[item.npc.block_id].quick_status.sellPrice : 0 | toCoins }}</td>
            <td
              :class="item.profit.item == 0 ? item.type_name.toLowerCase()+'-color' : item.profit.item > 0 ? 'success': 'error'"
            >{{ item.profit.item > 0 ? '+' : ''}}{{ item.profit.item | toCoins }}</td>
            <td
              :class="item.profit.ec_item == 0 ? item.type_name.toLowerCase()+'-color' : item.profit.ec_item > 0 ? 'success': 'error'"
            >{{ item.profit.ec_item > 0 ? '+' : ''}}{{ item.profit.ec_item | toCoins }}</td>
            <td
              :class="item.profit.block == 0 ? item.type_name.toLowerCase()+'-color' : item.profit.block > 0 ? 'success': 'error'"
            >{{ item.profit.block > 0 ? '+' : ''}}{{ item.profit.block | toCoins }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'Dashboard',

  filters: {
    toCoins: value => {
      let val = value.toFixed(2);
      if (val.toString().length < 1) {
        val = '0' + val.toString();
      }
      return val.toString();
    }
  },

  data: () => {
    return {
      isProfitListOpen: false
    }
  },

  mounted () {
    this.get_products();
    var self = this
    setTimeout(function() {
      self.get_products()
    }, 60000)
  },

  methods: {
    ...mapActions('hypixel', ['get_products']),

    getBiggestProfit (item) {
      let biggest = {
        item: {
          profit_id: '',
          profit: 0,
          max_profit: 0
        },
        ec_item: {
          profit_id: '',
          profit: 0,
          max_profit: 0
        },
        block: {
          profit_id: '',
          profit: 0,
          max_profit: 0
        }
      }
      // SET ITEM BIGGEST
      biggest.item.profit_id = item.npc.item_id
      biggest.item.profit = item.profit.item
      biggest.item.max_profit = 640 * item.profit.item
      // SET EC ITEM BIGGEST
      biggest.ec_item.profit_id = item.npc.ec_item_id
      biggest.ec_item.profit = item.profit.ec_item
      if (item.npc.ec_item == 'ENCHANTED_BREAD') {
        biggest.ec_item.max_profit = 10 * item.profit.ec_item
      } else if (item.npc.ec_item == 'ENCHANTED_STRING') {
        biggest.ec_item.max_profit = 3 * item.profit.ec_item_id
      } else if (item.npc.ec_item == 'ENCHANTED_PACKED_ICE') {
        biggest.ec_item.max_profit = 36 * item.profit.ec_item
      } else if (item.npc.ec_item == 'ENCHANTED_QUARTZ_BLOCK') {
        biggest.ec_item.max_profit = 16 * item.profit.ec_item
      } else {
        biggest.ec_item.max_profit = 4 * item.profit.ec_item
      }
      // SET BLOCK BIGGEST
      biggest.block.profit_id = item.npc.block_id
      biggest.block.profit = item.profit.block
      if (item.npc.block_id == 'ENCHANTED_PAPER') {
        biggest.block.max_profit = 3 * item.profit.block
      } else {
        biggest.block.max_profit = 71 * item.profit.block
      }
      // GET THE BIGGEST PROFIT
      if (biggest.item.max_profit > biggest.ec_item.max_profit && biggest.item.max_profit > biggest.block.max_profit) {
        biggest = biggest.item
      } else if (biggest.ec_item.max_profit > biggest.item.max_profit && biggest.ec_item.max_profit > biggest.block.max_profit) {
        biggest = biggest.ec_item
      } else if (biggest.block.max_profit > biggest.ec_item.max_profit && biggest.block.max_profit > biggest.item.max_profit) {
        biggest = biggest.block
      } else {
        biggest = {
          profit_id: '',
          profit: 0,
          max_profit: 0
        }
      }
      return biggest
    },

    getItemsNamesById (item_id) {
      return this.getItemsNames()[item_id] ? this.getItemsNames()[item_id] : ''
    }
  },

  computed: {
    ...mapGetters('hypixel', [
      'getNpcAndProfitProducts',
      'getBazaarProducts',
      'getProductsCompareHeader',
      'getItemsNames'
    ]),

    npcAndProfitProducts () {
      return this.getNpcAndProfitProducts()
    },

    bazaarProducts () {
      return this.getBazaarProducts()
    },

    productsCompareHeader () {
      return this.getProductsCompareHeader()
    },

    globalProfit () {
      let reducer = (accumulator, currentValue) => accumulator + ((currentValue) > 0 ? currentValue : 0);
      return {
        item: this.npcAndProfitProducts.map(item => item.profit.item).reduce(reducer),
        ec_item: this.npcAndProfitProducts.map(item => item.profit.ec_item).reduce(reducer),
        block: this.npcAndProfitProducts.map(item => item.profit.block).reduce(reducer)
      }
    },

    profitableItems () {
      let values = this.npcAndProfitProducts.filter(item => {return item.profit.item > 0 || item.profit.ec_item > 0 || item.profit.block > 0})
      return values.map(item => {
        let biggest = this.getBiggestProfit(item)
        return {
          type_name: item.type_name,
          type_id: item.type_id,
          name: item.name,
          profit_id: biggest.profit_id,
          profit: biggest.profit,
          max_profit: biggest.max_profit
        }
      })
    }

  }
}
</script>

<style scoped>
.error {
  color: rgb(236, 35, 35);
}
.success {
  color: rgb(85, 202, 55);
}

.div-inline {
  display: flex;
  align-items: baseline;
}
.div-inline > input[type="checkbox"] {
  margin-left: 30px;
  margin-right: 5px;
}
</style>
