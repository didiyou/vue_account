<template>
    <div class="numberPad"> 
      <div class="output">{{output}}</div>
      <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">ok</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop, Inject, Watch} from 'vue-property-decorator'
@Component
export default class NumberPad extends Vue{
  @Prop() readonly value!:number
  @Inject() reFresh
  output:string = this.value.toString()
  inputContent(event:MouseEvent){
    const button = (event.target as HTMLButtonElement)
    const input = button.textContent as string
    if(this.output.length === 16){return}
    if(this.output === '0'){
      if('0123456789'.indexOf(input) >= 0){
        this.output = input
      }
    }
    else if(input === '.' && this.output.indexOf('.') >= 0){return}
    else {this.output += input}
  }
  mounted() {
    console.log('挂载了')
  }
  remove(){
    if(this.output.length === 1){
      this.output = '0'
    }
    this.output = this.output.slice(0,-1)
  }
  @Watch('output') fun(newa,old){console.log('更新了',newa)}
  clear(){this.output = '0'}
  ok(){
    const num = parseFloat(this.output)
    this.$emit('update:value', num)
    this.$emit('submit', num)
    this.output = '0'
    this.reFresh()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper.scss";
.numberPad{
  .output{
    font-size: 36px;
    font-family: Consolas,monospace; //等宽字体
    padding: 9px 16px;
    height:72px;
    text-align: right;
    @extend %innerShadow;
  }
  .buttons{
    @extend %clearFix;
    > button{
      width: 25%;
      float: left;
      height: 64px;
      background: transparent;
      border: none;
      $bg:#f2f2f2;
      &:nth-child(1){
        background:$bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg, 4%);
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg, 4*2%);
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($bg, 4*3%);
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($bg, 4*3%);
      }
      &:nth-child(12),&:nth-child(14){
        background: darken($bg, 4*4%);
      }
      &:nth-child(12){
        background: darken($bg, 4*5%);
      }
      &.ok{
        height: 64*2px;
        float: right;
      }
      &.zero{
        width: 25*2%;
      }
    }
    
    
  }
}
</style>