<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag.name)"
        :class="{ selected: selectedTags.map(t=>t.name).indexOf(tag.name) >= 0 }">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagHelper } from '@/mixins/TagHelper'
import Vue from 'vue'
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import oldStore from '../store/index2'

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop(Array) readonly value!:Tag[]
  selectedTags: Tag[] = []
  get tagList() {
    return this.$store.state.tagList
  }
  created() {
    this.$store.commit('fetchTags')
  }
  toggle(tag: string) {
    const index = this.selectedTags.map(t=>t.name).indexOf(tag)
    if (index >= 0) { this.selectedTags.filter(t=>t.name!==tag)}
    else { 
      let item = this.tagList.filter(t=>t.name === tag)[0]
      this.selectedTags.push(item) }
    this.$emit('update:value', this.selectedTags)
  }
}
</script>


<style lang="scss" scoped>
@import "src/assets/style/helper.scss";

.tags {
  display: flex;
  font-size: 14px;
  flex-direction: column-reverse;
  padding: 16px;
  flex-grow: 1;
  background: white;

  >.current {
    display: flex;
    flex-wrap: wrap;

    >li {
      $bg: #d9d9d9;
      background: #d9d9d9;
      height: 24px;
      line-height: 24px;
      margin-top: 5px;
      border-radius: (24px/2);
      padding: 0 16px;
      margin-right: 12px;

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  >.new {
    padding-top: 16px;

    button {
      border: none;
      padding: 0 3px;
      color: #999;
      border-bottom: 1px solid;
    }

  }
}
</style>