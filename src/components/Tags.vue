<template>
    <div class="tags">
      <div class="new">
        <button @click="create">新增标签</button>
      </div>
      <ul class="current">
        <li v-for="tag in dataSource" :key="tag" @click="toggle(tag)" 
        :class="{selected:selectedTags.indexOf(tag)>=0}">{{tag}}</li>
      </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component,Prop} from 'vue-property-decorator'
  @Component
  export default class Tags extends Vue{
    @Prop(Array) dataSource:string[] | undefined
    selectedTags:string[] = []
    toggle(tag:string){
      const index = this.selectedTags.indexOf(tag)
      if(index >= 0){this.selectedTags.splice(index,1)}
      else{this.selectedTags.push(tag)}
      this.$emit('onupdate:selected',this.selectedTags)
    }
    create(){
      const name = window.prompt('请输入标签名')
      if(name === ''){
        window.alert('标签不能为空')
      }else if(this.dataSource){
        this.$emit('update:dataSource',[...this.dataSource,name])
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper.scss";
.tags{
  display: flex;
  font-size: 14px;
  flex-direction: column-reverse;
  padding: 16px;
  flex-grow: 1;
  > .current{
    display: flex;
    flex-wrap: wrap;
    > li{
      $bg:#d9d9d9;
      background: #d9d9d9;
      height: 24px;
      line-height: 24px;
      margin-top: 5px;
      border-radius: (24px/2);
      padding: 0 16px;
      margin-right: 12px;
      &.selected{background: darken($bg,50%);color:white;}
    }
  }
  > .new{ 
    padding-top: 16px;
    button{
    border:none;
    padding: 0 3px;
    color: #999;
    border-bottom:1px solid;
    }
    
  }
}
</style>