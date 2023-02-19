<template>
  <div>
    <ul class="types">
      <li :class="{[classPrefix+ '-item']:classPrefix,selected:value === '-'}" @click="selectType('-')">支出</li>
      <li :class="{[classPrefix+ '-item']:classPrefix,selected:value === '+'}" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component,Prop } from 'vue-property-decorator'
@Component
export default class Types extends Vue {
  @Prop(String) readonly classPrefix?:string
  @Prop(String) readonly value!: string
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      // throw new Error('type is unknown')
    }
    this.$emit('update:value',type) 
  }

}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper.scss";

.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  >li {
    width: 50%;
    display: flex;
    justify-content: center;
    height: 64px;
    align-items: center;

    &.selected {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 100%;
        background: #333;
      }
    }
  }
}
</style>