<template>
  <create-task></create-task>
  <task-filters></task-filters>
  <task-list></task-list>
</template>

<script setup>
import CreateTask from "./components/CreateTask.vue";
import TaskList from "./components/TaskList.vue";
import TaskFilters from "./components/TaskFilters.vue";
import { onMounted, onUpdated } from "vue";
import { useTasksStore } from "./stores/tasks";

const store = useTasksStore();
const { fetchTasks } = store;

onMounted(() => {
  fetchTasks();
});
</script>

<style scoped></style>
