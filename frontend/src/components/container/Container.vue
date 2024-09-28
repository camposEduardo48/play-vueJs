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
}
</style>
