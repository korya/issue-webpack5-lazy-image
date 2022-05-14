import Vue from 'vue';
import Lazy from './Lazy.vue';

const app = new Vue({
  template: '<Lazy src="https://image.shutterstock.com/image-photo/italian-canecorso-dog-600w-231666658.jpg" />',
  components: { Lazy },
});

app.$mount('body');