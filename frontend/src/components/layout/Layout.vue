<template>
  <main class="layout">
    <slot></slot>
  </main>
</template>

<script setup></script>

<style scoped>
.layout {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  color: aqua;
}
</style>
