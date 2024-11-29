import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useErrorStore = defineStore("errorMessage", () => {
  const errors = ref({});

  function showError(type) {
    return errors.value[type] || null;
  }

  function removeError(key) {
    delete errors.value[key];
  }

  function addError(key, msg) {
    errors.value[key] = msg;
  }

  function addErrors(errorList) {
    Object.assign(errors.value, errorList);
  }

  return { errors, showError, removeError, addError, addErrors };
});
