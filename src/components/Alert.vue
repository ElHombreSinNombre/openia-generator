<template>
  <section class="alert cursor-pointer">{{ text }}</section>
</template>

<script lang="ts">
export default {
  name: "Alert",
  props: {
    text: { type: String, default: undefined },
  },
};
</script>

