<template>
  <div class="container">
    <div class="item">
      <span style="margin-right: 12px;">hello</span>
      <span>world</span>
    </div>
    <div class="item"></div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
}
.item {
  height: 300px;
  background: #eee;
  border: 1px solid #aaa;
  &:nth-child(1) {
    width: 40vw;
  }
  &:nth-child(2) {
    width: 80vw;
  }
}
</style>
