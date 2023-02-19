<template>
    <layout>
        <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
        <div>
            <ol v-if="result.length>0">
                <li v-for="(group, index) in result" :key="index">
                    <h3 class="title">{{ verify(group.title) }}<span>￥{{ group.total }}</span></h3>
                    <ol>
                        <li class="record" v-for="item in group.items">
                            <span>{{ tagString(item.tags) }}</span>
                            <span class="notes">{{ item.notes }}</span>
                            <span>￥{{ item.amount }}</span>
                        </li>
                    </ol>
                </li>
            </ol>
            <div class="noRecord" v-else>您还未记账哦~~</div>
        </div>
    </layout>
</template>


<script lang="ts">
import Vue from 'vue'
import Tabs from '@/components/Tabs.vue';
import Component from 'vue-class-component';
import Layout from '../components/Layout.vue'
import recordTypeList from '@/constants/recordTypeList';
import intervalList from '@/constants/intervalList';
import dayjs from 'dayjs'
import clone from '@/lib/clone';
@Component({
    components: { Tabs, Layout }
})
export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
        return tags ? tags.map(tag=>tag.name).join(',') : '无'
    }
    get recordList() {
        return (this.$store.state as RootState).recordList
    }
    get result() {
        const { recordList } = this
        if (recordList.length === 0) { return [] }
        type hashTableValue = { title: string, items: RecordItem[], total:number}
        let hashTable: hashTableValue[] = []
        const newList = clone(recordList).filter(r=>r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        if (newList.length === 0) { return [] }
        hashTable.push({ title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]] ,total:0})
        for (let i = 1; i < newList.length; i++) {
            const pre = hashTable[hashTable.length-1]
            const cur = newList[i]
            if (dayjs(pre.title).isSame(dayjs(cur.createdAt), 'day')) {
                pre.items.push(newList[i])
            }else {
                hashTable.push({ title: dayjs(newList[i].createdAt).format('YYYY-MM-DD'), items: [cur] ,total:0})
            }
        }
        hashTable.map(t=>t.total = t.items.reduce((sum,cur)=>sum + cur.amount,0))
        return hashTable
    }
    created() {
        this.$store.commit('fetchRecords')
    }
    verify(string: string) {
        const day = dayjs(string)
        const now = dayjs()
        if (day.isSame(now, 'day')) {
            return '今天'
        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天'
        } else if (day.isSame(now.subtract(2, 'day'), 'day')) { return '前天' }
        else if (day.isSame(now, 'year')) { return day.format('M月D日') }
        { return day.format('YYYY年m月D日') }
    }
    type = '-'
    typeList = recordTypeList
}
</script>

<style lang="scss" scoped>
::v-deep {
    .type-item  {
        background: white;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }

    .interval-item {
        height: 48px;
    }

    %item {
        padding: 8px 16px;
        min-height: 40px;
        display: flex;
        line-height: 24px;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        @extend %item;
    }

    .record {
        background: white;
        @extend %item;
    }

    .notes {
        color: #999;
    }
    .noRecord{
        padding: 16px;
        color: #a4a4a4;
    }
}
</style>