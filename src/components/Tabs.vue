<template>
      <ul class="tabs">
        <li v-for="item in dataSource" :key="item.value" class='tabs-item' @click="select(item)" 
        :class="liClass(item)">
        {{ item.text }}
        </li>
      </ul>
  </template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

type dataSourceItem = {text:string,value:string}

@Component
export default class Tabs extends Vue{
    @Prop({required:true}) dataSource!:dataSourceItem[]
    @Prop(String) readonly value!:string
    @Prop(String) readonly classPrefix?:string
    select(item:dataSourceItem){
        this.$emit('update:value',item.value)     
    }
    liClass (item:dataSourceItem) {
      return {
        [this.classPrefix + '-item']:this.classPrefix,selected:item.value === this.value}
      }
    }

</script>


<style lang="scss" scoped>
@import "src/assets/style/helper.scss";

.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  &-item {
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