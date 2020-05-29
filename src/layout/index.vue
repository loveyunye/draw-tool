<template>
  <div class="layout-wrapper">
    <header>
      <Menu />
    </header>
    <section>
      <Tool />
      <Workbench />
      <Panel />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from './Menu.vue';
import Tool from './Tool.vue';
import Workbench from './Workbench.vue';
import Panel from './Panel.vue';

@Component({
  components: {
    Menu,
    Tool,
    Workbench,
    Panel,
  },
  name: 'layout-index',
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100vw;
  height: 100vh;
  background: #18181a;
  header {
    background: #29292b;
    border-bottom: 1px solid rgba(110, 115, 127, 1);
    height: 50px;
    line-height: 50px;
  }
  section {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
  }
}
</style>
