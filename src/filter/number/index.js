import Vue from 'vue'
import { commaFormat as cm } from '@/util'

export function commaFormat(value) {
  if (!value) return 0
  return cm(value)
}
Vue.filter('commaFormat', commaFormat)
