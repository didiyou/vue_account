<template>
  <Layout class-prefix="layout">
    <number-pad/>
    <types :xxx="111"/>
    <notes/>
    <Tags/>
  </Layout>
</template>

<script lang='ts'>
import NumberPad from '../components/NumberPad.vue';
import Types from '../components/Types.vue';
import Notes from '../components/Notes.vue';
import Tags from '../components/Tags.vue';
  export default {
    name:'Money',
    components:{NumberPad,Types,Notes,Tags}
  }
</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>




