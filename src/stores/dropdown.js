import { ref, computed, reactive, watch } from "vue";
import { defineStore } from "pinia";

export const useDropdownStore = defineStore("dropdown", () => {
  const selected = ref({});
  const menuVisible = ref(false);

  const selectDropdown = (id, option) => {
    if (selected.value[id] === option) {
      selected.value[id] = "";
    } else {
      selected.value[id] = option;
      menuVisible.value = false;
    }
  };

  function handleOutsideClick(e) {
    if (!e._vts) {
      menuVisible.value = false;
    }
  }

  function displaySelection(key) {
    const selection = selected.value[key];
    if (selection) return selection;
    return null;
  }

  function showDropdown() {
    menuVisible.value = !menuVisible.value;
  }

  function clearDropdown(key) {
    delete selected.value[key];
  }

  watch(menuVisible, () => {
    if (menuVisible.value) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  });

  return {
    selected,
    selectDropdown,
    handleOutsideClick,
    showDropdown,
    menuVisible,
    displaySelection,
    clearDropdown,
  };
});
