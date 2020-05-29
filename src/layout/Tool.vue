<template>
  <div class="tool-wrapper">
    <header>工具栏</header>
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
.tool-wrapper {
  width: 60px;
  height: 100%;
  background: #29292b;
  border-right: 1px solid rgba(110, 115, 127, 1);
}
</style>
