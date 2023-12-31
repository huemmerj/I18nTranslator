import Vue from 'vue';
import App from './App.vue';
import store from './store';
import 'bootstrap';

// import plugins individually - require exports-loader
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import '@fortawesome/fontawesome-free/css/all.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/scss/bootstrap.scss';

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
