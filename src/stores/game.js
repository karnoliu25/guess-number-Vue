import { ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  // state
  const solution = ref("");
  const rightNumber = ref(0);
  const rightPosition = ref(0);
  const chance = ref(0);
  const record = ref([]);
  const localData = ref(JSON.parse(localStorage.getItem("gameData")) || []);
  // getters

  // actions
  const solutionNumber = function () {
    const arr = [];
    while (arr.length < 4) {
      const num = Math.floor(Math.random() * 10);
      if (!arr.includes(num)) {
        arr.push(num);
      }
    }
    solution.value = arr.join("");
  };
  const gameReset = function () {
    rightNumber.value = 0;
    rightPosition.value = 0;
    chance.value = 0;
    record.value = [];
    solutionNumber();
  };
  const updateRecord = function (
    currentNumber,
    chance,
    rightNumber,
    rightPosition
  ) {
    record.value.push({ currentNumber, chance, rightNumber, rightPosition });
  };
  const saveData = function () {
    const data = {
      date: _getDate(),
      chance: chance.value,
    };
    localData.value.push(data);
    localStorage.setItem("gameData", JSON.stringify(localData.value));
  };
  const clearData = function () {
    localStorage.removeItem("gameData");
  };
  const _getDate = function () {
    let dateValue = new Date();
    let year = dateValue.getFullYear();
    let month = dateValue.getMonth() + 1;
    let date = dateValue.getDate();
    const dateString = year + "-" + month + "-" + date;
    return dateString;
  };
  solutionNumber();
  return {
    solution,
    rightPosition,
    rightNumber,
    chance,
    record,
    localData,
    solutionNumber,
    gameReset,
    updateRecord,
    saveData,
    clearData,
  };
});
