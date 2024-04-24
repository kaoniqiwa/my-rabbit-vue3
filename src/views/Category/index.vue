<script setup lang="ts">
import { getCategoryAPI } from '@/apis/category';
import { onMounted } from 'vue';


const getCategory = async () => {
  const { data: { result } } = await getCategoryAPI()
  console.log(result);

}
onMounted(() => {
  getCategory()
})
</script>
<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>居家</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>