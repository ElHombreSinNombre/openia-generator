<template>
  <button
    :disabled="loading || disabled"
    @click="generate"
    :class="
      disabled
        ? 'button disabled:opacity-50'
        : 'button focus:outline-none focus:shadow-outline'
    "
  >
    <div
      v-if="loading"
      class="spinner align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    ></div>
    <template v-else>Generate</template>
  </button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const generate = () => {
      emit("generate");
    };
    return {
      props,
      generate,
    };
  },
};
</script>

