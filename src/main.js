// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import router from './router'
//引入自己的通用css
import '../static/css/common.css'

// import axios from 'axios'
// import {post,fetch,patch,put} from './utils/http'
// //定义全局变量
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;
// Vue.prototype.$patch=patch;
// Vue.prototype.$put=put;

//引入图表插件
import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
