<template>
  <div
    class="home-container h-screen w-screen flex flex-col justify-center items-center border border-black"
  >
    <header class="w-full">
      <header-bar @rule="ruleBtnFn" @record="recordBtnFn"></header-bar>
    </header>
    <main
      class="w-full grow bg-blue-50 flex flex-col lg:justify-center items-center"
    >
      <display-box>
        <p
          v-if="isCorrect"
          class="text-5xl lg:text-8xl tracking-widest slashed-zero"
        >
          {{ game.solution }}
        </p>
        <p v-else class="text-5xl lg:text-8xl tracking-widest">?</p>
      </display-box>
      <div
        class="flex justify-around mt-10 lg:h-[30vh] w-full lg:justify-between lg:mt-10 lg:px-40"
      >
        <div class="btns">
          <game-control
            @click="numberPadFn"
            class="bg-blue-200 border-blue-800 lg:h-24 border-4 border-dashed"
          >
            {{ inputNumber }}
          </game-control>
          <game-control @click="submit">提交</game-control>
          <game-control @click="reset">重置</game-control>
        </div>
        <div class="current">
          <game-record>
            <ul class="pl-2 text-blue-900">
              <!-- prettier ignore -->
              <li v-show="isPlay" v-for="(v, i) in filterRecord" :key="i">
                第 <span class="font-bold"> {{ v.chance }} </span> 次
                <span class="font-bold text-blue-950"
                  >{{ v.currentNumber }}
                </span>
                正确数字：<span class="font-bold"> {{ v.rightNumber }} </span>
                位 正确位置：<span class="font-bold">
                  {{ v.rightPosition }}
                </span>
                位
              </li>
              <li v-show="isCorrect" class="text-xl mt-2">
                🎉答对了！🎉 正确答案是
                <span class="font-bold">{{ game.solution }}</span>
                一共使用了 <span class="font-bold"> {{ game.chance }} </span>
                次机会！
              </li>
            </ul>
          </game-record>
        </div>
      </div>

      <!-- 记录与规则 -->
      <div v-show="isRule" class="info-container">
        <information-view @closeInfo="closeFn">
          <p class="text-xl font-bold mb-2">珠玑妙算：挑战你的数字推理能力！</p>
          <p class="text-lg text-left">
            这是一款经典的数字解谜游戏，规则简单却充满智慧考验。你需要猜出一个
            4位不重复的数字（每位数字范围0-9）。每次猜测后，系统会给你两个关键提示：
          </p>
          <ul class="text-lg mb-4">
            <li class="list-disc">正确数字的数量</li>
            <li class="list-disc">正确位置的数量</li>
          </ul>
        </information-view>
      </div>
      <div v-show="isRecord" class="record-container">
        <information-view @closeInfo="closeFn">
          <p class="font-bold text-xl mb-4">历史记录</p>
          <ul>
            <!-- prettier ignore -->
            <li class="text-left" v-for="(v, i) in game.localData" :key="i">
              <span class="font-bold"> {{ v.date }} </span>
              挑战<span class="text-blue-900"> {{ v.chance }} </span>次
            </li>
          </ul>
        </information-view>
      </div>
      <div v-if="isNumberPad" class="number-pad">
        <number-pad @closeNumberPad="closeFn" @submit="submitFn"></number-pad>
      </div>
    </main>

    <footer class="w-full">
      <footer-bar></footer-bar>
    </footer>
  </div>
</template>

<script>
import DisplayBox from "@/components/DisplayBox.vue";
import FooterBar from "@/components/FooterBar.vue";
import GameControl from "@/components/GameControl.vue";
import GameRecord from "@/components/GameRecord.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import InformationView from "@/components/InformationView.vue";
import NumberPad from "@/components/NumberPad.vue";
import { useGameStore } from "@/stores/game";

export default {
  name: "HomeView",
  setup() {
    const game = useGameStore();
    return { game };
  },
  data() {
    return {
      isRule: false,
      isRecord: false,
      isCorrect: false,
      isNumberPad: false,
      isPlay: false,
      inputNumber: "点击输入",
    };
  },
  computed: {
    filterRecord() {
      if (!this.isCorrect) return this.game.record;
      return this.game.record.slice(0, -1);
    },
  },
  components: {
    FooterBar,
    HeaderBar,
    InformationView,
    DisplayBox,
    GameControl,
    GameRecord,
    NumberPad,
  },
  methods: {
    ruleBtnFn() {
      this.isRule = true;
    },
    recordBtnFn() {
      this.isRecord = true;
    },
    closeFn() {
      this.isRule = false;
      this.isRecord = false;
      this.isNumberPad = false;
    },
    numberPadFn() {
      this.isNumberPad = true;
    },
    submitFn(value) {
      this.inputNumber = value;
    },
    reset() {
      this.inputNumber = "点击输入";
      this.isCorrect = false;
      this.game.gameReset();
    },
    submit() {
      this.isPlay = true;
      this.game.rightNumber = 0;
      this.game.rightPosition = 0;
      if (this.isCorrect) return;
      for (let i = 0; i < 4; i++) {
        if (this.inputNumber[i] == this.game.solution[i]) {
          this.game.rightNumber += 1;
          this.game.rightPosition += 1;
        } else if (this.game.solution.includes(this.inputNumber[i])) {
          this.game.rightNumber += 1;
        } else {
          continue;
        }
      }
      this.game.chance += 1;
      this.game.updateRecord(
        this.inputNumber,
        this.game.chance,
        this.game.rightNumber,
        this.game.rightPosition
      );
      if (this.inputNumber == this.game.solution) {
        this.isCorrect = true;
        this.game.saveData();
        return;
      }
    },
  },
};
</script>
