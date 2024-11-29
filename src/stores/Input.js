import { ref } from "vue";
import { defineStore } from "pinia";

export const useInputStore = defineStore("input", () => {
  const typed = ref({});

  function clearInput(key) {
    delete typed.value[key];
  }

  return { typed, clearInput };
});
