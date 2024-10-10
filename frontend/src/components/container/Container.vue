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
  margin-top: 70px;
  height: auto;
  width: 100%;
  min-width: 400px;
}
</style>
