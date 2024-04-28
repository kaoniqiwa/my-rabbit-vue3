<script setup lang="ts">
import type { GoodDetailDTO } from '@/types';
import { onMounted } from 'vue';

const props = defineProps<{
  goodDetail?: GoodDetailDTO
}>()

onMounted(() => {

})
const clickSpecs = (spec: GoodDetailDTO['specs'][number], val: GoodDetailDTO['specs'][number]['values'][number]) => {

}
</script>
<template>
  <div class="good-sku">
    <dl v-for="spec in goodDetail?.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="item in spec.values" :key="item.name">
          <img v-if="item.picture" :src="item.picture" alt="" :title="item.desc" @click="clickSpecs(spec, item)">
          <span v-else :title="item.desc" @click="clickSpecs(spec, item)">
            {{ item.name }}
          </span>
        </template>

      </dd>
    </dl>
  </div>
</template>
<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.good-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

  }

  dt {
    width: 50px;
    color: #999;
  }


  dd {
    flex: 1;
    color: #666;

    >img {
      width: 50px;
      height: 50px;
      margin-bottom: 4px;

      @include sku-state-mixin;
    }

    >span {
      display: inline-block;
      height: 30px;
      line-height: 28px;
      padding: 0 20px;
      margin-bottom: 4px;

      @include sku-state-mixin;

    }
  }
}
</style>