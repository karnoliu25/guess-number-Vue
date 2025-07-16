<template>
  <div class="header-container bg-blue-300 text-center h-28">
    <h1 class="pt-4 lg:pt-4 font-sans text-4xl font-bold">珠玑妙算</h1>
    <div
      class="control-container flex justify-around mt-2 lg:justify-end lg:pr-10 lg:pb-2 lg:gap-10 lg:mt-2"
    >
      <ControlBtn @click="recordBtn">记录</ControlBtn>
      <ControlBtn @click="ruleBtn">关于</ControlBtn>
    </div>
  </div>
</template>

<script>
import ControlBtn from "./ControlBtn.vue";

export default {
  components: {
    ControlBtn,
  },
  emits: ["rule", "record"],
  methods: {
    ruleBtn() {
      this.$emit("rule");
    },
    recordBtn() {
      this.$emit("record");
    },
  },
};
</script>
