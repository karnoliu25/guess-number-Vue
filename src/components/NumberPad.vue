<template>
  <div class="fixed inset-0 rounded-lg bg-blue-50 p-5 py-16">
    <div
      class="display border-8 border-blue-900 bg-blue-200 rounded-xl h-40 text-8xl flex items-center justify-center"
    >
      {{ display }}
    </div>
    <div class="number-pad flex w-full">
      <ul class="grow flex flex-wrap justify-center p-5 py-10 bg-blue-100">
        <li
          @click="numberClick(v)"
          class="flex justify-center items-center w-1/3 h-16 cursor-pointer border rounded-md border-black hover:bg-blue-300 active:bg-violet-700"
          v-for="(v, i) in 9"
          :key="i"
        >
          {{ v }}
        </li>
        <li
          @click="numberClick(0)"
          class="flex justify-center items-center w-1/3 h-16 cursor-pointer rounded-md border border-black hover:bg-blue-300"
        >
          0
        </li>
      </ul>
    </div>
    <div class="control-btns flex flex-col p-4">
      <button
        @click="submitBtn"
        class="h-16 border border-blue-300 bg-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-300 text-2xl mb-2"
      >
        确 认
      </button>
      <button
        @click="cancelBtn"
        class="h-16 border border-blue-300 bg-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-300 text-2xl mb-2"
      >
        取 消
      </button>
      <button
        @click="resetBtn"
        class="h-16 border border-blue-300 bg-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-300 text-2xl mb-2"
      >
        重 置
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberPad",
  data() {
    return {
      display: "",
      clickedNumbers: new Set(),
    };
  },
  computed: {},

  emits: ["closeNumberPad", "submit"],
  methods: {
    cancelBtn() {
      this.$emit("closeNumberPad");
    },
    numberClick(num) {
      if (this.display.length >= 4 || this.clickedNumbers.has(num)) return;
      this.display += num;
      this.clickedNumbers.add(num);
    },
    submitBtn() {
      if (this.display.length < 4) {
        alert("请输入4位数字后提交");
        return;
      }
      this.$emit("submit", this.display);
      this.cancelBtn();
    },
    resetBtn() {
      this.display = "";
      this.clickedNumbers.clear();
    },
  },
};
</script>
