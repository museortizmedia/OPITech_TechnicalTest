import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "products",
      component: () => import("@/views/ProductsView.vue"),
    },
    {
      path: "/products/:id",
      name: "product-detail",
      component: () => import("@/views/ProductDetailView.vue"),
    },
  ],
})

export default router
