import { createWebHistory, createRouter } from "vue-router"

import Home from "@/pages/Home.vue"
import Product from "@/pages/Product.vue"

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/produto/:productId",
      component: Product
    },
  ]
})

export default router