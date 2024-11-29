<template>
  <div class="flex text-sm gap-2">
    <drop-down :options="authors" optionTitle="display_name" id="drop_1">
      <user-icon />
    </drop-down>
    <input-vue id="task_1" placeholder="Title" />
    <button-vue :onPress="() => createTask('task_1', 'drop_1')">
      <plus-icon />
    </button-vue>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTasksStore } from "../stores/tasks";
import DropDown from "./Utils/DropDown.vue";
import InputVue from "./Utils/Input.vue";
import ButtonVue from "./Utils/Button.vue";
import UserIcon from "./icons/User.vue";
import PlusIcon from "./icons/Plus.vue";

const taskStore = useTasksStore();

const { createTask } = taskStore;
const { authors } = storeToRefs(taskStore);
</script>

<style></style>
