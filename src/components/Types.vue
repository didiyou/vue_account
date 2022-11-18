<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component,Prop } from 'vue-property-decorator'
@Component
export default class Types extends Vue {
  type = '-'
  @Prop(Number) xxx: number | undefined
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      // throw new Error('type is unknown')
    }
    this.type = type
  }

}

//     export default {
//         name:"Types",
//         data(){
//             return {type:'-'}
//         },
//         methods: {
//         selectType(type){
//          if(type !== '-' && type !== '+'){throw new Error('type is unknow');}
//          this.type = type
//         }
//     }
// }

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