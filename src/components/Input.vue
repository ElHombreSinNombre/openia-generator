<template>
  <input
    :type="type"
    :value="modelValue"
    @input="change($event)"
    class="input"
    :name="name"
    @keydown="preventNumberInput"
    :minlength="minlength"
    :maxlength="maxlength"
    :required="required"
    :placeholder="placeholder"
  />
  <slot />
</template>

<script lang="ts">
  export default {
    name: 'Input',
    props: {
      modelValue: [String, Number],
      maxlength: { type: String, default: undefined },
      minlength: { type: String, default: undefined },
      required: Boolean,
      type: { type: String, default: 'text' },
      name: { type: String, default: undefined },
      placeholder: { type: String, default: undefined }
    },
    setup(props, { emit }) {
      const preventNumberInput = (event: { preventDefault: () => void }) => {
        if (props.type === 'number') {
          event.preventDefault()
        }
      }
      const change = (event: any) => {
        emit('update:modelValue', event.target.value)
      }
      return {
        props,
        preventNumberInput,
        change
      }
    }
  }
</script>
