<template>
  <div>
    <div class="bg-blue-500 text-white p-4 bg-tahini">
      This is a Tailwind-styled div!
    </div>
    <button
      class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
    >
      Save changes
    </button>
  </div>
</template>

<script setup>
import { useTasksStore } from "./stores/tasks";

const store = useTasksStore();
</script>

<style scoped></style>
