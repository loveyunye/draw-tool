<template>
  <div class="workbench-wrapper" @wheel="wheel">
    <canvas ref="canvas" class="draw" width="800" height="400"></canvas>
    <canvas ref="ruleX" class="rule-x" width="1680" height="20"></canvas>
    <canvas ref="ruleY" class="rule-y" width="20" height="700"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as rule from '@/components/Rule/index.ts';

@Component
export default class HelloWorld extends Vue {
  // data
  private scale = 1;

  // prop
  @Prop() private msg!: string;
  // method
  wheel(event: WheelEvent): void {
    const scale: number = this.scale + event.deltaY * -0.01;

    // Restrict scale
    this.scale = Math.min(Math.max(0.125, scale), 4);
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;

    event.preventDefault();
  }

  mounted() {
    const canvasRuleX = this.$refs.ruleX as HTMLCanvasElement;
    const canvasRuleY = this.$refs.ruleY as HTMLCanvasElement;
    const ruleX = new rule.Rule(canvasRuleX, 1);
    const ruleY = new rule.Rule(canvasRuleY, 0);
    ruleX.init();
    ruleY.init();
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
    left: 20px;
    background: #191919;
  }

  .rule-y {
    position: absolute;
    top: 20px;
    left: 0;
    background: #191919;
  }
}
</style>
