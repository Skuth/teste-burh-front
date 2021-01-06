import { createWebHistory, createRouter } from "vue-router"

import Home from "@/pages/Home.vue"

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Home
    }
  ]
})

export default router