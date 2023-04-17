<template>
  <textarea
    @input="change($event)"
    class="input focus:outline-none focus:shadow-outline"
    :rows="rows"
    :max="max"
    :cols="cols"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
export default {
  name: "Textarea",
  props: {
    max: { type: Number, default: 3000 },
    name: { type: String, default: undefined },
    rows: { type: Number, default: 10 },
    cols: { type: Number, default: 50 },
    placeholder: { type: String, default: undefined },
  },
  setup(props, { emit }) {
    const change = (event: any) => {
      emit("update:modelValue", event.target.value);
    };
    return {
      props,
      change,
    };
  },
};
</script>

