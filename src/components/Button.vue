<template>
  <button
    :disabled="loading || disabled"
    @click="generate"
    :class="disabled ? 'button disabled:opacity-50' : 'button'"
  >
    <section
      v-if="loading"
      class="spinner align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    ></section>
    <template v-else>{{ text }}</template>
  </button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: { type: String, default: undefined },
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

