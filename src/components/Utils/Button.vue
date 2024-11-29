<template>
  <button
    :disabled="disabled"
    @click="onPress"
    class="flex-column flex rounded-md border border-gray-300 shadow-sm p-2 hover:bg-gray-50 ring-gray-400"
    :class="addClass"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  onPress: Function,
  addClass: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
