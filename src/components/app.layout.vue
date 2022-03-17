<template>
  <q-layout view="hHh Lpr fFf">
    <q-header dark>
      <q-toolbar class="bg-indigo-9 shadow-2 q-py-none">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          to="/"
        >
          <q-icon name="img:logo.svg"></q-icon>
        </q-btn>
        <q-toolbar-title class="text-weight-bolder">
          Norlema - Normal Lema
        </q-toolbar-title>
        <q-space/>
        <div class="gt-sm">
          <q-btn
            stretch
            flat
            label="Normalisasi"
            to="/app/stem"
          />
          <q-btn
            stretch
            flat
            label="Pengujian"
            to="/app/mmr"
          />
        </div>
        <q-btn
          @click="toggleLeftDrawer"
          class="lt-md"
          flat
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer dark v-model="showDrawer">
      <q-list separator>
        <q-item
          to="/app/stem"
        >
          <q-item-label>Normalisasi</q-item-label>
        </q-item>
        <q-item
          to="/app/mmr"
        >
          <q-item-label>Pengujian</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

     <q-footer>
      <q-toolbar class="bg-grey-2 text-grey-8">
        <q-toolbar-title class="text-overline">Copyright Misma Lopo - 2020</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, readonly, provide, computed, } from 'vue'
import { useGET } from '@compose/axios'
import { useRouter } from 'vue-router'

function logout() {
  localStorage.removeItem(TOKEN_KEY)
  router.replace('/auth/login')
}

const showDrawer = ref(false)
function toggleLeftDrawer() {
  showDrawer.value = !showDrawer.value
}
</script>