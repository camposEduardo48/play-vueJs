<template>
  <header>
    <p>header</p>
    <slot></slot>
  </header>
</template>
<script setup></script>
<style scoped>
header {
  z-index: 1;
  position: fixed;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  top: 0;
  left: 0;
  display: flex;
  background: #000;
  color: aliceblue;
  height: 70px;
  width: 100%;
}
</style>
