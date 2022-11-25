<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <types :type.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:selected="onUpdateTags"/>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import NumberPad from '../components/NumberPad.vue';
import Types from '../components/Types.vue';
import Notes from '../components/Notes.vue';
import Tags from '../components/Tags.vue';
import { Component} from 'vue-property-decorator'
type Record={
  tags:string[],
  notes:string,
  type:string,
  amount:number
}
@Component(
  {components:{NumberPad,Types,Notes,Tags}})
  export class  Money extends Vue{
    tags = ['衣','食','住','行']
    recordList:Record[] = [] 
    record:Record = {tags:[],notes:'',type:'-',amount:0}
    onUpdateTags(tags:string[]){this.record.tags = tags}
    onUpdateNotes(notes:string){this.record.notes = notes}
    onUpdateType(type:string){this.record.type = type}
    onUpdateAmount(value:string){this.record.amount = parseFloat(value)}
    saveRecord(amount:Number){this.recordList.push(this.record)}
  }
</script>

<style lang="scss">
  .layout-content{ 
    display: flex;
    flex-direction: column-reverse;
  }
</style>




