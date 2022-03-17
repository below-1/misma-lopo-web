<template>
  <q-layout view="hHh Lpr lFf">
    <q-header dark>
      <q-toolbar class="bg-indigo-9 shadow-2 q-py-none">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="toggleLeftDrawer"
        >
          <q-icon name="img:logo.svg"></q-icon>
        </q-btn>
        <q-toolbar-title class="text-weight-bolder">
          Norlema - Normal Lema
        </q-toolbar-title>
        <q-space/>
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
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="bg-indigo-6 text-white column items-center justify-center">
        <h1 class="text-center q-my-none text-weight-bold">Applikasi Normalisasi Kata</h1>
      </q-page>
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
</script>