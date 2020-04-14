<template>
    <div class="header">
        <slot></slot>
        <!-- 根据:back 的值判断当前标题是否有返回按钮 -->
        <i class="iconfont icon-Left" v-if="back" @click="goBack"></i>
    </div>
</template>
<script>
export default {
    props: {
        back:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    }
    
}
</script>
<style scoped lang="less">
    .header{
        // z-index: 999;
        position:fixed ;
        top: 0;
        left: 0;
        width: 100%;
        background: #000000;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        font-weight: bold;
        i {
            position: absolute;
            left: 10px;
            font-size: 14px;
        }
    }
</style>
