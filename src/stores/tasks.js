import { defineStore } from "pinia";
import { ref, toRef } from "vue";
import taskManager from "../managers/task";
import { useInputStore } from "./Input";
import { useDropdownStore } from "./dropdown";
import { useErrorStore } from "./errorMessage";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref([]);
  const authors = ref([]);
  const columns = ref([]);
  const error = ref(null);
  const allTaskSize = ref(0);

  async function fetchTasks() {
    try {
      const allTasks = await taskManager.allTasks();
      const reducedTasks = tasksByColumn(allTasks.tasks);

      allTaskSize.value = allTasks.tasks.length;
      columns.value = allTasks.columns;
      authors.value = allTasks.authors;
      tasks.value = allTasks.columns.map((column) => {
        return {
          column,
          tasks: reducedTasks[column],
        };
      });
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  async function createTask(inputId, selectedId) {
    const { removeError, addError, addErrors } = useErrorStore();
    const { clearInput, typed } = useInputStore();
    const { selected, clearDropdown } = useDropdownStore();

    const author = selected[selectedId];
    const taskTitle = typed[inputId];
    const currentDate = new Date();

    const error = {};
    if (!taskTitle) {
      error[inputId] = "Type title";
    }
    if (!author) {
      error[selectedId] = "Select author";
    }
    addErrors(error);

    if (JSON.stringify(error) != "{}") return;

    const taskData = {
      author_id: author.id,
      current_column: "To do",
      date_created: currentDate.toISOString().split("T")[0],
      id: allTaskSize.value++,
      title: taskTitle,
    };

    tasks.value[0].tasks.unshift(taskData);
    taskManager.addTask(taskData);

    clearInput(inputId);
    clearDropdown(selectedId);
    removeError(selectedId);
    removeError(inputId);
  }

  function getAuthorName(author_id) {
    return authors.value.find((author) => {
      return author_id == author.id;
    })?.display_name;
  }

  function addTask(column, taskIndex, task) {
    tasks.value[column].tasks.splice(taskIndex, 0, task);
  }

  function removeTask(column, taskIndex, element) {
    const index = findTask(tasks.value[column].tasks, element.id);

    tasks.value[column].tasks.splice(index, 1);
  }

  function replaceTaskPosition(column, newArray, newTask) {
    const columnTasks = tasks.value[column].tasks;
    newTask && columnTasks.push(newTask);

    let sum = -1;
    tasks.value[column].tasks = columnTasks.map((task) => {
      if (!newArray.includes(task)) return task;
      sum++;
      return newArray[sum];
    });
  }

  function findTask(taskList, task_id) {
    return taskList.findIndex(({ id }) => id === task_id);
  }

  return {
    fetchTasks,
    addTask,
    tasks,
    authors,
    columns,
    allTaskSize,
    getAuthorName,
    addTask,
    removeTask,
    replaceTaskPosition,
    createTask,
  };
});

function tasksByColumn(tasks) {
  return tasks.reduce((prev, curr) => {
    if (prev[curr.current_column]) {
      prev[curr.current_column].push(curr);
    } else {
      prev[curr.current_column] = [curr];
    }
    return prev;
  }, {});
}
