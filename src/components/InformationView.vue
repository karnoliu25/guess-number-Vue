<template>
  <div
    class="mask-wrapper fixed inset-0 flex items-center justify-center p-4 bg-transparent"
  >
    <div
      @click="closeBtn"
      class="mask absolute inset-0 bg-slate-900 opacity-40 -z-10"
    ></div>
    <div
      class="info-container relative z-10 w-full p-4 lg:w-1/2 lg:p-4 rounded-md flex flex-col items-center shadow-2xl bg-white h-96 overflow-auto"
    >
      <slot></slot>
      <div class="btns flex gap-10 mt-2">
        <button
          @click="closeBtn"
          class="py-2 px-4 mt-4 lg:py-1 lg:px-3 bg-blue-100 rounded-lg hover:bg-blue-200 lg:mt-2"
        >
          我知道了
        </button>
        <button
          @click="clearBtn"
          class="py-2 px-4 mt-4 lg:py-1 lg:px-3 bg-blue-100 rounded-lg hover:bg-blue-200 lg:mt-2"
        >
          清空记录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from "@/stores/game";
export default {
  emits: ["closeInfo"],
  methods: {
    closeBtn() {
      this.$emit("closeInfo");
    },
    clearBtn() {
      const game = useGameStore();
      game.clearData();
      game.localData = [];
    },
  },
};
</script>
