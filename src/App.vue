<template>
  <div class="center">
    <div class="card hover:shadow-lg hover:border-black">
      <font-awesome-icon
        icon="fa-solid fa-user-tie"
        class="fa-xl items-center my-3 w-full"
      />
      <Select v-model="type" :items="types" name="type" required />
      <Input
        placeholder="Prompt"
        v-model="prompt"
        name="prompt"
        required
        v-if="type !== 'Completion'"
      />
      <Textarea
        placeholder="Prompt"
        v-model="prompt"
        name="prompt"
        required
        v-else
      />
      <template v-if="type === 'Image'">
        <Input
          :value="number"
          :min="1"
          :max="10"
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
      <Button @generate="generate" :loading="loading" :disabled="isDisabled" />
      <Alert
        v-if="error"
        text="Check API Key or internet connection"
        @click="error = false"
        title="Click to close"
      />
    </div>
    <div
      v-if="images && images.length"
      class="card hover:shadow-lg hover:border-black"
    >
      <h3 class="header">Images</h3>
      <div class="grid grid-cols-4 gap-4">
        <template v-for="image in images">
          <img class="object-cover border" :src="image" />
        </template>
      </div>
    </div>
    <div
      v-if="texts && texts.length"
      class="card hover:shadow-lg hover:border-black"
    >
      <h3 class="header">Text</h3>
      <TransitionGroup name="list" tag="ul">
        <template v-for="text in texts" :key="index">
          <li>
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              class="px-4"
            />{{ text }}
          </li>
        </template>
      </TransitionGroup>
    </div>
    <div
      v-if="completions && completions.length"
      class="card hover:shadow-lg hover:border-black"
    >
      <h3 class="header">Completions</h3>
      <TransitionGroup name="completion">
        <template v-for="completion in completions" :key="index">
          <pre
            @click="copy(completion)"
            v-if="isJSON"
            title="Click to copy"
            class="card minicard bg-slate-900 text-gray-50 cursor-pointer"
          >
            {{ completion }}
          </pre>
          <div v-else class="card minicard">
            {{ completion }}
          </div>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import Input from "./components/Input.vue";
import Textarea from "./components/Textarea.vue";
import Select from "./components/Select.vue";
import Button from "./components/Button.vue";
import Alert from "./components/Alert.vue";

import { useImageStore } from "../stores/image";
import { useTextStore } from "../stores/text";
import { useCompletionStore } from "../stores/Completion";

import { Configuration, OpenAIApi } from "openai";
import { ref, computed } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
library.add(faUserTie, faChevronRight);

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_Open_AI_Key,
});
const openai = new OpenAIApi(configuration);

export default {
  name: "App",
  components: {
    Input,
    Select,
    Textarea,
    Button,
    Alert,
    FontAwesomeIcon,
  },
  setup() {
    let prompt = ref("");
    let images = ref([]);
    let texts = ref([]);
    let completions = ref([]);
    let number = ref(1);
    let type = ref("");
    let resolution = ref("");
    let loading = ref(false);
    let error = ref(false);
    const completionStore = useCompletionStore();
    const textStore = useTextStore();
    const imageStore = useImageStore();

    const sizes = [
      { text: "256x256", value: "256x256" },
      { text: "512x512", value: "512x512" },
      { text: "1024x1024", value: "1024x1024" },
    ];

    const types = [
      { text: "Text", value: "Text" },
      { text: "Completion", value: "Completion" },
      { text: "Image", value: "Image" },
    ];

    const isDisabled = computed(() => {
      return type.value === "Image"
        ? !prompt.value || !type.value || !resolution.value
        : !type.value || !prompt.value;
    });

    const isJSON = computed(() => prompt.value.toLowerCase().includes("json"));

    function generate() {
      loading.value = true;
      setTimeout(getStore, 300);
    }

    function copy(completion: string) {
      navigator.clipboard.writeText(completion);
    }

    function getStore() {
      if (type.value === "Text") {
        textStore.fetchText(openai, prompt.value);
        texts.value = textStore.getText;
        error.value = textStore.getTextError;
      } else if (type.value === "Image") {
        imageStore.fetchImage(
          openai,
          prompt.value,
          number.value,
          resolution.value
        );
        images.value = imageStore.getImage;
        error.value = imageStore.getImageError;
      } else {
        completionStore.fetchCompletion(openai, prompt.value);
        completions.value = completionStore.getCompletion;
        error.value = textStore.getCompletionStore;
      }
      loading.value = false;
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
      isDisabled,
      resolution,
      completions,
      loading,
      sizes,
      types,
      texts,
    };
  },
};
</script>

