import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const count = ref(null);
  const name = ref("");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
