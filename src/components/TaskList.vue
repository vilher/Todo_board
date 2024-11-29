<template>
  <p v-if="!filteredCount" class="mt-4">No tasks found</p>
  <div v-else class="grid sm:grid-cols-4 space-x-4">
    <div v-for="(column, index) in filterTask" :key="column">
      <div class="mt-4">{{ column.column }}</div>
      <draggable
        v-model="column.tasks"
        item-key="id"
        group="tasks"
        @change="(e) => changePosition(e, index, column)"
      >
        <template #item="{ element, index }">
          <task-item
            :position="index + 1"
            :title="element.title"
            :author_id="element.author_id"
          >
          </task-item>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";
import { useTaskFilterStore } from "../stores/taskFilter";
import TaskItem from "./TaskItem.vue";
import { useTasksStore } from "../stores/tasks";

function changePosition(action, column, { tasks }) {
  const { added, removed, moved } = action;

  if (added) {
    const { element } = added;
    replaceTaskPosition(column, tasks, element);
  }

  if (removed) {
    const { element, oldIndex } = removed;
    removeTask(column, oldIndex, element);
  }

  if (moved) {
    replaceTaskPosition(column, tasks);
  }
}

const storeTask = useTasksStore();
const filterStore = useTaskFilterStore();
const { filterTask, filteredCount } = storeToRefs(filterStore);
const { addTask, removeTask, replaceTaskPosition } = storeTask;
</script>
