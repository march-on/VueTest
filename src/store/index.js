import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import data from './modules/backData.js'
import data2 from './modules/student.js'


export default  new Vuex.Store({
    modules: {
       data,
       data2
    }
  })