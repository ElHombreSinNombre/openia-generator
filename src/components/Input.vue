<template>
  <input
    :type="type"
    @input="change($event)"
    class="input focus:outline-none focus:shadow-outline"
    :name="name"
    :onkeydown="type === 'number' ? 'return false' : 'return true'"
    :max="max"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
export default {
  name: "Input",
  props: {
    max: { type: Number, default: 3000 },
    type: { type: String, default: "text" },
    name: { type: String, default: undefined },
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

