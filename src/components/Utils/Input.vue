<template>
  <input
    type="text"
    class="w-full rounded-md placeholder:text-slate-400 border border-gray-300 p-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    :class="{
      'border-red-700 drop-shadow-md shadow-red-600/50 hover:border-red-600':
        showMessage,
    }"
    :placeholder="placeholder"
    v-model="storeInput"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useInputStore } from "../../stores/Input";
import { useErrorStore } from "../../stores/errorMessage";

const props = defineProps({
  id: String,
  placeholder: String,
});

const store = useInputStore();
const errorStore = useErrorStore();

const { typed } = storeToRefs(store);
const { showError, removeError } = errorStore;

const showMessage = computed(() => {
  return showError(props.id);
});

const storeInput = computed({
  set(typing) {
    typed.value[props.id] = typing;
    removeError(props.id);
  },
  get() {
    return typed.value[props.id] || null;
  },
});
</script>

<style></style>
