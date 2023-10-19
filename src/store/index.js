import Vue from 'vue'
import Vuex from 'vuex'

const modules = [require('./dashboard')].reduce((map, module) => {
  const d = module.default
  map[d.name] = d
  return map
}, {})

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
})
