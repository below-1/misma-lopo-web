<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 column justify-center" style="padding-top: 60px;">
        <h6 class="q-my-none text-center">Masukan kata yang akan dinormalisasi</h6>
        <q-input
          filled
          placeholder="Masukan kata"
          unelevated
          class="q-my-sm"
          v-model="word"
        />
        <q-btn
          label="normalisasi"
          unelevated
          color="blue"
          :loading="loading"
          @click="process_word"
        />
        <div v-if="parse_result">
          <q-card bordered flat class="q-my-md">
            <q-card-section>
              <h6 class="q-my-none">Hasil Parsing</h6>
            </q-card-section>
            <q-separator/>
            <q-list separator>
              <q-item
                v-for="pair, index in parse_result"
                :key="index"
              >
                <h4 class="q-my-none q-py-none text-weight-bold">
                  {{ pair[0] }}
                </h4>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, unref } from 'vue'
import { stem2 } from '@serv/stem'
import { bfs } from '@serv/bfs'

const loading = ref(false)
const word = ref('Rumahsakitnya')
const parse_result = ref(null)

function process_word() {
  loading.value = true
  const w = unref(word)
  const stemResult = stem2(w.toLowerCase())
  console.log(`stemResult = ${stemResult}`)
  const bfsResult = bfs(stemResult)
  console.log(`bfsResult = ${bfsResult}`)
  loading.value = false
  parse_result.value = bfsResult
}
</script>
