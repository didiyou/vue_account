<template>
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
</template>

<script lang="ts">
    export default {
        name:"Tags"
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
      background: #d9d9d9;
      height: 24px;
      line-height: 24px;
      margin-top: 5px;
      border-radius: (24px/2);
      padding: 0 16px;
      margin-right: 12px;
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