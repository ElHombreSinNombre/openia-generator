<template>
  <main class="center">
    <section class="card">
      <font-awesome-icon
        icon="fa-solid fa-brain"
        class="fa-xl items-center my-3 w-full"
      />
      <Select
        v-model="type"
        :items="types"
        name="type"
        required
        @clear="clear()"
      />
      <Input
        v-if="type !== 'Completion'"
        placeholder="Prompt"
        v-model="prompt"
        name="prompt"
        maxlength="50"
        required
      >
        <article
          class="text-right"
          :class="{ 'text-red-500	': prompt.length >= 50 }"
        >
          {{ prompt.length }} / 50
        </article>
      </Input>
      <CTextarea
        v-else
        placeholder="Prompt"
        v-model="prompt"
        maxlength="3000"
        name="prompt"
        required
      >
        <article
          class="text-right"
          :class="{ 'text-red-500': prompt.length >= 3000 }"
        >
          {{ prompt.length }} / 3000
        </article>
      </CTextarea>

      <template v-if="type === 'Image'">
        <Input
          mixlength="1"
          maxlength="10"
          type="number"
          name="Quantity"
          placeholder="Quantity"
          v-model="number"
        />
        <Select
          :items="sizes"
          v-model="resolution"
          name="resolution"
          required
        />
      </template>
      <Button
        @generate="generate"
        :loading="loading"
        :disabled="isDisabled"
        text="Generate"
      />
      <Alert
        v-if="error"
        text="Check API Key or internet connection"
        @click="error = false"
        title="Click to close"
      />
    </section>
    <section v-if="images && images.length" class="card">
      <h3 class="header">Images</h3>
      <article class="grid grid-cols-4 gap-4">
        <TransitionGroup name="images">
          <template v-for="image in images">
            <img
              class="object-cover border"
              :src="image.url"
              loading="lazy"
              alt="Image"
            />
          </template>
        </TransitionGroup>
      </article>
    </section>
    <section v-if="texts && texts.length" class="card">
      <h3 class="header">Text</h3>
      <TransitionGroup name="list" tag="ul">
        <template v-for="text in texts" :key="index">
          <li>
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              class="px-4"
            />{{ text.text }}
          </li>
        </template>
      </TransitionGroup>
    </section>
    <section v-if="completions && completions.length" class="card">
      <h3 class="header">Completions</h3>
      <TransitionGroup name="completion">
        <template v-for="completion in completions" :key="index">
          <pre
            @click="copy(completion.text)"
            v-if="isJSON"
            title="Click to copy"
            class="card minicard bg-slate-900 text-gray-50 cursor-pointer"
          >
            {{ completion.text }}
          </pre>
          <article v-else class="card minicard">
            {{ completion.text }}
          </article>
        </template>
      </TransitionGroup>
    </section>
  </main>
</template>

<script lang="ts">
  import Input from './components/Input.vue'
  import CTextarea from './components/Textarea.vue'
  import Select from './components/Select.vue'
  import Button from './components/Button.vue'
  import Alert from './components/Alert.vue'

  import { useImageStore } from './store/image'
  import { useTextStore } from './store/text'
  import { useCompletionStore } from './store/completion'

  import { ref, computed } from 'vue'

  import { library } from '@fortawesome/fontawesome-svg-core'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faBrain } from '@fortawesome/free-solid-svg-icons'
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

  import { Text } from './types/Text'
  import { Image } from './types/Image'

  library.add(faBrain, faChevronRight)

  export default {
    name: 'App',
    components: {
      Input,
      Select,
      CTextarea,
      Button,
      Alert,
      FontAwesomeIcon
    },
    setup() {
      let prompt = ref('')
      let images = ref<Image[]>([])
      let texts = ref<Text[]>([])
      let completions = ref<Text[]>([])
      let number = ref<number>(0)
      let type = ref('')
      let resolution = ref('')
      let loading = ref<boolean>(false)
      let error = ref<boolean>(false)
      const completionStore = useCompletionStore()
      const textStore = useTextStore()
      const imageStore = useImageStore()

      const sizes = [
        { text: '256x256', value: '256x256' },
        { text: '512x512', value: '512x512' },
        { text: '1024x1024', value: '1024x1024' }
      ]

      const types = [
        { text: 'Text', value: 'Text' },
        { text: 'Completion', value: 'Completion' },
        { text: 'Image', value: 'Image' }
      ]

      const isDisabled = computed(() => {
        return type.value === 'Image'
          ? !prompt.value || !type.value || !resolution.value || !number.value
          : !type.value || !prompt.value
      })

      const isJSON = computed(() => prompt.value.toLowerCase().includes('json'))

      function generate() {
        loading.value = true
        error.value = false
        setTimeout(getStore, 300)
      }

      function copy(completion: string) {
        navigator.clipboard.writeText(completion)
      }

      function clear() {
        prompt.value = ''
      }

      function getStore() {
        try {
          if (type.value === 'Text') {
            textStore.fetchText(prompt.value)
            texts.value = textStore.getText
          } else if (type.value === 'Image') {
            imageStore.fetchImage(prompt.value, number.value, resolution.value)
            images.value = imageStore.getImage
          } else {
            completionStore.fetchCompletion(prompt.value)
            completions.value = completionStore.getCompletion
          }
          loading.value = false
        } catch (e) {
          loading.value = false
          error.value = true
        }
      }

      return {
        generate,
        error,
        isJSON,
        prompt,
        images,
        number,
        type,
        copy,
        clear,
        isDisabled,
        resolution,
        completions,
        loading,
        sizes,
        types,
        texts
      }
    }
  }
</script>
