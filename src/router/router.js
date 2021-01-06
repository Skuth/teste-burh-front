import { createWebHistory, createRouter } from "vue-router"

import Home from "@/pages/Home.vue"
import Product from "@/pages/Product.vue"
import Products from "@/pages/Products.vue"
import Announce from "@/pages/Announce.vue"

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
    {
      path: "/produtos",
      component: Products
    },
    {
      path: "/anunciar",
      component: Announce
    }
  ]
})

export default router