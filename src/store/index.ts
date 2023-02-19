import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone"
import createId from '@/lib/idCreator'
import router from '../router'
Vue.use(Vuex) //把 store 绑到 Vue.prototype.$store = store  



const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')

    },
    createRecord(state, record) {
      const recordCopy = clone(record)
      recordCopy.createdAt = new Date().toISOString()
      state.recordList?.push(recordCopy)
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复')
      }
      const id = createId().toString()
      state.tagList.push({ id, name: name })
      store.commit('saveTags')
      window.alert('添加成功')
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const idList = state.tagList.map(tag => tag.id)
      if (idList.indexOf(payload.id) >= 0) {
        const names = state.tagList.map(tag => tag.name)
        if (names.indexOf(payload.name) >= 0) {
          window.alert('标签重复了')
        } else {
          const tag = state.tagList.filter(tag => tag.id === payload.id)[0]
          tag.name = payload.name
          store.commit('saveTags')
        }
      }
    }
  }
})

export default store