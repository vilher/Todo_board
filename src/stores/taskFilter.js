import { ref, computed, unref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useTasksStore } from "./tasks";
import { useInputStore } from "./Input";

export const useTaskFilterStore = defineStore("taskFilter", () => {
  const currPagine = ref(0);
  const displayPerPage = 10;
  const filter = ref([]);

  function nextPagine() {
    if (!canDisplayMore.value) return;

    currPagine.value++;
  }

  const canDisplayMore = computed(() => {
    const { authors } = useTasksStore();
    return authors.length > (currPagine.value + 1) * displayPerPage;
  });

  const canDisplayLess = computed(() => {
    const { value } = currPagine;
    return value > 0;
  });

  function previousPagine() {
    if (!canDisplayLess.value) return;

    currPagine.value--;
  }

  function passOptionFilter(e) {
    const { value } = filter;
    const index = value.indexOf(e);
    if (index < 0) {
      value.push(e);
    } else {
      value.splice(index, 1);
    }
  }

  const pagineAuthors = computed(() => {
    const { authors } = useTasksStore();
    const currPage = currPagine.value;

    return authors.slice(
      currPage * displayPerPage,
      currPage * displayPerPage + displayPerPage
    );
  });

  const filterTask = computed(() => {
    const taskStore = useTasksStore();
    const { tasks } = storeToRefs(taskStore);

    return tasks.value.map((column, index) => {
      return {
        ...column,
        tasks: column.tasks.filter((task) => {
          return filterByAuthor(task) && filterTaskByInput(task);
        }),
      };
    });
  });

  const filteredCount = computed(() => {
    return filterTask.value.reduce((prev, curr) => {
      return prev + curr.tasks.length;
    }, 0);
  });

  function filterByAuthor({ author_id }) {
    const { value } = filter;
    if (!value.length) return true;

    return value.some(({ id }) => {
      return id === author_id;
    });
  }

  function filterTaskByInput({ title }) {
    const { typed } = useInputStore();
    const searchText = typed["search_task"];

    if (!searchText) return true;
    return title.toLowerCase().includes(searchText.toLowerCase());
  }

  const displayPagine = computed(() => {
    const { authors } = useTasksStore();
    return `${currPagine.value + 1}/${authors.length / displayPerPage}`;
  });

  return {
    filter,
    currPagine,
    displayPerPage,
    nextPagine,
    previousPagine,
    passOptionFilter,
    canDisplayLess,
    canDisplayMore,
    filterTask,
    pagineAuthors,
    displayPagine,
    filteredCount,
  };
});
