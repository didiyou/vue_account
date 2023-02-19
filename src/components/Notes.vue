<template>
    <div>
      <label class="notes">
        <span class="name">{{fieldName}}</span>
        <!-- <input type="text" :placeholder="placeholder" :value="value" @input="onValueChanged"> -->
        <input type="text" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)"/>
      </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component,Prop} from 'vue-property-decorator'
  @Component
  export default class Notes extends Vue {
    @Prop({default:''}) readonly value!:string
    @Prop({required:true}) fieldName!: string
    @Prop() placeholder?: string
    onValueChanged(value:string){
        this.$emit('update:value',value)
      }
  } 
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper.scss";
.notes{
  font-size: 14px;
  display: block;
  padding-left:16px ;
  padding-right:16px ;
  display: flex;
  align-items: center;
  .name{
    padding-right:16px ;
  }
  input{
    height: 40px;
    flex-grow: 1;
    border: none;
    background: transparent;
  }
}
</style>