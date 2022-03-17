import { createRouter, createWebHashHistory } from 'vue-router'

import AppLayout from '@components/app.layout.vue'
import LandingPage from '@components/landing.page.vue'
import StemPage from '@components/word/stem.page.vue'
import MmrPage from '@components/mmr.page.vue'
import MmrResultPage from '@components/mmr-result.page.vue'

export const routes = [
  { path: '/', component: AppLayout, children: [
    { path: '', component: LandingPage },
    { path: 'app/stem', component: StemPage },
    { path: 'app/mmr', component: MmrPage },
    { path: 'app/mmr-result', component: MmrResultPage }
  ]}
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
