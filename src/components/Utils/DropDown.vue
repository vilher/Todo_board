<template>
  <div class="inline-block">
    <button-vue
      :onPress="showDropdown"
      :class="{
        'border-red-700 drop-shadow-md shadow-red-600/50 hover:border-red-600':
          showMessage,
      }"
    >
      <slot></slot>
      <p v-if="displayDropdown" class="w-[186px] text-left pl-2 text-sm">
        {{ displayDropdown }}
      </p>
    </button-vue>
    <div
      v-if="menuVisible"
      class="overflow-y-auto z-10 absolute w-56 max-h-56 rounded-b-md border shadow-lg ring-black ring-opacity-10 bg-white"
    >
      <button class="py-1 w-full">
        <p
          v-for="option in options"
          :class="{
            'bg-gray-300 hover:bg-gray-300': selecteddropdown === option,
          }"
          :key="option.id"
          @click="dropdownSelected(option)"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left text-sm"
        >
          {{ option[optionTitle] }}
        </p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDropdownStore } from "../../stores/dropdown";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useErrorStore } from "../../stores/errorMessage";
import ButtonVue from "./Button.vue";

const props = defineProps({
  options: Object,
  optionTitle: String,
  id: String,
});

const store = useDropdownStore();
const { showDropdown, selectDropdown, displaySelection } = store;
const { menuVisible } = storeToRefs(store);

const errorStore = useErrorStore();
const { showError, removeError } = errorStore;

const displayDropdown = computed(() => {
  const selection = displaySelection(props.id);
  if (selection) return selection[props.optionTitle];
  return null;
});

const selecteddropdown = computed(() => {
  return displaySelection(props.id);
});

const showMessage = computed(() => {
  return showError(props.id);
});

function dropdownSelected(option) {
  removeError(props.id);
  selectDropdown(props.id, option);
}
</script>

<style></style>
