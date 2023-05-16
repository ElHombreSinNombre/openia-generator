<template>
  <select :name="name" @change="change($event)" class="select">
    <option selected hidden>Select option</option>
    <option v-for="item in props.items" :value="item.value" :key="item.id">
      {{ item.text }}
    </option>
  </select>
</template>

<script lang="ts">
export default {
  name: "Select",
  props: {
    items: { type: Object, required: true },
    name: { type: String, default: undefined },
  },
  setup(props, { emit }) {
    const change = (event: any) => {
      emit("clear");
      emit("update:modelValue", event.target.value);
    };
    return {
      props,
      change,
    };
  },
};
</script>

