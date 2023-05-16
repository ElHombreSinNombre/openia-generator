<template>
  <input
    :type="type"
    @input="change($event)"
    class="input"
    :name="name"
    :onkeydown="type === 'number' ? 'return false' : 'return true'"
    :max="max"
    :min="min"
    :placeholder="placeholder"
  />
  <slot />
</template>

<script lang="ts">
export default {
  name: "Input",
  props: {
    max: { type: Number, default: 3000 },
    min: { type: Number, default: undefined },
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

