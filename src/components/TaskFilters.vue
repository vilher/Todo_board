<template>
  <div class="flex gap-3 my-2 lg:flex-nowrap flex-wrap">
    <div
      v-for="author in pagineAuthors"
      :key="author.id"
      class="text-center cursor-pointer border-gray-100 p-2 border-b-2 max-h-20 hover:border-blue-950"
      :class="{
        'bg-blue-950/80 text-white rounded-md hover:bg-blue-950 ':
          filter.includes(author),
      }"
      @click="passOptionFilter(author)"
    >
      {{ author.display_name }}
    </div>
  </div>
  <div class="flex justify-center gap-3 mb-5">
    <button-vue
      @click="previousPagine"
      :disabled="!canDisplayLess"
      :class="{ 'opacity-40': !canDisplayLess }"
    >
      <LeftIcon />
    </button-vue>

    <p class="content-center">
      {{ displayPagine }}
    </p>

    <button-vue
      @click="nextPagine"
      :disabled="!canDisplayMore"
      :class="{ 'opacity-40': !canDisplayMore }"
    >
      <RightIcon />
    </button-vue>
  </div>
  <input-vue placeholder="Search" id="search_task"></input-vue>
</template>

<script setup>
import ButtonVue from "./Utils/Button.vue";
import InputVue from "./Utils/Input.vue";
import { storeToRefs } from "pinia";
import { useTaskFilterStore } from "../stores/taskFilter";
import LeftIcon from "./icons/Left.vue";
import RightIcon from "./icons/Right.vue";

const filterStore = useTaskFilterStore();

const { nextPagine, previousPagine, passOptionFilter } = filterStore;
const { filter, canDisplayLess, canDisplayMore, pagineAuthors, displayPagine } =
  storeToRefs(filterStore);
</script>

<style></style>
