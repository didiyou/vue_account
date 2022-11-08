<template>
    <nav>
    <router-link to="/money" class="item" active-class="selected">
    <Icon name="money"/>
    记账</router-link>
    <router-link to="/labels" class="item" active-class="selected">
    <Icon name="label"/>
    标签</router-link>
    <router-link to="/statistics" class="item" active-class="selected">
    <Icon name="statistic"/>
    统计</router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name:'Nav'
    }
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper.scss";
    nav{
        display: flex;
        @extend %outerShadow;
        flex-direction: row;
        font-size: 12px;
        > .item{
            padding: 2px 0;
            width:33.33333333%;
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            .icon{
                width:28px;
                height:28px;
            }
        }
        > .item.selected{
            color:$color-highlight;
        }
    }

</style>