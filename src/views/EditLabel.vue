<template>
    <Layout>
      <div class="navBar">
        <Icon class="leftIcon" name="left" @click.native="goBack"/>
        <span class="title">编辑标签</span>
        <span class="rightIcon"></span>
      </div>
      <div class="note-wrapper">
      <Notes :value="tag.name" field-name="标签名" @update:value="update" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Notes from '../components/Notes.vue'
import Button from '../components/Button.vue'
import oldStore from '../store/index2'

@Component(
  {components:{Notes,Button}}
)
export default class EditLabel extends Vue{
    created(){
      const id = this.$route.params.id
      this.$store.commit('fetchTags')
      this.$store.commit('setCurrentTag',id)
      if(!this.tag)
      {
        this.$router.replace('/404')
      }
    }
    get tag(){
      return this.$store.state.currentTag
    }
    update(name:string){
      if(this.tag){
        this.$store.commit('updateTag',{id:this.tag.id,name})
      }
    }
    remove(){
      if(this.tag)
      {
        this.$store.commit('removeTag',this.tag.id)
      }
    }
    goBack(){
      this.$router.back()
    }
}
</script>

<style lang="scss" scoped>
.navBar{
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  >.leftIcon{
    width: 24px;
    height: 24px;
  }
  >.title{
    font-size: 16px;
  }
  >.rightIcon{
    width: 24px;
    height: 24px;
  }
}
.note-wrapper{
  background: white;
  margin-top: 8px;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>