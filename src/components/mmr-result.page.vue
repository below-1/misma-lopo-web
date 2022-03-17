<template>
  <q-page class="column">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 q-my-md">

        <q-card flat bordered>
          <q-card-section>
            <h6 class="text-center text-weight-bold q-my-none">MMR: {{(mmr * 100).toFixed(2)}}%</h6>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-input
              flat
              outlined
              v-model="keyword"
              placeholder="keyword..."
            />
          </q-card-section>
          <q-separator/>
          <q-table
            class="q-my-lg"
            flat
            :columns="columns"
            :rows="filtered"
          >
            <template v-slot:body-cell-normalized_words="props">
              <q-td :props="props">
                {{ props.row.normalized_words.join(' ') }}
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const columns = [
  { name: 'word', field: 'word', label:'Kata', align: 'left' },
  { name: 'normalized_words', field: 'normalized_words', label: 'Hasil Normalisasi',align: 'left' },
  { name: 'mmr', field: 'mmr', label: 'MMR',align: 'left' }
]
const items = ref([])
const mmr = ref(0)
const filtered = computed(() => {
  const lowerKeyword = keyword.value.toLowerCase()
  return items.value.filter(it => it.word.includes(lowerKeyword))
})
const keyword = ref('')
const total_words = ref(0)

onMounted(() => {
  const rawMmrResult = localStorage.getItem('mmr.result')
  const mmrResult = JSON.parse(rawMmrResult)
  items.value = mmrResult.items
  mmr.value = mmrResult.avgMmr
})
</script>