<template>
    <div class="footer">
        <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span> 首页</span>
        </router-link>
        <router-link to="/list">
          <i class="iconfont icon-yewubaobiao"></i>
        <span> 列表</span>
        </router-link>
        <router-link to="/add">
         <i class="iconfont icon-tianjia"></i>
        <span> 添加</span>
        </router-link>
        <router-link to="/collect">
            <i class="iconfont icon-shoucang"></i>
        <span> 购物车</span>
        </router-link>
    </div>
</template>
<script>
export default {};
</script>
<style scoped lang="less">
//scoped 规定当前style的样式只属于当前模板
  /*      display: flex;
         flex-direction: row;
         justify-content: center;
         align-items: center;
         flex: 1;//每份比例
         router-link-exact-active //确切激活的 /home /home 两个一致生肖
         router-link-active //激活的 /home/a /home
    */
    .footer{
         position: fixed;
         left: 0;
         bottom: 0;
         width: 100%;
         height: 50px;
         display: flex;
         border-top: 1px solid #ccc;
         a{
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;
            color:#c0c0c0;
             text-decoration: none;
              
         }
         a.router-link-active{
            color:#666565;
         }
    }

</style>
