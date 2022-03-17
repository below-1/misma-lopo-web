<template>
  <q-page class="column">
    <h5 class="q-my-none q-mt-xl q-mb-sm text-center">Form Pengujian MMR</h5>
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <q-stepper
          v-model="step"
          vertical
          color="indigo-6"
        >
          <q-step
            :name="1"
            title="Pilih File"
            icon="settings"
            :done="step > 1"
          >
            <input
              ref="csvInput"
              type="file"
              hidden
              @change="onFileChange($event)"
            />
            <q-btn
              label="Pilih file .csv"
              outline
              unelevated
              color="pink"
              dark
              @click="onPickFile"
              :loading="csvLoading"
            />
          </q-step>
          <q-step
            :name="2"
            title="Jalankan Pengujian MMR"
            icon="settings"
            :done="step > 2"
          >
            <q-btn
              v-if="!mmrLoading"
              outlined
              label="Jalankan pengujian"
              @click="runMmr"
            />
            <div class="column" v-else>
              <h6 class="text-center q-my-none">{{ (mmrProgress * 100).toFixed(2) }}%</h6>
              <q-linear-progress
                :value="mmrProgress"
                color="yellow-9"
                class="q-my-md"
                size="xl"
                stripe
              />
            </div>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import MmrWorker from './mmr?worker'
import Papa from 'papaparse'

const $q = useQuasar()
const router = useRouter()
const step = ref(1)
const csvLoading = ref(false)
const csvInput = ref(null)
const csvFile = ref(null)
const wordsData = ref(null)
const mmrLoading = ref(false)
const mmrProgress = ref(0)

async function onFileChange(event) {
  const files = event.target.files
  const file = files[0]
  csvFile.value = file
  csvLoading.value = true
  const result = await Papa.parse(file, {
    worker: true,
    complete: function (results, file) {
      wordsData.value = results.data
      console.log("Parsing complete:", results, file)
      csvLoading.value = false
      step.value += 1
    },
    error: (err) => {
      console.log(err)
    }
  })
}

function onPickFile() {
  csvInput.value.click()
}

const worker = new MmrWorker()

worker.onerror = function (err) {
  console.log('got error from worker')
  console.log(err)
}

worker.onmessage = function (message) {
  if (message.data.type == 'done') {
    console.log('done running mmr in separate thread')
    const mmrResult = message.data.data
    localStorage.setItem('mmr.result', JSON.stringify(mmrResult))
    mmrLoading.value = false
    $q.notify({
      message: 'sukses menjalankan pengujian MMR',
      type: 'positive',
      actions: [
        { label: 'Lihat Hasil Pengujian', handler: () => {
          router.push('/app/mmr-result')
        }}
      ]
    })

  } else if (message.data.type == 'progress') {
    mmrProgress.value = message.data.progress
  }
}

async function runMmr() {
  mmrLoading.value = true
  const data = JSON.parse(JSON.stringify(
    wordsData.value
  ))

  worker.postMessage({
    type: 'start',
    data
  })
}
</script>