
import Vuex from 'vuex'
import getters from './getters'
import cesiumMap from './modules/cesiumMap'
const store = new Vuex.Store({
  modules: {
    cesiumMap,
  },
  getters
})

export default store
