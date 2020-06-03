<template>
  <div class="workbench-wrapper" @wheel="wheelStage">
    <canvas ref="canvas" class="draw" @wheel="wheelDeBounce"></canvas>
    <canvas ref="ruleX" class="rule-x"></canvas>
    <canvas ref="ruleY" class="rule-y"></canvas>
    <div class="reset-button"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as rule from '@/components/Rule/index.ts';

function debounce(fn: Function, wait = 100): Function {
  let timer: number | undefined;
  return function(args: WheelEvent) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, wait);
  };
}

@Component
export default class HelloWorld extends Vue {
  // data
  private scale = 1;
  private stageWidth = 0;
  private stageHeight = 0;
  private wheelDe: Function = debounce(this.wheel, 7);
  private ruleX!: rule.Rule;
  private ruleY!: rule.Rule;

  // prop
  @Prop() private msg!: string;
  // method
  wheel(event: WheelEvent): void {
    const scale: number = this.scale + event.deltaY * -0.01;
    this.scale = Math.min(Math.max(0.25, scale), 4);
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    canvas.style.transform = `translate(-50%, -50%) scale(${this.scale})`;
    this.draw();
  }

  wheelStage(event: WheelEvent): void {
    // console.log(event);
    event.preventDefault();
  }

  wheelDeBounce(event: WheelEvent) {
    this.wheelDe(event);
    event.preventDefault();
    event.stopPropagation();
  }

  // 绘制
  draw() {
    const { clientWidth, clientHeight } = this.$refs
      .canvas as HTMLCanvasElement;
    const { clientWidth: stageWidth, clientHeight: stageHeight } = this.$el;

    this.ruleX.draw(
      this.scale,
      (stageWidth - clientWidth * this.scale) / 2 - 24,
    );
    this.ruleY.draw(
      this.scale,
      (stageHeight - clientHeight * this.scale) / 2 - 24,
    );
  }

  mounted() {
    const canvasRuleX = this.$refs.ruleX as HTMLCanvasElement;
    const canvasRuleY = this.$refs.ruleY as HTMLCanvasElement;
    this.ruleX = new rule.Rule(canvasRuleX, 1);
    this.ruleY = new rule.Rule(canvasRuleY, 0);
    this.draw();
    window.addEventListener('resize', this.draw);
  }
}
</script>

<style lang="less" scoped>
.workbench-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-image: radial-gradient(circle, #545d63 1px, #2b2e33 0);
  background-size: 20px 20px;

  .draw {
    width: 1000px;
    height: 400px;
    position: absolute;
    background: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center center;
  }

  .rule-x {
    position: absolute;
    top: 0;
    left: 24px;
    background: #0e1013;
    width: 100%;
    height: 24px;
  }

  .rule-y {
    position: absolute;
    top: 24px;
    left: 0;
    background: #0e1013;
    height: 100%;
    width: 24px;
  }

  .reset-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    background: #0e1013;
  }
}
</style>
