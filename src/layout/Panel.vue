<template>
  <div class="panel-wrapper">
    <header>面板配置</header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="less" scoped>
.panel-wrapper {
  width: 120px;
  height: 100%;
  background: #29292b;
  border-left: 1px solid rgba(110, 115, 127, 1);
}
</style>
