<template>
  <Layout class-prefix="layout">
    <NumberPad ref="NumberPad" :value.sync="record.amount" @submit="saveRecord" />
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes">
      <Notes @update:value="onUpdateNotes" field-name="备注" placeholder="请输入备注" v-model="record.notes" />
    </div>
    <Tags :value.sync="record.tags" />
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import NumberPad from '../components/NumberPad.vue';
import Tabs from '../components/Tabs.vue';
import Notes from '../components/Notes.vue';
import Tags from '../components/Tags.vue';
import { Component } from 'vue-property-decorator'
import recordTypeList from '@/constants/recordTypeList';
const getDefaultRecordItem: () => RecordItem = () => ({ tags: [], notes: '', type: '-', amount: 0, createdAt: '' });
@Component(
  { components: { NumberPad, Tabs, Notes, Tags } })
export default class Money extends Vue {
  recordTypeList = recordTypeList

  created() {
    this.$store.commit('fetchRecords')
  }
  get recordList() {
    return this.$store.state.recordList
  }
  record = getDefaultRecordItem()

  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  saveRecord() {
    this.$store.commit('createRecord', this.record)
    this.record = getDefaultRecordItem()
  }
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>




