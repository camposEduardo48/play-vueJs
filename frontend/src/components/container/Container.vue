<template>
  <main class="container">
    <slot></slot>
  </main>
</template>
<script setup></script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  min-width: 400px;
  background: rgb(234, 210, 238);
  background: linear-gradient(90deg, rgba(234, 210, 238, 1) 0%, rgba(135, 75, 145, 1) 100%);
}
</style>
