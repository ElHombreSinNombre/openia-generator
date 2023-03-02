<template>
  <textarea
    :value="modelValue"
    @input="change($event)"
    class="input"
    :rows="rows"
    :maxlength="maxlength"
    :required="required"
    :cols="cols"
    :placeholder="placeholder"
  />
  <slot />
</template>

<script lang="ts">
  export default {
    name: 'Textarea',
    props: {
      modelValue: String,
      required: Boolean,
      maxlength: { type: String, default: '3000' },
      name: { type: String, default: undefined },
      rows: { type: Number, default: 10 },
      cols: { type: Number, default: 50 },
      placeholder: { type: String, default: undefined }
    },
    setup(props, { emit }) {
      const change = (event: any) => {
        emit('update:modelValue', event.target.value)
      }
      return {
        props,
        change
      }
    }
  }
</script>
