<template>
  <div
    class="text-left rounded-md border border-opacity-20 border-gray-300 shadow-lg p-4 mt-4 hover:bg-gray-50 ring-gray-400 cursor-move min-h-24"
  >
    <p class="text-ellipsis overflow-hidden">
      {{ title }}
    </p>
    <p class="text-right text-xs text-neutral-400">
      {{ authorName }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTasksStore } from "../stores/tasks";

const props = defineProps({
  position: Number,
  title: String,
  author_id: Number,
});

const taskStore = useTasksStore();
const { getAuthorName } = taskStore;

const authorName = computed(() => {
  return getAuthorName(props.author_id);
});
</script>
